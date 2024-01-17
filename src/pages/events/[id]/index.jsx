"use client";

import { useGetEventsByIdQuery } from "@/redux/api/eventsApi";
import Image from "next/image";
import { useRouter } from "next/router";
import parse from "html-react-parser";
import { Button } from "@/components/ui/button";
import { useAddTicketsMutation } from "@/redux/api/ticketsApi";
import { toast } from "sonner";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetMeQuery } from "@/redux/api/meApi";
import useIsLogged from "@/utils/useIsLogged.hook";
import Auth from "@/components/Auth";

export default function Home() {
  const router = useRouter();
  const { data } = useGetMeQuery();
  const isLogged = useIsLogged();

  const { id } = router.query;

  const formSchema = z.object({
    name: z.string(),
    gender: z.string(),
    phone: z.string(),
    charity: z.string(),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      gender: "",
      phone: "",
      charity: "",
    },
  });

  function onSubmit(values) {
    requestTicket({
      data: {
        event_id: id,
        holder_name: values.name,
        holder_gender: values.gender,
        holder_email: data?.data?.email,
        holder_phone: values.phone,
        purchase_amount: values.charity,
      },
    })
      .then(async (res) => {
        console.log(res);
        if (res?.error?.data?.message) {
          toast.error(
            `Error Status ${res?.error?.status}: ${res?.error?.data?.message}`
          );
        } else {
          const promise = () =>
            new Promise((resolve) =>
              setTimeout(() => resolve({ name: "Sonner" }), 2000)
            );

          toast.promise(promise, {
            loading: "Processing midtrans payment...",
            success: () => {
              window.open(res?.data?.redirect_url, "_self");
              return `${res?.data?.token} was processed`;
            },
            error: "Error",
          });
        }
      })
      .finally(() => {});
  }

  const {
    data: events,
    isLoading: eventsLoading,
    isFetching: eventsFetching,
  } = useGetEventsByIdQuery({ id });

  const [requestTicket] = useAddTicketsMutation();

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
              <div className="w-[60%] border-r pr-8">
                <h1 className="font-bold text-4xl mb-6">{events?.name}</h1>
                <p className="text-neutral-200">{parse(events?.description)}</p>
              </div>
              <div className="w-[40%] h-fit p-8">
                {isLogged ? (
                  <>
                    <h1 className="font-bold text-2xl mb-6">Reservation</h1>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                      >
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your full name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Gender</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Select your Gender"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your active phone number"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="charity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Charity</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter your charity value"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit">RSVP Now</Button>
                      </form>
                    </Form>
                  </>
                ) : (
                  <>
                    <h1 className="font-bold text-2xl mb-6">
                      Login first to RSVP this events
                    </h1>
                    <Auth />
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </section>
    </main>
  );
}
