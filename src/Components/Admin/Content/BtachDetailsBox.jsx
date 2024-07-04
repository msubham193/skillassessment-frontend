import { server } from "@/main";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loder from "../ui/Loder";
import { Button } from "@/components(shadcn)/ui/button";
import CreateExam from "./CreateExam";

const BtachDetailsBox = ({ id }) => {
  const [data, setData] = useState({});
  const [loding, setLoding] = useState(false);
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
            <h3 className="text-lg font-medium mb-2">Batch Name*</h3>
            <p className="text-lg ">{data?.name}</p>
          </div>
          <div className="p-3">
            <h3 className="text-lg font-medium mb-2">Created By*</h3>
            <p className="text-lg ">{data?.createdBy?.organizationName}</p>
          </div>
          <div className="p-3">
            <h3 className="text-lg font-medium mb-2">No of Student*</h3>
            <p className="text-lg ">{data?.students?.length}</p>
          </div>
          <div className="p-3">
            <h3 className="text-lg font-medium mb-2">No of Traners*</h3>
            <p className="text-lg ">{data?.trainers?.length}</p>
          </div>
          <div className="p-3">
            <h3 className="text-lg font-medium mb-2">Date of Examination*</h3>
            <p className="text-lg ">{data?.examDate}</p>
          </div>
          <div className="p-3">
            <h3 className="text-lg font-medium mb-2">Status*</h3>
            <p className="text-xl font-bold ">{data?.status}</p>
          </div>
        </div>
        {/* Buttion For assin a batch */}
       <CreateExam abn_id={data?._id} course={"demoCourse"}>
              <Button variant={"default"} className={"bg-green-700"}>
                {"Assign agency"}
              </Button>
            </CreateExam>
      </div>
    </div>
  );
};

export default BtachDetailsBox;
