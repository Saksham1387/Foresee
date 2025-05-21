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
  const [Yesbids, setYesBids] = useState<{ price: number; quantity: number }[]>(
    []
  );
  const [Yesasks, setYesAsks] = useState<{ price: number; quantity: number }[]>(
    []
  );
  const [Nobids, setNoBids] = useState<{ price: number; quantity: number }[]>(
    []
  );
  const [Noasks, setNoAsks] = useState<{ price: number; quantity: number }[]>(
    []
  );

  useEffect(() => {
    SignalingManager.getInstance().registerCallback(
      "depth",
      (data: any) => {
        console.log("New Depth data");
        console.log("Data:", data);

        setYesBids((originalBids) => {
          const bidsAfterUpdate = [...(originalBids || [])];

          // Handle updates to existing bids
          for (let i = 0; i < bidsAfterUpdate.length; i++) {
            for (let j = 0; j < data.yesbids.length; j++) {
              if (bidsAfterUpdate[i].price === data.yesbids[j].price) {
                // Update quantity
                bidsAfterUpdate[i].quantity = data.yesbids[j].quantity;
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
          for (let j = 0; j < data.yesbids.length; j++) {
            const bidPrice = data.yesbids[j].price;
            const bidQuantity = data.yesbids[j].quantity;

            if (
              bidQuantity !== 0 &&
              !bidsAfterUpdate.some((bid) => bid.price === bidPrice)
            ) {
              bidsAfterUpdate.push({ price: bidPrice, quantity: bidQuantity });
            }
          }

          // Sort bids (highest to lowest price)
          bidsAfterUpdate.sort((a, b) => b.price - a.price);

          return bidsAfterUpdate;
        });
        setNoBids((originalBids) => {
          const bidsAfterUpdate = [...(originalBids || [])];

          // Handle updates to existing bids
          for (let i = 0; i < bidsAfterUpdate.length; i++) {
            for (let j = 0; j < data.nobids.length; j++) {
              if (bidsAfterUpdate[i].price === data.nobids[j].price) {
                // Update quantity
                bidsAfterUpdate[i].quantity = data.nobids[j].quantity;
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
          for (let j = 0; j < data.nobids.length; j++) {
            const bidPrice = data.nobids[j].price;
            const bidQuantity = data.nobids[j].quantity;

            if (
              bidQuantity !== 0 &&
              !bidsAfterUpdate.some((bid) => bid.price === bidPrice)
            ) {
              bidsAfterUpdate.push({ price: bidPrice, quantity: bidQuantity });
            }
          }

          // Sort bids (highest to lowest price)
          bidsAfterUpdate.sort((a, b) => b.price - a.price);

          return bidsAfterUpdate;
        });

        setYesAsks((originalAsks) => {
          const asksAfterUpdate = [...(originalAsks || [])];

          // Handle updates to existing asks
          for (let i = 0; i < asksAfterUpdate.length; i++) {
            for (let j = 0; j < data.yesasks.length; j++) {
              if (asksAfterUpdate[i].price === data.yesasks[j].price) {
                // Update quantity
                asksAfterUpdate[i].quantity = data.yesasks[j].quantity;
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
          for (let j = 0; j < data.yesasks.length; j++) {
            const askPrice = data.yesasks[j].price;
            const askQuantity = data.yesasks[j].quantity;

            if (
              askQuantity !== 0 &&
              !asksAfterUpdate.some((ask) => ask.price === askPrice)
            ) {
              asksAfterUpdate.push({ price: askPrice, quantity: askQuantity });
            }
          }

          // Sort asks (lowest to highest price)
          asksAfterUpdate.sort((a, b) => a.price - b.price);

          return asksAfterUpdate;
        });
        setNoAsks((originalAsks) => {
          const asksAfterUpdate = [...(originalAsks || [])];

          // Handle updates to existing asks
          for (let i = 0; i < asksAfterUpdate.length; i++) {
            for (let j = 0; j < data.noasks.length; j++) {
              if (asksAfterUpdate[i].price === data.noasks[j].price) {
                // Update quantity
                asksAfterUpdate[i].quantity = data.noasks[j].quantity;
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
          for (let j = 0; j < data.noasks.length; j++) {
            const askPrice = data.noasks[j].price;
            const askQuantity = data.noasks[j].quantity;

            if (
              askQuantity !== 0 &&
              !asksAfterUpdate.some((ask) => ask.price === askPrice)
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
      setYesBids(d.YES.bids.reverse());
      setYesAsks(d.YES.asks);
      setNoBids(d.NO.bids.reverse());
      setNoAsks(d.NO.asks);
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
    <div className="flex flex-1 gap-5 bg-white border border-gray-200 p-6 rounded-2xl">
      <div className="flex flex-col gap-2 flex-1">
        <TableHeader outcome={"YES"} />
        <AskTable asks={Yesasks} outcome="YES" />
        {/* <BidTable bids={Yesbids} /> */}
      </div>
      <div className="flex flex-col gap-2 flex-1 ">
        <TableHeader outcome={"NO"} />
        <AskTable asks={Noasks} outcome="NO" />
        {/* <BidTable bids={Nobids} /> */}
      </div>
    </div>
  );
};

function TableHeader({ outcome }: { outcome: "YES" | "NO" }) {
  return (
    <div className="flex justify-between ">
      <div className="text-black text-sm font-semibold">PRICE</div>
      <div className="text-black text-sm font-light">
        QTY AT <span> </span>
        <span className={outcome === "YES" ? "text-green-600" : "text-red-600"}>
          {outcome}
        </span>
      </div>
    </div>
  );
}
