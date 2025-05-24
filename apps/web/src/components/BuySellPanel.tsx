"use client";
import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { TEvent } from "@/lib/types/event";
import { API_URL } from "@/lib/config";
import axios from "axios";
import { toast } from "sonner";

interface BuySellPanelProps {
  event: TEvent;
}

export const BuySellPanel = ({ event }: BuySellPanelProps) => {
  const [selectedOption, setSelectedOption] = useState<"yes" | "no">("yes");
  const [yesPrice, setYesPrice] = useState<number>(Number(event.yesPrice));
  const [yesQuantity, setYesQuantity] = useState(1);
  const [noPrice, setNoPrice] = useState<number>(Number(event.noPrice));
  const [noQuantity, setNoQuantity] = useState(1);
  const isLoggedIn = localStorage.getItem("token") !== "";
  console.log("isLoggedIn", isLoggedIn);
  const price = selectedOption === "yes" ? yesPrice : noPrice;
  const quantity = selectedOption === "yes" ? yesQuantity : noQuantity;

  const handlePriceChange = (delta: number) => {
    if (selectedOption === "yes") {
      setYesPrice(Math.max(0.1, yesPrice + delta));
    } else {
      setNoPrice(Math.max(0.1, noPrice + delta));
    }
  };

  const handleQuantityChange = (delta: number) => {
    if (selectedOption === "yes") {
      setYesQuantity(Math.max(1, yesQuantity + delta));
    } else {
      setNoQuantity(Math.max(1, noQuantity + delta));
    }
  };

  const totalInvestment = price * quantity;
  const potentialReturn = quantity * 10; // Assuming 10 is max return per unit

  const handlePlaceOrder = async () => {
    if (!isLoggedIn) {
      toast.error("Please sign in to place order");
      return;
    }
    let res;
    if (selectedOption === "yes") {
      try {
        res = await axios.post(
          `${API_URL}/order`,
          {
            eventId: event.id,
            orderType: "LIMIT",
            outcome: selectedOption.toUpperCase(),
            side: "BUY",
            quantity: yesQuantity,
            price: yesPrice,
          },
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );
      } catch (err) {
        console.log(err);
        toast.error("Failed to place order");
        return;
      }
      if (res.data.success) {
        toast.success("Order placed successfully");
        return;
      } else {
        toast.error("Failed to place order");
        return;
      }
    } else {
      try {
        res = await axios.post(
          `${API_URL}/order`,
          {
            eventId: event.id,
            orderType: "LIMIT",
            outcome: selectedOption.toUpperCase(),
            side: "BUY",
            quantity: noQuantity,
            price: noPrice,
          },
          {
            headers: {
              Authorization: `${localStorage.getItem("token")}`,
            },
          }
        );
      } catch (err) {
        console.log(err);
        toast("Failed to place order");
        return;
      }
      if (res.data.success) {
        toast.success("Order placed successfully");
        return;
      } else {
        toast("Failed to place order");
        return;
      }
    }
  };

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button
            className={`${
              selectedOption === "yes"
                ? "bg-black  text-white"
                : "bg-gray-200 hover:bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSelectedOption("yes")}
          >
            Yes ₹{yesPrice}
          </Button>
          <Button
            variant={selectedOption === "no" ? "default" : "outline"}
            className={`${
              selectedOption === "no"
                ? "bg-black  text-white "
                : "border-none bg-gray-200 text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => setSelectedOption("no")}
          >
            No ₹{noPrice}
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">Price</div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => handlePriceChange(-0.1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-bold text-lg">₹{price}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => handlePriceChange(0.1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="text-xs text-gray-500">1424211 qty available</div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1">
                <span className="font-medium">Quantity</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-400"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <path d="M12 17h.01"></path>
                </svg>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => handleQuantityChange(-1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-bold text-lg">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">
                ₹{totalInvestment.toFixed(1)}
              </div>
              <div className="text-sm text-gray-500">You put</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">
                ₹{potentialReturn.toFixed(1)}
              </div>
              <div className="text-sm text-gray-500">You get</div>
            </div>
          </div>

          <Button
            disabled={!isLoggedIn}
            className="w-full text-white bg-black hover:bg-black/90"
            onClick={handlePlaceOrder}
          >
            {isLoggedIn ? "Place order" : "Sign in to place order"}
          </Button>
        </div>
      </div>
    </div>
  );
};
