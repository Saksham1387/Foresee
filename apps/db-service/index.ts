import prisma from "db";
import { createClient } from "redis";
import type { DbMessage } from "./types";

async function main(){
    const redisClient = createClient();
    redisClient.connect();
    console.log("Connected to Redis");

    while(true){
        const response = await redisClient.rPop("db_processor" )
        if(!response){
            
        }else {
            const data : DbMessage = JSON.parse(response as string);
            console.log("Received message", data);
            if(data.type === "TRADE_ADDED"){
                console.log("Adding trade to DB", data);
                const trade = await prisma.trade.create({
                    data: {
                        price: data.data.price,
                        quantity: data.data.quantity,
                        outcome: data.data.outcome,
                        user:{
                            connect:{
                                id: data.data.userId
                            }
                        }
                    }
                })
            }
        }
    }
}


main()