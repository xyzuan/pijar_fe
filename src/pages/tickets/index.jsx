"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGetEventsByIdQuery } from "@/redux/api/eventsApi";
import { useGetTicketsByIdQuery } from "@/redux/api/ticketsApi";
import { useGetTransactionsByIdQuery } from "@/redux/api/transactionsApi";
import Image from "next/image";
import { useRouter } from "next/router";
import parse from "html-react-parser";

export default function Home() {
  const router = useRouter();
  const { id, tid, trxId } = router.query;

  const {
    data: eventData,
    isLoading: eventLoading,
    isFetching: eventFetching,
  } = useGetEventsByIdQuery({ id });
  const { data: ticketData } = useGetTicketsByIdQuery({ id: tid });
  const { data: transactionData } = useGetTransactionsByIdQuery({ id: trxId });

  return (
    <main className={`flex container max-w-screen-xl flex-col`}>
      <section className="min-h-[80vh] mt-12 flex md:flex-row flex-col">
        <div className="md:border-r md:pr-6">
          <Card className="mt-6 md:w-[40vw] bg-slate-100 text-black">
            <CardHeader>
              <p className="text-xs">{ticketData?.code}</p>
              <h1 className="text-lg">{eventData?.name}</h1>
            </CardHeader>
            <CardContent>
              <p>{ticketData?.holder_name}</p>
              <p>{ticketData?.holder_email}</p>
            </CardContent>
          </Card>
          <h1 className="text-3xl font-bold mt-8 mb-6">Ticket Detail</h1>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between">
              <h1 className=" text-neutral-300">Transaction ID</h1>
              <h1 className=" text-lg font-semibold">
                {ticketData?.transaction_id}
              </h1>
            </div>
            <div className="flex justify-between">
              <h1 className=" text-neutral-300">Clarity Ammount</h1>
              <h1 className=" text-lg font-semibold">
                {transactionData?.amount}
              </h1>
            </div>
            <div className="flex justify-between">
              <h1 className=" text-neutral-300">Payment Method</h1>
              <h1 className=" text-lg font-semibold">
                {transactionData?.payment_channel}
              </h1>
            </div>
            <div className="flex justify-between">
              <h1 className=" text-neutral-300">Recent Update</h1>
              <h1 className=" text-lg font-semibold">
                {transactionData?.updated_at}
              </h1>
            </div>
          </div>
        </div>
        <div className="md:pl-6 mt-12 md:mt-0">
          <h1 className="text-3xl font-bold">Event Information</h1>
          {!eventFetching && !eventLoading ? (
            <>
              <div className="h-[220px] mt-6 overflow-hidden rounded-2xl">
                <Image
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "auto" }}
                  src={eventData?.img}
                  alt={eventData?.name}
                />
              </div>
              <div className="mt-8">
                <h1 className="font-bold text-4xl mb-6">{eventData?.name}</h1>
                <p className="text-neutral-200">
                  {parse(eventData?.description)}
                </p>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </section>
    </main>
  );
}
