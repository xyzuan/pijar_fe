import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetTransactionsByIdQuery } from "@/redux/api/transactionsApi";
import { LucideCheckCircle, LucideHelpCircle } from "lucide-react";
import { useRouter } from "next/router";
import React from "react";

function index() {
  const router = useRouter();
  const { order_id } = router.query;
  const {
    data: trxData,
    isLoading: trxLoading,
    isFetching: trxFetching,
  } = useGetTransactionsByIdQuery({ id: order_id });

  return (
    <main className={`flex container max-w-screen-xl flex-col`}>
      <section className="min-h-[80vh] mt-12 flex md:flex-row flex-col justify-center items-center">
        <Card className="h-fit md:w-[30vw] w-full">
          <CardContent className="flex flex-col justify-center items-center p-8 gap-3">
            {trxData?.status !== "success" ? (
              <LucideHelpCircle className="w-[72px] h-[72px]" />
            ) : (
              <LucideCheckCircle className="w-[72px] h-[72px]" />
            )}
            <h1 className="mb-6 text-2xl font-bold">
              {trxData?.status === "pending"
                ? "Transaction Pending"
                : "Transaction Success"}
            </h1>
            <div className="flex justify-between w-full">
              <h1>Transaction ID:</h1>
              <p>{trxData?.id || "Fetching Data..."}</p>
            </div>
            <div className="flex justify-between w-full">
              <h1>Charity Ammount:</h1>
              <p>{trxData?.amount || "Fetching Data..."}</p>
            </div>
            <div className="flex justify-between w-full">
              <h1>Payment Channel:</h1>
              <p>{trxData?.payment_channel || "Fetching Data..."}</p>
            </div>
            <Button
              className="w-full mt-3"
              onClick={() => window.open(trxData?.payment_link, "_self")}
            >
              Payment Link
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

export default index;
