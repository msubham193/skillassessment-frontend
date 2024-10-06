

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components(shadcn)/ui/table";
import { Skeleton } from "@/components(shadcn)/ui/skeleton";
import { Input } from "@/components(shadcn)/ui/input";
import { useRecoilState } from "recoil";
import { centerAtom } from "../Atoms/centerAtom";
import { server } from "@/main";
import { Search } from "lucide-react";

const CenterPageContent = () => {
  const tpid = localStorage.getItem("trainingPartnerId");
  const [loading, setLoading] = useState(true);
  const [centersData, setCentersData] = useRecoilState(centerAtom);
  const [searchTerm, setSearchTerm] = useState("");

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
  }, [tpid, setCentersData]);

  const filteredData = centersData.filter((center) =>
    Object.values(center).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="container mx-auto mt-10 p-4">
      <div className="mb-4 relative">
        <Search className="absolute left-2 top-3 h-4 w-4 text-gray-500" />
        <Input
          type="text"
          placeholder="Search centers..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <Skeleton className="w-full h-12 mb-4" count={6} />
      ) : (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="font-semibold text-lg">Index</TableHead>
                <TableHead className="font-semibold text-lg">PRN NO</TableHead>
                <TableHead className="font-semibold text-lg">Name</TableHead>
                <TableHead className="font-semibold text-lg">Center Id</TableHead>
                <TableHead className="font-semibold text-lg">Project Id</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length > 0 ? (
                filteredData.map((center, index) => (
                  <TableRow key={center.centerId} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{center.PRN_NO}</TableCell>
                    <TableCell>{center.name}</TableCell>
                    <TableCell>{center.centerId}</TableCell>
                    <TableCell>{center.projectId}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default CenterPageContent;