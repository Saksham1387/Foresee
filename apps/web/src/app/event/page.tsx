"use client";
import { InternalHeader } from "@/components/InternalHeader";
import { useEffect, useState } from "react";
import { API_URL } from "@/lib/config";
import axios from "axios";
import { TEvent } from "@/lib/types/event";
import { EventCard } from "@/components/EventCard";

const categories = [
  "All events",
  "Crypto",
  "Sports",
  "Politics",
  "Business",
  "Tech",
];

export default function Event() {
  const [events, setEvents] = useState<TEvent[]>([]);
  const [activeCategory, setActiveCategory] = useState("All events");

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get(`${API_URL}/events`);
      setEvents(res.data.data);
    };

    fetchEvents();
  }, []);
  return (
    <div className="bg-[#f5f5f5] h-screen">
      <InternalHeader />
      <div className=" border-b border-gray-200 pt-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto py-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap pb-2 px-1 border-b-2 font-medium text-sm ${
                  activeCategory === category
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
        <div className="flex gap-8">
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-6">All events</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
