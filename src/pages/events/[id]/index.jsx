"use client";

import { useGetEventsByIdQuery } from "@/redux/api/eventsApi";
import Image from "next/image";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAddTicketsMutation } from "@/redux/api/ticketsApi";
import { useState } from "react";
import PaymentModal from "./PaymentModal";

export default function Home() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: events,
    isLoading: eventsLoading,
    isFetching: eventsFetching,
  } = useGetEventsByIdQuery({ id });

  const [requestTicket] = useAddTicketsMutation();
  const [transactionModal, setTransactionModal] = useState(false);
  const [transactionData, setTransactionData] = useState();

  const handleRequestTicket = async () => {
    requestTicket({
      data: {
        event_id: id,
        holder_name: "Jody Yuantoro",
        holder_gender: "male",
        holder_email: "xyzuannihboss@gmail.com",
        holder_phone: "085155027511",
        purchase_amount: "100000",
      },
    })
      .then((res) => {
        setTransactionData(res.data.redirect_url);
        setTransactionModal(true);
      })
      .finally(() => {});
  };

  return (
    <main className={`flex container max-w-screen-xl flex-col`}>
      <section className="mt-12">
        {!eventsLoading && !eventsFetching ? (
          <>
            <div className="h-[430px] overflow-hidden rounded-2xl">
              <Image
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
                src={events?.img}
                alt={events?.name}
              />
            </div>

            <div className="flex my-12 mx-6">
              <div className="w-[60%]">
                <h1 className="font-bold text-4xl mb-6">{events?.name}</h1>
                <p className="text-neutral-200">{parse(events?.description)}</p>
              </div>
              <div className="w-[40%] h-fit p-8 m-8 border border-neutral-600 rounded-2xl">
                <h1 className="font-bold text-2xl mb-6">Reservation</h1>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col">
                    <label className="mb-2">Name</label>
                    <input
                      name="name"
                      className="p-3 rounded-md bg-neutral-800"
                      placeholder="Input Full Name"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2">Gender</label>
                    <input
                      name="gender"
                      className="p-3 rounded-md bg-neutral-800"
                      placeholder="Choose Gender"
                      type="text"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="mb-2">Phone</label>
                    <input
                      name="phone"
                      className="p-3 rounded-md bg-neutral-800"
                      placeholder="Input Phone Number"
                      type="phone"
                    />
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>RSVP Now</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Buy Your Ticket</DialogTitle>
                        <DialogDescription>
                          Please Type Amount of Money do you want to Donate.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4 mx-3">
                        <div className="flex">
                          <h1 className="text-start flex flex-grow">
                            Full Name
                          </h1>
                          <p className="text-neutral-400">Jody Yuantoro</p>
                        </div>
                        <div className="flex">
                          <h1 className="text-start flex flex-grow">Gender</h1>
                          <p className="text-neutral-400">Male</p>
                        </div>
                        <div className="flex">
                          <h1 className="text-start flex flex-grow">Phone</h1>
                          <p className="text-neutral-400">+6285155027511</p>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          onClick={() => handleRequestTicket()}
                          type="submit"
                        >
                          Save changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
            {transactionModal && (
              <PaymentModal open={transactionModal} data={transactionData} />
            )}
          </>
        ) : (
          <></>
        )}
      </section>
    </main>
  );
}
