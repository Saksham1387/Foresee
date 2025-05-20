"use client";
import { getDepth } from "@/lib/http";
import { TEvent } from "@/lib/types/event";
import { useEffect, useState } from "react";
import { SignalingManager } from "@/lib/SignalingManager";
import { AskTable } from "./AsksTable";
import { BidTable } from "./BidsTable";

interface DepthProps {
  event: TEvent;
}

export const Depth = ({ event }: DepthProps) => {
  const [bids, setBids] = useState<{ price: number; quantity: number }[]>([]);
  const [asks, setAsks] = useState<{ price: number; quantity: number }[]>([]);

  useEffect(() => {
    SignalingManager.getInstance().registerCallback(
      'depth',
      (data: any) => {
        console.log("New Depth data");
        console.log("Data:", data);

        setBids((originalBids) => {
          const bidsAfterUpdate = [...(originalBids || [])];

          // Handle updates to existing bids
          for (let i = 0; i < bidsAfterUpdate.length; i++) {
            for (let j = 0; j < data.bids.length; j++) {
              if (bidsAfterUpdate[i].price === data.bids[j].price) {
                // Update quantity
                bidsAfterUpdate[i].quantity = data.bids[j].quantity;
                // Remove if quantity is 0
                if (bidsAfterUpdate[i].quantity === 0) {
                  bidsAfterUpdate.splice(i, 1);
                  i--; // Adjust index after removing item
                }
                break;
              }
            }
          }

          // Add new bids
          for (let j = 0; j < data.bids.length; j++) {
            const bidPrice = data.bids[j].price;
            const bidQuantity = data.bids[j].quantity;
            
            if (
              bidQuantity !== 0 &&
              !bidsAfterUpdate.some(bid => bid.price === bidPrice)
            ) {
              bidsAfterUpdate.push({ price: bidPrice, quantity: bidQuantity });
            }
          }
          
          // Sort bids (highest to lowest price)
          bidsAfterUpdate.sort((a, b) => b.price - a.price);
          
          return bidsAfterUpdate;
        });

        setAsks((originalAsks) => {
          const asksAfterUpdate = [...(originalAsks || [])];

          // Handle updates to existing asks
          for (let i = 0; i < asksAfterUpdate.length; i++) {
            for (let j = 0; j < data.asks.length; j++) {
              if (asksAfterUpdate[i].price === data.asks[j].price) {
                // Update quantity
                asksAfterUpdate[i].quantity = data.asks[j].quantity;
                // Remove if quantity is 0
                if (asksAfterUpdate[i].quantity === 0) {
                  asksAfterUpdate.splice(i, 1);
                  i--; // Adjust index after removing item
                }
                break;
              }
            }
          }

          // Add new asks
          for (let j = 0; j < data.asks.length; j++) {
            const askPrice = data.asks[j].price;
            const askQuantity = data.asks[j].quantity;
            
            if (
              askQuantity !== 0 &&
              !asksAfterUpdate.some(ask => ask.price === askPrice)
            ) {
              asksAfterUpdate.push({ price: askPrice, quantity: askQuantity });
            }
          }
          
          // Sort asks (lowest to highest price)
          asksAfterUpdate.sort((a, b) => a.price - b.price);
          
          return asksAfterUpdate;
        });
      },
      `DEPTH@${event.title}`
    );

    SignalingManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`depth@${event.title}`],
    });

    getDepth(event.id).then((d) => {
      setBids(d.YES.bids.reverse());
      setAsks(d.YES.asks);
    });

    return () => {
      SignalingManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`depth@${event.title}`],
      });
      SignalingManager.getInstance().deRegisterCallback(
        "depth",
        `DEPTH-${event.title}`
      );
    };
  }, []);

  return (
    <div className="flex flex-1">
      <div className="flex flex-col gap-5 flex-1">
        <TableHeader />
        <AskTable asks={asks} />
        <BidTable bids={bids} />
      </div>
    </div>
  );
};

function TableHeader() {
  return (
    <div className="flex justify-between text-xs">
      <div className="text-black">Price</div>
      <div className="text-black">Quantity</div>
      <div className="text-slate-500">Total</div>
    </div>
  );
}