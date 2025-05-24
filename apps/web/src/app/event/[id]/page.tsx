import { BuySellPanel } from "@/components/BuySellPanel";
import { InfoPanel } from "@/components/InfoPanel";
import { InternalHeader } from "@/components/InternalHeader";
import { API_URL } from "@/lib/config";
import axios from "axios";

export default async function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const eventId = (await params).id;
  try {
    const response = await axios.get(`${API_URL}/event/${eventId}`);
    const event = response.data.data;
    console.log(event);
    return (
      <div className="bg-[#f5f5f5] h-screen">
        <InternalHeader />
        <div className="flex flex-row justify-center gap-10 pt-10 w-screen px-5">
          <InfoPanel event={event} />

          <div className="w-1/3">
            <BuySellPanel  event={event}/>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch event:", error);
    return <div>Error loading event</div>;
  }
}
