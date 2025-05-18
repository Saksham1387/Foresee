import { RedisManager } from "../redisManager";
import {
  CANCEL_ORDER,
  CREATE_EVENT,
  CREATE_ORDER,
  GET_DEPTH,
  GET_OPEN_ORDERS,
  type MessageFromAPI,
} from "../types/fromAPI";
import { OrderBook, type Fill, type Order } from "./orderBook";

interface UserBalance {
  available: number;
  locked: number;
}
export class Engine {
  private orderBook: OrderBook[] = [];
  private balances: Map<string, UserBalance> = new Map();
  // TODO: Add funcitonalty of locking the YES and NO assets also
  private positions: Map<string, Map<string, { YES: number; NO: number }>> =
    new Map();

  addOrderBook(orderBook: OrderBook) {
    this.orderBook.push(orderBook);
  }

  addUser(userId: string) {
    this.balances.set(userId, { available: 100, locked: 0 });
  }

  getBalance(userId: string) {
    return this.balances.get(userId);
  }

  process({
    message,
    clientId,
  }: {
    message: MessageFromAPI;
    clientId: string;
  }) {
    switch (message.type) {
      case CREATE_EVENT:
        try {
          const newOrderBook = new OrderBook(0.5, 0.5, message.data.title);
          this.addOrderBook(newOrderBook);
          RedisManager.getInstance().sendToApi(clientId, {
            type: "EVENT_CREATED",
            payload: {
              event: message.data.title,
              expiresAt: message.data.expiresAt,
            },
          });
        } catch (error) {
          console.error("Error creating event:", error);
          throw error;
        }
        break;
      case CREATE_ORDER:
        try {
          const { executedQty, fills, orderId } = this.createOrder(
            message.data.event,
            Number(message.data.price),
            Number(message.data.quantity),
            message.data.side,
            message.data.userId,
            message.data.outcome
          );

          RedisManager.getInstance().sendToApi(clientId, {
            type: "ORDER_PLACED",
            payload: {
              orderId,
              executedQty,
              fills,
            },
          });
        } catch (error) {
          console.error("Error creating order:", error);
          RedisManager.getInstance().sendToApi(clientId, {
            type: "ORDER_CANCELLED",
            payload: {
              orderId: "",
              executedQty: 0,
              remainingQty: 0,
            },
          });
          throw error;
        }
        break;
      case GET_OPEN_ORDERS:
        try {
          const orderBook = this.orderBook.find(
            (orderBook) => orderBook.ticker() === message.data.event
          );
          if (!orderBook) {
            throw new Error("Order book not found");
          }
          const openOrders = orderBook.getOpenOrders(message.data.userId);
          RedisManager.getInstance().sendToApi(clientId, {
            type: "OPEN_ORDERS",
            payload: openOrders,
          });
        } catch (error) {
          console.error("Error getting open orders:", error);
          throw error;
        }
        break;
      case GET_DEPTH:
        try {
          const orderBook = this.orderBook.find(
            (orderBook) => orderBook.ticker() === message.data.event
          );
          if (!orderBook) {
            throw new Error("Order book not found");
          }
          const depth = orderBook.getDepth();
          RedisManager.getInstance().sendToApi(clientId, {
            type: "DEPTH",
            payload: {
              depth,
            },
          });
        } catch (e) {
          console.log(e);
          RedisManager.getInstance().sendToApi(clientId, {
            type: "DEPTH",
            payload: {
              depth: {
                YES: {
                  bids: [],
                  asks: [],
                },
                NO: {
                  bids: [],
                  asks: [],
                },
              },
            },
          });
        }
        break;
      case CANCEL_ORDER:
        try {
          const orderId = message.data.orderId;
          const cancelEvent = message.data.event;
          const cancelOrderBook = this.orderBook.find(
            (orderBook) => orderBook.ticker() === cancelEvent
          );
          if (!cancelOrderBook) {
            throw new Error("Order book not found");
          }

          const order = cancelOrderBook
            .getOpenOrders(message.data.userId)
            .find((order) => order.orderId === orderId);
          if (!order) {
            throw new Error("Order not found");
          }

          if (order.side === "BUY") {
            const price = cancelOrderBook.cancelBidOrder(order);
            this.balances.set(message.data.userId, {
              available:
                this.balances.get(message.data.userId)!.available +
                price! * order.quantity,
              locked:
                this.balances.get(message.data.userId)!.locked -
                price! * order.quantity,
            });
          } else {
            const price = cancelOrderBook.cancelAskOrder(order);
            // TODO: Update the locked assests also
          }
        } catch (e) {
          console.log("Error hwile cancelling order", e);
          console.log(e);
        }
        break;
    }
  }
  createOrder(
    event: string,
    price: number,
    quantity: number,
    side: "BUY" | "SELL",
    userId: string,
    outcome: "YES" | "NO"
  ) {
    const orderBook = this.orderBook.find(
      (orderBook) => orderBook.ticker() === event
    );

    if (!orderBook) {
      throw new Error("Order book not found");
    }

    this.checkAndLockFunds(userId, price, outcome, side, event, quantity);

    const order: Order = {
      price,
      quantity,
      side,
      filled: 0,
      userId,
      outcome,
      orderId: Math.random().toString(36).substring(7),
    };

    const { executedQty, fills } = orderBook.addOrder(order);

    this.updateBalances(fills, userId, event, outcome, side);
    return {
      executedQty,
      fills,
      orderId: order.orderId,
    };
  }

  updateBalances(
    fills: Fill[],
    userId: string,
    event: string,
    outcome: "YES" | "NO",
    side: "BUY" | "SELL"
  ) {
    // Process each fill
    fills.forEach((fill) => {
      const fillAmount = fill.price * fill.quantity;

      // Handle the initiating user's balance
      if (side === "BUY") {
        // When buying, user's locked funds are converted to position value
        this.balances.set(userId, {
          available: this.balances.get(userId)!.available,
          locked: this.balances.get(userId)!.locked - fillAmount,
        });

        // Update positions for the buyer
        this.updatePosition(userId, event, outcome, fill.quantity);

        // Handle counterparty's balance - seller receives payment
        this.balances.set(fill.otherUserId, {
          available:
            this.balances.get(fill.otherUserId)!.available + fillAmount,
          locked: this.balances.get(fill.otherUserId)!.locked - fill.quantity,
        });

        // Update positions for the seller (counterparty)
        this.updatePosition(fill.otherUserId, event, outcome, -fill.quantity);
      } else {
        // SELL
        // When selling, user receives payment
        this.balances.set(userId, {
          available: this.balances.get(userId)!.available + fillAmount,
          locked: this.balances.get(userId)!.locked - fill.quantity,
        });

        // Update positions for the seller
        this.updatePosition(userId, event, outcome, -fill.quantity);

        // Handle counterparty's balance - buyer's locked funds are converted to position value
        this.balances.set(fill.otherUserId, {
          available: this.balances.get(fill.otherUserId)!.available,
          locked: this.balances.get(fill.otherUserId)!.locked - fillAmount,
        });

        // Update positions for the buyer (counterparty)
        this.updatePosition(fill.otherUserId, event, outcome, fill.quantity);
      }
    });
  }

  private updatePosition(
    userId: string,
    event: string,
    outcome: "YES" | "NO",
    quantity: number
  ) {
    // Initialize user's positions map if it doesn't exist
    if (!this.positions.has(userId)) {
      this.positions.set(userId, new Map());
    }

    // Initialize event map if it doesn't exist for this user
    const userPositions = this.positions.get(userId)!;
    if (!userPositions.has(event)) {
      userPositions.set(event, { YES: 0, NO: 0 });
    }

    // Update the specific outcome position
    const eventPositions = userPositions.get(event)!;
    eventPositions[outcome] += quantity;

    // Update the position in the map
    userPositions.set(event, eventPositions);
  }

  checkAndLockFunds(
    userId: string,
    price: number,
    outcome: "YES" | "NO",
    side: "BUY" | "SELL",
    event: string,
    quantity: number
  ) {
    if (side === "BUY") {
      if (this.balances.get(userId)!.available < price * quantity) {
        throw new Error("Insufficient funds");
      }
      this.balances.set(userId, {
        available: this.balances.get(userId)!.available - price * quantity,
        locked: this.balances.get(userId)!.locked + price * quantity,
      });
    } else {
      // Check if the order book has enough YES or NO volume
      const orderBook = this.orderBook.find(
        (orderBook) => orderBook.ticker() === event
      );
      if (!orderBook) {
        throw new Error("Order book not found");
      }
      if (outcome === "YES") {
        if (this.positions.get(userId)!.get(event)!.YES < quantity) {
          throw new Error("Insufficient YES positions");
        }
        this.positions.get(userId)!.get(event)!.YES -= quantity;
      } else {
        if (this.positions.get(userId)!.get(event)!.NO < quantity) {
          throw new Error("Insufficient NO positions");
        }
        this.positions.get(userId)!.get(event)!.NO -= quantity;
      }
    }
  }
}
