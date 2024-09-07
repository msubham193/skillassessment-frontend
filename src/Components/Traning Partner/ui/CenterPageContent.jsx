

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components(shadcn)/ui/table";
import { Skeleton } from "@/components(shadcn)/ui/skeleton"; // Adjust the import path if necessary
import { useRecoilState, useRecoilValue } from "recoil";
import { centerAtom } from "../Atoms/centerAtom";
import { server } from "@/main";

const CenterPageContent = () => {
    const tpid=localStorage.getItem("trainingPartnerId")
    const [loading, setLoading] = useState(true);
    const [centersData,setCentersData]=useRecoilState(centerAtom)
    useEffect(() => {
     
      const fetchCentersData = async () => {
        try {
          const response = await fetch(`${server}/center/tp/${tpid}`, { method: "GET" });
          const data = await response.json();
         
          if (data) {
            setCentersData(data.data);
            setLoading(false);
          } else {
            throw new Error("No centers data found");
          }
        } catch (error) {
          console.error("Error fetching centers data:", error);
          setLoading(false);
        }
      };
  
      fetchCentersData();
    }, []);
    return (
      <div className="container mx-auto mt-10">
        {loading ? (
          <Skeleton className="w-full h-12 mb-4" count={6} />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold text-xl">PRN NO</TableHead>
                <TableHead className="font-semibold text-xl">Name</TableHead>
                <TableHead className="font-semibold text-xl">Center Id</TableHead>
               
                <TableHead className="font-semibold text-xl">Project Id</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg">
              {centersData && centersData.length > 0 ? (
               
                  centersData.map(center => (
                    <TableRow key={center.centerId} className="">
                      <TableCell className="text-black">{center.PRN_NO}</TableCell>
                      <TableCell className="text-black">{center.name}</TableCell>
                      <TableCell className="text-black">{center.centerId}</TableCell>
                      <TableCell className="text-black">{center.projectId}</TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center text-black">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    );
}

export default CenterPageContent
