import { formatDateTime } from "@/lib/helper";
import { TEvent } from "@/lib/types/event";
import Image from "next/image";

interface EventOverviewProps {
  event: TEvent;
}

export const EventOverview = ({ event }: EventOverviewProps) => {
  return (
    <div className="flex items-start gap-4 mb-6">
      <div className="w-20 h-20 rounded-xl overflow-hiddenflex-shrink-0 ">
        <Image
          src={event.thumbnail}
          alt="thumbnail"
          width={80}
          height={80}
          className="object-cover rounded-2xl"
        />
      </div>
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-1">
          {event.title}
        </h1>
        <p className="text-gray-500">{event.question}</p>
        <span className="text-sm text-gray-400">Expires at: {formatDateTime(event.expiresAt)}</span>
      </div>
    </div>
  );
};
