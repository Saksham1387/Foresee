import { Depth } from "./depth/Depth";
import { EventDescription } from "./EventDescription";
import { EventOverview } from "./EventOverview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const InfoPanel = ({ event }: { event: any }) => {
  return (
    <div className="flex  flex-col w-full gap-y-10 justify-start">
      <div>
        <EventOverview event={event} />
      </div>
      <Tabs defaultValue="orderbook" className="mb-6">
        <TabsList className="border-gray-200 w-1/3 justify-start rounded-none bg-transparent p-0 ">
          <TabsTrigger
            value="orderbook"
            className="rounded-none cursor-pointer text-gray-500 border-0 data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 text-base  font-normal"
          >
            Orderbook
          </TabsTrigger>
          <TabsTrigger
            value="timeline"
            className="rounded-none cursor-pointer text-gray-500 border-0 data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 text-base  font-normal"
          >
            Timeline
          </TabsTrigger>
          <TabsTrigger
            value="overview"
            className="rounded-none cursor-pointer  text-gray-500 border-0 data-[state=active]:border-b-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-6 py-3 text-base  font-normal"
          >
            Overview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orderbook" className="mt-6">
          <Depth event={event} />
        </TabsContent>

        <TabsContent value="timeline">
          <div className="bg-white rounded-lg border-gray-200 p-6 text-center text-2xl">
            <p className="text-gray-500">Coming soon</p>
          </div>
        </TabsContent>

        <TabsContent value="overview">
         <EventDescription description={event.description} />
        </TabsContent>
      </Tabs>
      <div></div>
    </div>
  );
};
