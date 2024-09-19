import { Button } from "@/components(shadcn)/ui/button";
import { Input } from "@/components(shadcn)/ui/input";
import { Label } from "@/components(shadcn)/ui/label";
import SideNav from "@/Components/Admin/Content/SideNav";
import TopBar from "@/Components/Admin/Content/TopBar";
import { server } from "@/main";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AddfeeInCorporetbatch = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(null);

  // Function for fetching batch by id
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${server}/batch/${id}`, {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            'Pragma': "no-cache",
            'Expires': "0",
          },
        });
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching batch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  //function for add payment
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `${server}/batch/addpayment/${id}`,
        { amount },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setAmount("");

      toast.success("Cost added !!", {
        position: "top-center",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, try after some time !!!", {
        position: "top-center",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Top Bar */}
      <TopBar />
      {/* Side bar */}
      <div className="min-h-screen bg-white text-black flex">
        <SideNav />

        {/* Main page */}
        <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
          <div className="flex items-center justify-between space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Student fee!
              </h2>
              <p className="text-muted-foreground">
                Here's where you can add Cost per Student !!!
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {/* Add the functionality like search and filter */}
              {/* For now there is nothing to add in future if there is some data then we will put there */}
            </div>
          </div>
          {/* Details of Training Partner */}
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
                <p className="text-lg text-blue-700 ">
                  {data?.students?.length}
                </p>
              </div>

              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">
                  Batch Under Scheme*
                </h3>
                <p className="text-lg font-semibold ">{data?.scheme}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">
                  Client-side Payment*
                </h3>
                <p className="text-lg font-semibold text-green-600 ">
                  {data?.clientPaymentStatus ? "Paid" : "Not Fixed"}
                </p>
              </div>
              {/* create a form for add mony*/}
              <div className="p-3">
                <form onSubmit={submitHandler}>
                  <Label htmlFor="name" className="text-left w-40 text-lg">
                    Add cost per Student for this scheme..
                  </Label>
                  <Input
                    id="scheme-name"
                    className="col-span-4 py-6 mt-2"
                    placeholder="Add amount in rupee"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </form>
              </div>
            </div>
            <div>
              <Button
                className="bg-green-600 hover:bg-green-400 w-full md:w-auto ml-3"
                onClick={submitHandler}
              >
                {loading
                  ? "Loading..."
                  : data?.paymentStatus === true
                  ? "Added"
                  : "Add amount"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddfeeInCorporetbatch;
