"use client";

import { useGetAllEventsQuery } from "@/redux/api/eventsApi";
import Image from "next/image";
import moment from "moment";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const {
    data: events,
    isLoading: eventsLoading,
    isFetching: eventsFetching,
  } = useGetAllEventsQuery();

  console.log(events);

  return (
    <main className={`flex container max-w-screen-xl flex-col`}>
      <section className="h-screen mt-12">
        <h1 className=" font-bold text-6xl mb-8">Event</h1>
        {events?.data?.map((v, i) => {
          return (
            <div
              onClick={() => router.push(`/events/${v.id}`)}
              className="bg-neutral-900 w-[320px] overflow-hidden rounded-xl cursor-pointer"
            >
              <div className="w-full h-[128px] overflow-hidden">
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                  src={v.img}
                  alt={v.name}
                />
              </div>

              <div className="p-6">
                <h1 className="font-medium">{v.name}</h1>
                <div className="flex justify-between mt-2">
                  <h1 className="text-neutral-200 text-sm">
                    {v.location}
                    <br />
                    {v.capacity}
                  </h1>
                  <h1 className="text-neutral-200 text-sm text-end">
                    {moment(v.held_date).format("MMMM Do YYYY")}
                    <br />
                    {moment(v.held_date).format("h:mm:ss a")}
                  </h1>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
