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
import ShowAccessmentAgency from "./ShowAccessmentAgency";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components(shadcn)/ui/select";
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
import { useRecoilValue } from "recoil";
import { authenticationState } from "@/Pages/Admin/Atoms/atoms";
import { toast } from "react-toastify";

const CreateExam = ({ children, abn_id, course, tp_id, sector, state }) => { 
  const [courseName, setCourseName] = useState("");
  const [trainingPartnerId, setTrainingPartnerId] = useState("");
  const [batchId, setBatchId] = useState("");
  const [assesmentAgencyId, setAssesmentAgencyId] = useState("");
  const [showButton, setShowButton] = useState(false);
  const authState = useRecoilValue(authenticationState);

  useEffect(() => { 
    setBatchId(abn_id);
    setCourseName(course);
    setTrainingPartnerId(tp_id);
  }, [abn_id, course, tp_id]);

  
  //function for create batch........

  const createExam = async (e) => {
    e.preventDefault();
    setShowButton(true);
    const token = authState.token;
    if (!token) {
      console.log("Admin not found");
      return;
    }
    try {
      const response = await axios.post( 
        `${server}/exam/create`,
        { courseName, batchId, assesmentAgencyId, trainingPartnerId },
        {
          headers: {
            "x-access-token": token,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setAssesmentAgencyId("");
      toast.success(response.data.message, {
        position: "top-center",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      setShowButton(false);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error, {
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
            <DialogTitle>Assign agency</DialogTitle>
            <DialogDescription>
              Assign this course to a accessment agency.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={createExam}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left">
                  BATCH ID
                </Label>
                <Input id="batch" className="col-span-4" value={batchId} />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-left w-56">
                  TRANING PARTNER ID
                </Label>
                <Input
                  id="tp_id"
                  className="col-span-4"
                  value={trainingPartnerId}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-left w-40">
                    COURCE NAME
                  </Label>
                  <Input id="curse" className="col-span-4" value={courseName} />
                </div>
              </div>
              {/* for manual input */}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Assessment Agency ID</Label>
                <div className="flex">
                  <Input
                    type="text"
                    id="batch"
                    onChange={(e) => setAssesmentAgencyId(e.target.value)}
                    placeholder="Enter the id of assessment agency or select"
                    value={assesmentAgencyId}
                  />
                  <Select>
                    <SelectTrigger className="w-[75px]">
                      <SelectValue placeholder="Show" />
                    </SelectTrigger>
                    <SelectContent className="bg-black">
                      <ShowAccessmentAgency
                        setAssesmentAgency={setAssesmentAgencyId}
                        course={courseName}
                        sector={sector}
                        state={state}
                      />
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </form>
          <DialogFooter>
            <Button disabled={showButton} onClick={createExam} type="submit">
              {showButton ? "Loading...." : "Assign Batch"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateExam;
