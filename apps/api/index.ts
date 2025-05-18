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
import { CREATE_EVENT, CREATE_ORDER, type MessageToEngine } from "./types/types";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

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

  const messageToSend : MessageToEngine = {
    type: CREATE_EVENT,
    data: {
      title,
      expiresAt: event.expiresAt.toISOString(),
    },
  };

  const response = await RedisManager.getInstance().sendAndAwait(messageToSend);

//   if (!response.success) {
//     res.status(400).json({ error: response.error, success: false });
//     return;
//   }

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

  const order = await db.order.create({
    data: {
      //@ts-ignore
      userId: req.user.id,
      eventId,
      orderType,
      outcome: outcome,
      side,
      quantity,
      price: price || 0,
    },
  });

  //@ts-ignore
  const updatedOrder = await matchOrder(order);

  res.status(200).json({ success: true, data: updatedOrder });
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

  if (order.userId !== req.user.id) {
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
