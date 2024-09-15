import { Button } from "@/components(shadcn)/ui/button";
import { Input } from "@/components(shadcn)/ui/input";
import { Label } from "@/components(shadcn)/ui/label";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Calendar } from "@/components(shadcn)/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components(shadcn)/ui/popover";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components(shadcn)/ui/dialog";
import axios from "axios";
import { server } from "@/main";
import { toast } from "react-toastify";

const MakePayment = ({ children, invoice_id, amountToPaid }) => {
  const [transactionId, setTransactionId] = useState(null);
  const [invoiceId, setInvoiceId] = useState(null);
  const [amount, setAmount] = useState(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    setInvoiceId(invoice_id);
    setAmount(amountToPaid);
  }, [invoice_id,amountToPaid]);

  //function for make payment
  const submitHandler = async (e) => {
    e.preventDefault();
    setShowButton(true);
    try {
      const response = await axios.put(
        `${server}/invoice/payment/${invoiceId}`,
        { transactionId, amount },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setTransactionId("");
      setAmount("");
      toast.success("Payment Update !!", {
        position: "top-center",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      setShowButton(false);
    } catch (error) {
      toast.error("Something went wrong, try after some time !!!", {
        position: "top-center",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      setShowButton(false);
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className=" bg-gray-100 w-[621px]">
          <DialogHeader>
            <DialogTitle>Add Payment Details</DialogTitle>
            <DialogDescription>Add all the field .</DialogDescription>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Invoice ID
                </Label>
                <Input id="batch" className="col-span-4" value={invoiceId} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left w-56">
                  Enter Transaction ID
                </Label>
                <Input
                  id="batch"
                  className="col-span-4"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-left w-36">
                    Amount Paid
                  </Label>
                  <Input
                    id="name"
                    value={amount}
                    className="col-span-4"
                    placeholder="enter the amount"
                  />
                </div>
              </div>
              {/* for manual input */}
            </div>
          </form>
          <DialogFooter>
            <Button onClick={submitHandler} disabled={showButton} type="submit">
              {showButton ? "Loading...." : "Make payment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MakePayment;
