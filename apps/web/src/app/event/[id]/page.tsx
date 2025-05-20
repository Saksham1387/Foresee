import { Depth } from "@/components/depth/Depth";
import { EventOverview } from "@/components/EventOverview";
import { API_URL } from "@/lib/config";
import axios from "axios";

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const eventId = (await params).id;
  console.log("Event ID:", eventId);

  try {
    const response = await axios.get(`${API_URL}/event/${eventId}`);

    const event = response.data.data;
    console.log("Event:", event);
    return (
      <div className="flex justify-center flex-col">
        <div className="p-10">
          <EventOverview event={event} />
        </div>
        <div className="flex  ">
          <Depth event={event} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch event:", error);
    return <div>Error loading event</div>;
  }
}
