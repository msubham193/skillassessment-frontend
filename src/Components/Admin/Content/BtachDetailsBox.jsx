import { server } from "@/main";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loder from "../ui/Loder";
import { Button } from "@/components(shadcn)/ui/button";
import CreateExam from "./CreateExam";
import { useRecoilValue } from "recoil";
import { examState } from "@/Pages/Admin/Atoms/atoms";

const BtachDetailsBox = ({ id }) => {
  const [data, setData] = useState({});
  const [loding, setLoding] = useState(false);
  const examCreate=useRecoilValue(examState);
  // console.log(examCreate.isCreated)
  // console.log(examCreate.isCreated?true:false);
  //function for  fetch battch data by id.
  useEffect(() => {
    try { 
      setLoding(true);
      axios
        .get(`${server}/batch/${id}`, {
          withCredentials: true,
        })
        .then((response) => {
          setLoding(false);
          setData(response.data.data);
        });
    } catch (error) {
      setLoding(false);
      console.error("Error fetching training partner:", error);
      throw error;
    }
  }, []);
  // console.log(data)
  if (loding) {
    return <Loder />;
  }
  return (
    <div>
      <div className="w-full mt-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div className="p-3">
            <h3 className="text-lg font-medium mb-2">Batch ID*</h3>
            <p className="text-lg ">{data?._id}</p>
          </div>
          <div className="p-3">
            <h3 className="text-lg font-medium mb-2">Batch ABN ID*</h3>
            <p className="text-lg ">{data?.ABN_Number}</p>
          </div>
          <div className="p-3">
            <h3 className="text-lg font-medium mb-2">Created By*</h3>
            <p className="text-lg ">{data?.trainingOrganization}</p>
          </div>
          <div className="p-3">
            <h3 className="text-lg font-medium mb-2">No of Student*</h3>
            <p className="text-lg text-blue-700 ">{data?.students?.length}</p>
          </div>
          <div className="p-3">
            <h3 className="text-lg font-medium mb-2">No of Traners*</h3>
            <p className="text-lg text-blue-700">{data?.trainers?.length}</p>
          </div>
          <div className="p-3">
            <h3 className="text-lg font-medium mb-2">Date of Examination*</h3>
            <p className="text-lg ">{data?.examDate}</p>
          </div>
          <div className="p-3">
            <h3 className="text-lg font-medium mb-2">End Date of Batch*</h3>
            <p className="text-lg ">{data?.endDate}</p>
          </div>
          <div className="p-3">
            <h3 className="text-lg font-medium mb-2">Batch Under Course*</h3>
            <p className="text-lg ">{data?.courseName}</p>
          </div>
          <div className="p-3">
            <h3 className="text-lg font-medium mb-2">Batch Under Scheme*</h3>
            <p className="text-lg ">{data?.scheme}</p>
          </div>
          <div className="p-3">
            <h3 className="text-lg font-medium mb-2">Batch Under Sector*</h3>
            <p className="text-lg ">{data?.sectorName}</p>
          </div>
          <div className="p-3">
            <h3 className="text-lg font-medium mb-2">Batch Under State*</h3>
            <p className="text-lg ">{data?.state}</p>
          </div>
          <div className="p-3">
            <h3 className="text-lg font-medium mb-2">Status*</h3>
            <p className="text-xl font-bold ">{data?.status}</p>
          </div>
        </div>
        {/* Buttion For assin a batch */}
       <CreateExam abn_id={data?._id}  tp_id={data?.trainingOrganizationId} course={data?.courseName} sector={data?.sectorName} state={data?.state}>
              <Button disabled={examCreate.isCreated} variant={"default"} className={"bg-green-700"}>
              {
              examCreate.isCreated?("Batch Assigned"):("Assign to Agency")
              }
              </Button>
            </CreateExam>
      </div>
    </div>
  );
};

export default BtachDetailsBox;
