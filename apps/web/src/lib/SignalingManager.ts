import { WS_URL } from "./config";

export class SignalingManager {
  private ws: WebSocket;
  private static instance: SignalingManager;
  private bufferedMessages: any[] = [];
  private callbacks: any = {};
  private initialized: boolean = false;

  constructor() {
    this.ws = new WebSocket(WS_URL);
    this.bufferedMessages = [];
    this.init();
  }

  static getInstance() {
   if(!this.instance){
     this.instance = new SignalingManager();
   }
   return this.instance;
  }
  init() {
    this.ws.onopen = () => {
      this.initialized = true;
      this.bufferedMessages.forEach((message) => {
        this.ws.send(JSON.stringify(message));
      });
      this.bufferedMessages = [];
    };

    this.ws.onmessage = (event) => {
      console.log("Event", event);
      const message = JSON.parse(event.data);
      console.log("Message", message);
      // TODO: Check on here
      const type = message.data.e;
      console.log("Type", type);
      if (this.callbacks[type]) {
        console.log("Callbacks", this.callbacks);
        //@ts-ignore
        this.callbacks[type].forEach(({ callback }) => {
          if (type === 'depth') {
            // TODO: Implement the logic here
            console.log("in hereeee")
            const updatedBids = message.data.YES.bids;
            const updatedAsks = message.data.YES.asks;
            callback({ bids: updatedBids, asks: updatedAsks });
          }
        });
      }
    };
  }

  sendMessage(message: any) {
    console.log("initialized", this.initialized);

    if (!this.initialized) {
      this.bufferedMessages.push(message);
      return
    }

    console.log("Sending message", message);
    this.ws.send(JSON.stringify(message));
  }

  async registerCallback(type: string, callback: any, id: string) {
    this.callbacks[type] = this.callbacks[type] || [];
    this.callbacks[type].push({ callback, id });
  }

  async deRegisterCallback(type: string, id: string) {
    if (this.callbacks[type]) {

      const index = this.callbacks[type].findIndex(
        //@ts-ignore
        (callback) => callback.id === id
      );
      if (index !== -1) {
        this.callbacks[type].splice(index, 1);
      }
    }
  }
}
