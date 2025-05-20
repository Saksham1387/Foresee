"use client";
import { getDepth } from "@/lib/http";
import { TEvent } from "@/lib/types/event";
import { use, useEffect, useState } from "react";
import { AskTable } from "./AsksTable";
import { BidTable } from "./BidsTable";

interface DepthProps {
  event: TEvent;
}
export const Depth = ({ event }: DepthProps) => {
  const [bids, setBids] = useState<[string, string][]>([]);
  const [asks, setAsks] = useState<[string, string][]>([]);

  useEffect(() => {
    const fetch = async () => {
      const depth = await getDepth(event.id);
      console.log("Depth:", depth);
      setBids(depth.YES.bids.reverse());
      setAsks(depth.YES.asks);
      console.log("Asks:", asks);
      console.log("Depth:", depth);
    };
    fetch();
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
