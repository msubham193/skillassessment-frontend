import { Button } from "@/components(shadcn)/ui/button";
import { Input } from "@/components(shadcn)/ui/input";
import { Label } from "@/components(shadcn)/ui/label";
import React, { useEffect, useState } from "react";
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

const CreateExam = ({ children, abn_id, course, tp_id, sector, state,setRefresh }) => {
  const [courseName, setCourseName] = useState(""); 
  const [trainingPartnerId, setTrainingPartnerId] = useState("");
  const [batchId, setBatchId] = useState("");
  const [assesmentAgencyId, setAssesmentAgencyId] = useState("");
  const [assesmentAgencyName, setAssesmentAgencyName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const authState = useRecoilValue(authenticationState);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  useEffect(() => {
    setBatchId(abn_id);
    setCourseName(course);
    setTrainingPartnerId(tp_id);
  }, [abn_id, course, tp_id]);

  // Function to create Exam for this batch
  const createExam = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // console.log(authState.token)

    if (!authState.token) {
      toast.error("Admin not authenticated!", {
        position: "top-center",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${server}/exam/create`,
        { courseName, batchId, assesmentAgencyId, trainingPartnerId },
        {
          headers: {
            "x-access-token": authState.token,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // Reset form values
      setAssesmentAgencyId("");
      setAssesmentAgencyName("");
      toast.success(response.data.message, {
        position: "top-center",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      setIsDialogOpen(false);
      setRefresh(true);
    } catch (error) {
      toast.error("Error: Unable to assign exam. Please check your inputs or try again later.", {
        position: "top-center",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
    
    } finally {
      setIsLoading(false);
    }
  };

//function for auto close the show assessment agency modal
  const handleOpenChange = (open) => {
    setIsSelectOpen(open);
  };
  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="bg-gray-100 max-w-lg mx-auto">
          <DialogHeader>
            <DialogTitle>Assign Assessment Agency</DialogTitle>
            <DialogDescription>
              Assign this course to an assessment agency.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={createExam}>
            <div className="grid gap-4 py-4">
              {/* Batch ID */}
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="batch" className="text-left">Batch ID</Label>
                <Input id="batch" className="col-span-1" value={batchId} readOnly />
              </div>

              {/* Training Partner ID */}
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="tp_id" className="text-left">Training Partner ID</Label>
                <Input id="tp_id" className="col-span-1" value={trainingPartnerId} readOnly />
              </div>

              {/* Course Name */}
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="course" className="text-left">Course Name</Label>
                <Input id="course" className="col-span-1" value={courseName} readOnly />
              </div>

              {/* Assessment Agency */}
              <div className="grid grid-cols-1 gap-2">
                <Label htmlFor="assesmentAgency" className="text-left">Assessment Agency</Label>
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    id="assesmentAgency"
                    value={assesmentAgencyName}
                    onChange={(e) => setAssesmentAgencyName(e.target.value)}
                    placeholder="Select an assessment agency"
                    required
                  /> 
                  <Select open={isSelectOpen} onOpenChange={handleOpenChange}>
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Show" />
                    </SelectTrigger>
                    <SelectContent>
                    <ShowAccessmentAgency
                    setAssesmentAgency={setAssesmentAgencyId}
                    setassessmentagencyName={setAssesmentAgencyName}
                    course={courseName}
                    sector={sector}
                    state={state}
                    closeModal={() => setIsSelectOpen(false)}
                  />
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? "Assigning..." : "Assign Exam"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateExam;
