import express from "express";
import db from "db";
import {
  createEventSchema,
  signinSchema,
  signupSchema,
  createOrderSchema,
  cancelOrderSchema,
} from "common";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { authMiddleware } from "./middleware";
import { matchOrder } from "./matchEngine";
import { RedisManager } from "./redisManager";
import {
  CREATE_EVENT,
  CREATE_ORDER,
  CREATE_USER,
  GET_DEPTH,
  type MessageToEngine,
} from "./types/types";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3005;

app.post("/signup", async (req, res) => {
  console.log(req.body);
  const data = signupSchema.safeParse(req.body);

  if (!data.success) {
    res.status(400).json({ error: data.error, success: false });
    return;
  }

  const { email, password, username } = data.data;

  const user = await db.user.create({
    data: { email, password, username },
  });

  const messageToSend: MessageToEngine = {
    type: CREATE_USER,
    data: {
      userId: user.id,
    },
  };

  const response = await RedisManager.getInstance().sendAndAwait(messageToSend);

  if (!response) {
    res.status(400).json({ error: "Orderbook not responding", success: false });
    return;
  }

  res.status(200).json({ success: true, data: user });
  return;
});

app.post("/signin", async (req, res) => {
  const data = signinSchema.safeParse(req.body);

  if (!data.success) {
    res.status(400).json({ error: data.error, success: false });
    return;
  }

  const { email, password } = data.data;

  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    res.status(400).json({ error: "User not found", success: false });
    return;
  }

  const isPasswordValid = password === user.password;

  if (!isPasswordValid) {
    res.status(400).json({ error: "Invalid password", success: false });
    return;
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET);

  res.status(200).json({ success: true, data: token });
  return;
});

app.get("/event/:eventId", async (req, res) => {
  const { eventId } = req.params;

  const event = await db.event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    res.status(400).json({ error: "Event not found", success: false });
    return;
  }

  res.status(200).json({ success: true, data: event });
  return;
});

app.post("/event", authMiddleware, async (req, res) => {
  console.log(req.body);
  const data = createEventSchema.safeParse(req.body);

  if (!data.success) {
    res.status(400).json({ error: data.error, success: false });
    return;
  }

  const { title, description, expiresAt } = data.data;

  const event = await db.event.create({
    data: {
      title,
      description,
      expiresAt,
    },
  });

  const messageToSend: MessageToEngine = {
    type: CREATE_EVENT,
    data: {
      title,
      expiresAt: event.expiresAt.toISOString(),
    },
  };
  console.log("message to send", messageToSend);

  const response = await RedisManager.getInstance().sendAndAwait(messageToSend);

  console.log("response from orderbook", response);
  if (!response) {
    await db.event.delete({
      where: { id: event.id },
    });
    res.status(400).json({ error: "Orderbook not responding", success: false });
    return;
  }

  res.status(200).json({ success: true, data: event });
  return;
});

app.post("/order", authMiddleware, async (req, res) => {
  const data = createOrderSchema.safeParse(req.body);

  if (!data.success) {
    res.status(400).json({ error: data.error, success: false });
    return;
  }

  const { eventId, orderType, outcome, side, quantity, price } = data.data;

  const event = await db.event.findUnique({
    where: { id: eventId, isActive: true },
  });

  if (!event) {
    res
      .status(400)
      .json({ error: "Event not found or not active", success: false });
    return;
  }

  if (orderType === "LIMIT" && !price) {
    res
      .status(400)
      .json({ error: "Price is required for LIMIT orders", success: false });
    return;
  }

  const messageToSend: MessageToEngine = {
    type: CREATE_ORDER,
    data: {
      event: event.title,
      price: price!,
      quantity,
      side,
      //@ts-ignore
      userId: req.userId,
      outcome,
    },
  };

  const response = await RedisManager.getInstance().sendAndAwait(messageToSend);

  console.log("response from orderbook", response);
  if (!response) {
    res.status(400).json({ error: "Orderbook not responding", success: false });
    return;
  }

  res.status(200).json({ success: true, data: response });
});

app.get("/orderbook/:eventId", async (req, res) => {
  const { eventId } = req.params;

  const event = await db.event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    res.status(400).json({ error: "Event not found", success: false });
    return;
  }

  const orderBook = await db.orderBookEntry.findMany({
    where: {
      eventId,
      order: {
        status: {
          in: ["PENDING", "PARTIAL"],
        },
      },
    },
    orderBy: [{ price: "asc" }, { timestamp: "asc" }],
  });

  const groupedOrderBook = {
    YES: {
      BUY: orderBook.filter(
        (entry) => entry.outcome === "YES" && entry.side === "BUY"
      ),
      SELL: orderBook.filter(
        (entry) => entry.outcome === "YES" && entry.side === "SELL"
      ),
    },
    NO: {
      BUY: orderBook.filter(
        (entry) => entry.outcome === "NO" && entry.side === "BUY"
      ),
      SELL: orderBook.filter(
        (entry) => entry.outcome === "NO" && entry.side === "SELL"
      ),
    },
  };

  res.status(200).json({ success: true, data: groupedOrderBook });
});

app.delete("/order/:orderId", authMiddleware, async (req, res) => {
  const data = cancelOrderSchema.safeParse({ orderId: req.params.orderId });

  if (!data.success) {
    res.status(400).json({ error: data.error, success: false });
    return;
  }

  const { orderId } = data.data;

  const order = await db.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    res.status(400).json({ error: "Order not found", success: false });
    return;
  }

  //@ts-ignore
  if (order.userId !== req.userId) {
    res
      .status(403)
      .json({ error: "Not authorized to cancel this order", success: false });
    return;
  }

  if (!["PENDING", "PARTIAL"].includes(order.status)) {
    res.status(400).json({
      error: "Can only cancel pending or partial orders",
      success: false,
    });
    return;
  }

  await db.$transaction([
    db.order.update({
      where: { id: orderId },
      data: { status: "CANCELED" },
    }),
    db.orderBookEntry.deleteMany({
      where: { orderId },
    }),
  ]);

  res
    .status(200)
    .json({ success: true, data: { message: "Order cancelled successfully" } });
});

app.get("/depth/:eventId", async (req, res) => {
  const { eventId } = req.params;

  const event = await db.event.findUnique({
    where: { id: eventId },
  });

  if (!event) {
    res.status(400).json({ error: "Event not found", success: false });
    return;
  }

  const messageToSend: MessageToEngine = {
    type: GET_DEPTH,
    data: {
      event: event.title!,
    },
  };

  console.log("message to send", messageToSend);
  const response = await RedisManager.getInstance().sendAndAwait(messageToSend);

  if (!response) {
    res.status(400).json({ error: "Orderbook not responding", success: false });
    return;
  }

  res.status(200).json({ success: true, data: response });
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
