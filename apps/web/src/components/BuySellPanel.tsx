import { ChevronDown, Minus, Plus } from "lucide-react";
import { Button } from "./ui/button";

export const BuySellPanel = () => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            Yes ₹6.1
          </Button>
          <Button variant="outline" className="border-gray-300 text-gray-700">
            No ₹3.9
          </Button>
        </div>

        <div className="mb-6">
          <div className="text-sm font-medium mb-2">Set price</div>
          <div className="h-1 bg-gray-200 rounded-full mb-2">
            <div className="h-1 bg-blue-500 rounded-full w-1/2"></div>
          </div>
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
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-bold text-lg">₹6.2</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
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
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-bold text-lg">1</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 py-4">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">₹6.2</div>
              <div className="text-sm text-gray-500">You put</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-600">₹10.0</div>
              <div className="text-sm text-gray-500">You get</div>
            </div>
          </div>

          <div>
            <button className="flex items-center justify-between w-full text-gray-700">
              <span className="font-medium">Advanced Options</span>
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>

          <Button className="w-full bg-blue-500 hover:bg-blue-600">
            Place order
          </Button>
        </div>
      </div>
    </div>
  );
};
