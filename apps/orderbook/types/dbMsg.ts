
export const TRADE_ADDED = "TRADE_ADDED";
export const ORDER_UPDATE = "ORDER_UPDATE";

export type DbMessage = {
    type: typeof TRADE_ADDED,
    data: {
        id: string,
        price: string,
        quantity: string,
        timestamp: number,
        event: string,
        userId: string,
        outcome: "YES" | "NO",
        side: "BUY" | "SELL",
    }
} | {
    type: typeof ORDER_UPDATE,
    data: {
        orderId: string,
        executedQty: number,
        market?: string,
        price?: string,
        quantity?: string,
        side?: "buy" | "sell",
    }
}