export type DepthUpdateMessage = {
    stream: string,
    data: {
       YES:{
        asks:any[],
        bids:any[]
       },
       NO:{
        asks:any[],
        bids:any[]
       }
    }
}


export type TradeMessage = {
    stream: string,
    data: {
        price: string,
        quantity: string,
        timestamp: number,
        event: string,
        userId: string,
        outcome: "YES" | "NO",
        side: "BUY" | "SELL"
    }
}

export type WsMessage = DepthUpdateMessage | TradeMessage