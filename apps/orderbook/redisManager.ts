import { createClient, type RedisClientType } from "redis";
import type { MessageToApi } from "./types/toAPI";

export class RedisManager {
    private client  :RedisClientType
    private static instance : RedisManager


    constructor (){
        this.client  = createClient();
        this.client.connect();
    }
    

    public static getInstance(){
        if(!RedisManager.instance){
            RedisManager.instance = new RedisManager()
        }
        return RedisManager.instance
    }


    public sendToApi(clientId: string, message: MessageToApi) {
        this.client.publish(clientId, JSON.stringify(message));
    }

    
}