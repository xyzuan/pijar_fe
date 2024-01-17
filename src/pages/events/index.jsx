"use client";

import { useGetAllEventsQuery } from "@/redux/api/eventsApi";
import Image from "next/image";
import moment from "moment";
import { useRouter } from "next/router";
import { useGetAllTicketsQuery } from "@/redux/api/ticketsApi";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Home() {
  const router = useRouter();

  const {
    data: events,
    isLoading: eventsLoading,
    isFetching: eventsFetching,
  } = useGetAllEventsQuery();

  const { data: tickets } = useGetAllTicketsQuery();

  console.log(tickets);

  return (
    <main className={`flex container max-w-screen-xl flex-col`}>
      <section className="min-h-screen flex md:flex-row flex-col-reverse mt-12">
        <div className="md:w-[75vw] w-full">
          <h1 className=" font-bold text-6xl mb-8 mt-6 md:mt-0">Event</h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
            {events?.data?.map((v, i) => {
              return (
                <div
                  onClick={() => router.push(`/events/${v.id}`)}
                  className="bg-neutral-900 md:w-[262px] w-full overflow-hidden rounded-xl cursor-pointer"
                >
                  <div className="w-full h-[162px] overflow-hidden">
                    {v?.img ? (
                      <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "auto" }}
                        src={v.img}
                        alt={v.name}
                      />
                    ) : (
                      <h1>No Image</h1>
                    )}
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
          </div>
        </div>
        <div className="md:w-[25vw] w-full">
          <h1 className="font-bold text-2xl mb-6">My Ticket</h1>
          {tickets?.map((v, i) => {
            return (
              <Card
                className="cursor-pointer mb-3"
                onClick={() =>
                  router.push(
                    `/tickets?id=${v.event_id}&tid=${v.id}&trxId=${v.transaction_id}`
                  )
                }
              >
                <CardHeader>
                  <p className="text-xs text-neutral-200">{v?.code}</p>
                  <h1 className="text-lg text-neutral-200">{v?.code}</h1>
                </CardHeader>
                <CardContent>
                  <p>{v?.holder_name}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}
