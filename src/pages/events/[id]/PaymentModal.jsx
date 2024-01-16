import { Dialog, DialogContent } from "@/components/ui/dialog";
import React from "react";

function PaymentModal({ data, open }) {
  return (
    <Dialog open={open}>
      <DialogContent>
        <iframe src={data} width="100%" height="100%" />
      </DialogContent>
    </Dialog>
  );
}

export default PaymentModal;
