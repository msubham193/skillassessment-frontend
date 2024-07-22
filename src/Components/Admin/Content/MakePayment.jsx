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

const MakePayment = ({ children, assessmentagencyId, batchId }) => {
  console.log(batchId);
  console.log(assessmentagencyId);
  const [urt, setUtr] = useState(null);
  const [assessmentId, setAssessmentId] = useState("");
  const [amount, setAmount] = useState(null);
  const [batchid, setBatchid] = useState("");
  const [date, setDate] = useState(new Date());
  const [showButton, setShowButton] = useState(false);

  //function for select date
  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
  };
  useEffect(() => {
    setAssessmentId(assessmentagencyId);
    setBatchid(batchId);
  }, [assessmentagencyId, batchId]);

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className=" bg-gray-100 w-[621px]">
          <DialogHeader>
            <DialogTitle>Add Payment Details</DialogTitle>
            <DialogDescription>Add all the field .</DialogDescription>
          </DialogHeader>
          <form>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  assessment agency ID
                </Label>
                <Input id="batch" className="col-span-4" value={assessmentId} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  Batch ID
                </Label>
                <Input id="batch" className="col-span-4" value={batchId} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-left w-36">
                    UTR NO
                  </Label>
                  <Input
                    id="name"
                    value={urt}
                    className="col-span-4"
                    placeholder="Utr Name"
                    onChange={(e) => setUtr(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-left w-36">
                    Amount Pade
                  </Label>
                  <Input
                    id="name"
                    value={amount}
                    className="col-span-4"
                    placeholder="enter the amount"
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </div>
              </div>
              {/* for manual input */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Date of issue</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateSelect}
                      className="rounded-md border"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </form>
          <DialogFooter>
            <Button disabled={showButton} type="submit">
              {showButton ? "Loading...." : "Make payment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MakePayment;
