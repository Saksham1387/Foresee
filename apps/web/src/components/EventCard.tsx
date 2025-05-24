"use client";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TEvent } from "@/lib/types/event";
import { formatDateTime } from "@/lib/helper";
import { TimerOff } from "lucide-react";
import { useRouter } from "next/navigation";

interface EventCardProps {
  event: TEvent;
}

export const EventCard = ({ event }: EventCardProps) => {
  const router = useRouter();
  return (
    <div>
      <Card className=" bg-white border-none">
        <CardContent className="p-6">
          <div className="flex items-center space-x-2 mb-4">
            <TimerOff className="w-4 h-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              {formatDateTime(event.expiresAt)}
            </span>
          </div>

          <div className="flex items-start space-x-4 mb-4">
            <div className="w-[100px] h-[100px] rounded-lg overflow-hidden flex-shrink-0">
                {/* TODO: Replace with the event thumbnail */}
              <Image
                src={"/hero02.jpeg"}
                alt="Event thumbnail"
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 mb-3 leading-tight">
                {/* Slice the title to fit in the card */}
                {event.title.slice(0, 30)}...
              </h3>

              <div className="flex items-start space-x-2 text-sm text-gray-600">
                <div>
                  <span className="font-medium text-gray-500">
                    {event.question}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <Button
              variant="outline"
              onClick={() => {
                router.push(`/event/${event.id}`);
              }}
              className="flex-1 h-12 border-2 cursor-pointer border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:border-blue-300 font-semibold "
            >
              Yes ₹{event.yesPrice}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                router.push(`/event/${event.id}`);
              }}
              className="flex-1 h-12 border-2 cursor-pointer border-red-200 bg-red-50 text-red-700 hover:bg-red-100 hover:border-red-300 font-semibold"
            >
              No ₹{event.noPrice}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
