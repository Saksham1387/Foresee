import type { Order } from "../trade/orderBook";

export type MessageToApi = {
    type: "DEPTH"
    payload:{
        depth: {
            YES: {
                bids: {price: number, quantity: number}[];
                asks: {price: number, quantity: number}[];
            }
            NO: {
                bids: {price: number, quantity: number}[];
                asks: {price: number, quantity: number}[];
            }
        }
    }
} | {
    type: "OPEN_ORDERS"
    payload:Order[]
    
} | {
    type: "BALANCE"
    payload:{
        userId: string;
        balance: number;
    }
} | {
    type :"ORDER_PLACED"
    payload:{
        orderId: string;
        executedQty: number;
        fills: {
            price: number;
            quantity: number;
            side: "BUY" | "SELL";
            userId: string;
            outcome: "YES" | "NO";
        }[];
    }
} | {
    type: "ORDER_CANCELLED"
    payload:{
        orderId: string;
        executedQty: number;
        remainingQty: number;
    }
} | {
    type: "EVENT_CREATED"
    payload:{
        event: string;
        expiresAt: string;
    }
} | {
    type: "USER_CREATED"
    payload:{
        userId: string;
        balance: number;
        positions: Map<string, { YES: number; NO: number }>;
    }
}