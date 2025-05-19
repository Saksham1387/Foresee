export type DbMessage = {
    type: "TRADE_ADDED",
    data: {
        id: string,
        userId: string,
        price: string,
        quantity: string,
        timestamp: number,
        event: string,
        outcome: "YES" | "NO",
        side: "BUY" | "SELL",
    }
} | {
    type: "ORDER_UPDATE",
    data: {
        orderId: string,
        executedQty: number,
        event?: string,
        price?: string,
        quantity?: string,
        side?: "BUY" | "SELL",
        outcome?: "YES" | "NO",
    }
}