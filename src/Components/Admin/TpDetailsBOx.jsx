import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components(shadcn)/ui/table";
import { Button } from "@/components(shadcn)/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components(shadcn)/ui/tooltip";
// import { useRecoilValue } from "recoil";
// import { trainingPartnerByID } from "@/Pages/Admin/Atoms/TpSelector";
import axios from "axios";
import { server } from "@/main";
import Loder from "./ui/Loder";
import { useRecoilValue } from "recoil";
import { authenticationState } from "@/Pages/Admin/Atoms/atoms";
import { toast } from "react-toastify";

const TpDetailsBOx = ({ id }) => {
  const[referesh,setReferesh]=useState(false)
  const[data,setData]=useState({})
  const[loding,setLoding]=useState(false)
//function for  fetch data by id
useEffect(() => {
  try {
    setLoding(true)
     axios.get(`${server}/tp/${id}`, {
      withCredentials: true,
    }).then((response)=>
    {
      setLoding(false)
      setData(response.data.data);
      setReferesh(prev=>!prev);
    })
    
  } catch (error) {
    setLoding(false)
    console.error('Error fetching training partner:', error);
    throw error;
  }
}, [])

//function for approve the application
const authState=useRecoilValue(authenticationState);
const applicationApproved=async()=>
  {
    setLoding(true);
      const token=authState.token;
      if(!token){
        console.log("Admin not  found");
        return;
      }
      try {
        const responce=await axios.put(`${server}/tp/approve/${id}`,
          {},
          {
            headers: {
              'x-access-token': token,
              'Content-Type': 'application/json',
            },
          }
        );
        setLoding(false)
        toast.success(responce.data.message, {
          position: "bottom-right",
          closeOnClick: true,
          draggable: true,
          theme: "colored",
        });
        setData(responce.data.data);
      } catch (error) {
        setLoding(false)
        toast.success("Somthing went wrong", {
          position: "bottom-right",
          closeOnClick: true,
          draggable: true,
          theme: "colored",
        });
      }
  }

  //function for reject the application
  const applicationReject=async()=>
    {
      setLoding(true);
        const token=authState.token;
        if(!token){
          console.log("Admin not  found");
          return;
        }
        try {
          const responce=await axios.put(`${server}/tp/reject/${id}`,
            {},
            {
              headers: {
                'x-access-token': token,
                'Content-Type': 'application/json',
              },
            }
          );
          setLoding(false)
          toast.success(responce.data.message, {
            position: "bottom-right",
            closeOnClick: true,
            draggable: true,
            theme: "colored",
          });
          setData(responce.data.data);
        } catch (error) {
          setLoding(false)
          toast.success("Somthing went wrong", {
            position: "bottom-right",
            closeOnClick: true,
            draggable: true,
            theme: "colored",
          });
        }
    }


  const defaultUserPhoto = '/user.png';
  if(loding){
    return (
     <Loder/>
    )
  }
  return (
    <TooltipProvider>
    <div className="m-4 md:m-10">
      <div className="flex flex-col md:flex-row justify-between mx-4 md:mx-10">
        <div className="w-full md:w-3/4">
          <Table>
            <TableBody>
              <TableRow className="text-lg border-none h-[5px]">
                <TableCell className="font-medium">OrganizationName*</TableCell>
                <TableCell className="pl-4 md:pl-24 text-lg">{data&& data.organizationName}</TableCell>
              </TableRow>
              <TableRow className="text-lg border-none">
                <TableCell className="font-medium">OrganizationCategory*</TableCell>
                <TableCell className="pl-4 md:pl-24 text-lg">{data&&data.organizationCategory}</TableCell>
              </TableRow>
              <TableRow className="text-lg border-none">
                <TableCell className="font-medium">CenterId*</TableCell>
                <TableCell className="pl-4 md:pl-24 text-lg">{data&& data.centerId}</TableCell>
              </TableRow>
              <TableRow className="text-lg border-none">
                <TableCell className="font-medium">TpCode *</TableCell>
                <TableCell className="pl-4 md:pl-24 text-lg">{data&&data.tpCode}</TableCell>
              </TableRow>
              <TableRow className="text-lg border-none">
                <TableCell className="font-medium">Scheme*</TableCell>
                <TableCell className="pl-4 md:pl-24 text-lg">{data&&data.scheme}</TableCell>
              </TableRow>
              <TableRow className="text-lg border-none">
                <TableCell className="font-medium">Affiliation *</TableCell>
                <TableCell className="pl-4 md:pl-24 text-lg">{data&&data.affiliation}</TableCell>
              </TableRow>
              <TableRow className="text-lg border-none">
                <TableCell className="font-medium">Website *</TableCell>
                <TableCell className="pl-4 md:pl-24 text-lg">{data&&data.website}</TableCell>
              </TableRow>
              <TableRow className="text-lg border-none">
                <TableCell className="font-medium">Pan No *</TableCell>
                <TableCell className="pl-4 md:pl-24 text-lg">{data&&data.pan}</TableCell>
              </TableRow>
              <TableRow className="text-lg border-none">
                <TableCell className="font-medium">PRN No *</TableCell>
                <TableCell className="pl-4 md:pl-24 text-lg">{data&&data.prnNo}</TableCell>
              </TableRow>
            {/*  <TableRow className="text-lg border-none">
                <TableCell className="font-medium">dateOfIncorporation *</TableCell>
                <TableCell className="pl-4 md:pl-24 text-lg">{data.dateOfIncorporation&&data.dateOfIncorporation}</TableCell>
              </TableRow>*/}
            </TableBody>
          </Table>
          {/* table for registered office Address */}
          <div className="w-full mt-5">
          <p className='text-xl  font-semibold underline'>Registered Office Details</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Address*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.registeredOfficeAddress}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Dist*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.registeredOfficeDist}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">City*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.registeredOfficeCity}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">State*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.registeredOfficeState}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Pin*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.registeredOfficePin}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Telephone no*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.registeredOfficeTelephone}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Mobile no*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.registeredOfficeMobile}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Fax no*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.registeredOfficeFax}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Email *</h3>
                <p className="text-lg border-b-[1px]">{data&&data.registeredOfficeEmail}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Gst no*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.registeredOfficeGst}</p>
              </div>
            </div>
          </div>
          {/* table for  Regional state */}
          <div className="w-full mt-5">
          <p className='text-xl font-semibold underline'>Details of Regional State Office</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Address*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.regionalStateOfficeAddress}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Dist*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.regionalStateOfficeDist}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">City*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.regionalStateOfficeCity}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">State*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.regionalStateOfficeState}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Pin*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.regionalStateOfficePin}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Telephone no*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.regionalStateOfficeTelephone}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Mobile no*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.regionalStateOfficeMobile}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Fax no*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.regionalStateOfficeFax}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Email *</h3>
                <p className="text-lg border-b-[1px]">{data&&data.regionalStateOfficeEmail}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Gst no*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.regionalStateOfficeGst}</p>
              </div>
            </div>
          </div>
          {/* About head woner  */}
          <div className="w-full mt-5">
          <p className='text-xl  font-semibold underline'> Details of  HeadOwner</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Name*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.headOwnerName}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Date of berth*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.headOwnerDob}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">City*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.headOwnerCity}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">ResAddress*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.headOwnerResAddress}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">PermanentAddress*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.headOwnerPermanentAddress}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Mobile no*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.headOwnerMobile}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Alternative Mobile no*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.headOwnerAltMobile}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Qualification*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.headOwnerQualification}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Email *</h3>
                <p className="text-lg border-b-[1px]">{data&&data.headOwnerEmail}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Experience*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.headOwnerWorkExperience}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Pan No*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.headOwnerPanNo}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Aadhar No*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.headOwnerAadharNo}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Promoter1*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.headOwnerPromoter1}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Promoter2*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.headOwnerPromoter2}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Promoter3*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.headOwnerPromoter3}</p>
              </div>
            </div>
          </div>
          {/* about project contact */}
          <div className="w-full mt-5">
          <p className='text-xl font-semibold underline'>Details of Project Contact Person</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">PersonName*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.projectContactPersonName}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">PersonDesignation*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.projectContactPersonDesignation}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">City*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.projectContactPersonCity}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Mobile No*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.projectContactPersonMobile}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Alt Mobile No*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.projectContactPersonAltMobile}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Res Address*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.projectContactPersonResAddress}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Permanent Address*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.projectContactPersonPermanentAddress}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Email *</h3>
                <p className="text-lg border-b-[1px]">{data&&data.projectContactPersonEmail}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Alt Email*</h3>
                <p className="text-lg border-b-[1px]">{data&&data.projectContactPersonAltEmail}</p>
              </div>
            </div>
          </div>
          {/* about payment */}

          <div className="w-full mt-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Payment Status*</h3>
                <p className="text-lg ">{data&&data.paymentStatus==="Pending"?(<p className="text-red-600">{data.paymentStatus}</p>):(<p className="text-green-500">{data.paymentStatus}</p>)}</p>
              </div>
              <div className="p-3">
                <h3 className="text-lg font-medium mb-2">Status*</h3>
                <p className="text-lg ">{data&&data.status}</p>
              </div>
              
              
              
            </div>
          </div>
          
        </div>
        <div className="border-[1px] border-black w-48 mx-auto md:w-40 md:mx-0 h-48 overflow-hidden mt-4 md:mt-0">
          <img
            src={data.PHOTO || defaultUserPhoto}
            alt="user"
            onError={(e) => (e.target.src = defaultUserPhoto)}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between mt-6 mx-4 md:mx-10 w-full md:w-[625px]">
        <Button onClick={applicationReject} className="bg-red-600 hover:bg-red-400  w-full md:w-auto mb-4 md:mb-0 "> {loding?"Loding...":(data.applicationStatus==="Rejected"?"Rejected":"Reject")}</Button>
        <Button onClick={applicationApproved} className=" bg-green-600 hover:bg-green-400 w-full md:w-auto">{loding?"Loding...":(data.applicationStatus==="Approved"?"Approved":"Approve")}</Button>
      </div>
    </div>
  </TooltipProvider>
  );
};

export default TpDetailsBOx;
