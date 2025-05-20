import { formatDateTime } from "@/lib/helper";
import { TEvent } from "@/lib/types/event";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface EventOverviewProps {
  event: TEvent;
}

export const EventOverview = ({ event }: EventOverviewProps) => {
  return (
    <div className="flex justify-center pt-8 px-4">
      <Card className="w-full max-w-md p-6 shadow-lg">
        <CardHeader className="pb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Event Overview
          </h2>
          <CardTitle className="text-2xl font-bold text-gray-900">
            {event.title}
          </CardTitle>
        </CardHeader>

        <CardDescription className="text-gray-600 mb-4">
          {event.description}
        </CardDescription>

        <CardContent className="space-y-3">
          <p className="text-sm">
            <span className="font-medium">Expires at:</span>{" "}
            {formatDateTime(event.expiresAt)}
          </p>
          <p className="text-sm">
            <span className="font-medium">Volume:</span> {event.volume}
          </p>
          <p className="text-sm">
            <span className="font-medium">Yes Price:</span> {event.yesPrice}
          </p>
          <p className="text-sm">
            <span className="font-medium">No Price:</span> {event.noPrice}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
