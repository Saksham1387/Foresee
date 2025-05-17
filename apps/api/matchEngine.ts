import db from "db";

interface Order {
    id: string;
    userId: string;
    eventId: string;
    createdAt: Date;
    updatedAt: Date;
    orderType: "MARKET" | "LIMIT";
    outcome: "YES" | "NO";
    side: "BUY" | "SELL";
    status: "PENDING" | "FILLED" | "CANCELED" | "PARTIAL" | "EXPIRED";
    quantity: number;
    filledQuantity: number;
    price: number;
    expiresAt: Date | null;
  }
  
  export async function matchOrder(order: Order) {
    let updatedOrder = await db.order.update({
      where: { id: order.id },
      data: {
        status: "PENDING",
        filledQuantity: 0,
      },
    });
  
    if (order.side === "BUY") {
      console.log("Buying");
      const orderBook = await db.orderBookEntry.findMany({
        where: {
          eventId: order.eventId,
          outcome: order.outcome,
          side: "SELL",
        },
      });
  
      if (orderBook.length === 0) {
        await db.orderBookEntry.create({
          data: {
            eventId: order.eventId,
            orderId: order.id,
            outcome: order.outcome,
            side: order.side,
            price: order.price,
            quantity: order.quantity,
          },
        });
  
        return updatedOrder;
      }
  
      let remainingQuantity = order.quantity;
      let totalFilledQuantity = 0;
  
      for (const orderBookEntry of orderBook) {
        if (
          orderBookEntry.price.toNumber() <= order.price &&
          remainingQuantity > 0
        ) {
          const bookQuantity = orderBookEntry.quantity.toNumber();
          const filledQuantity = Math.min(bookQuantity, remainingQuantity);
  
          remainingQuantity -= filledQuantity;
          totalFilledQuantity += filledQuantity;
  
          if (filledQuantity === bookQuantity) {
            await db.orderBookEntry.delete({
              where: { id: orderBookEntry.id },
            });
          } else if (filledQuantity < bookQuantity) {
            await db.orderBookEntry.update({
              where: { id: orderBookEntry.id },
              data: {
                quantity: bookQuantity - filledQuantity,
              },
            });
          }
        }
      }
  
      if (totalFilledQuantity > 0) {
        const status =
          totalFilledQuantity === Number(order.quantity) ? "FILLED" : "PARTIAL";
        updatedOrder = await db.order.update({
          where: { id: order.id },
          data: {
            filledQuantity: totalFilledQuantity,
            status,
          },
        });
  
        if (status === "PARTIAL" && remainingQuantity > 0) {
          await db.orderBookEntry.create({
            data: {
              eventId: order.eventId,
              orderId: order.id,
              outcome: order.outcome,
              side: order.side,
              price: order.price,
              quantity: remainingQuantity,
            },
          });
        }
      } else {
        await db.orderBookEntry.create({
          data: {
            eventId: order.eventId,
            orderId: order.id,
            outcome: order.outcome,
            side: order.side,
            price: order.price,
            quantity: order.quantity,
          },
        });
      }
    } else if (order.side === "SELL") {
      console.log("Selling");
      const orderBook = await db.orderBookEntry.findMany({
        where: {
          eventId: order.eventId,
          outcome: order.outcome,
          side: "BUY",
        },
      });
  
      if (orderBook.length === 0) {
        await db.orderBookEntry.create({
          data: {
            eventId: order.eventId,
            orderId: order.id,
            outcome: order.outcome,
            side: order.side,
            price: order.price,
            quantity: order.quantity,
          },
        });
  
        return updatedOrder;
      }
  
      let remainingQuantity = order.quantity;
      let totalFilledQuantity = 0;
  
      for (const orderBookEntry of orderBook) {
        if (
          orderBookEntry.price.toNumber() >= order.price &&
          remainingQuantity > 0
        ) {
          const bookQuantity = orderBookEntry.quantity.toNumber();
          const filledQuantity = Math.min(bookQuantity, remainingQuantity);
          remainingQuantity -= filledQuantity;
          totalFilledQuantity += filledQuantity;
  
          if (filledQuantity === bookQuantity) {
            await db.orderBookEntry.delete({
              where: { id: orderBookEntry.id },
            });
          } else if (filledQuantity < bookQuantity) {
            await db.orderBookEntry.update({
              where: { id: orderBookEntry.id },
              data: {
                quantity: bookQuantity - filledQuantity,
              },
            });
          }
        }
      }
  
      if (totalFilledQuantity > 0) {
        const status =
          totalFilledQuantity === Number(order.quantity) ? "FILLED" : "PARTIAL";
        updatedOrder = await db.order.update({
          where: { id: order.id },
          data: {
            filledQuantity: totalFilledQuantity,
            status,
          },
        });
  
        if (status === "PARTIAL" && remainingQuantity > 0) {
          await db.orderBookEntry.create({
            data: {
              eventId: order.eventId,
              orderId: order.id,
              outcome: order.outcome,
              side: order.side,
              price: order.price,
              quantity: remainingQuantity,
            },
          });
        }
      } else {
        await db.orderBookEntry.create({
          data: {
            eventId: order.eventId,
            orderId: order.id,
            outcome: order.outcome,
            side: order.side,
            price: order.price,
            quantity: order.quantity,
          },
        });
      }
    }
  
    return updatedOrder;
  }
  