import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components(shadcn)/ui/table";
import { Input } from "@/components(shadcn)/ui/input";
import { Skeleton } from "@/components(shadcn)/ui/skeleton";
import { useRecoilState } from "recoil";
import { centerAtom } from "../Atoms/centerAtom";
import { Button } from "@/components(shadcn)/ui/button";
import UpdateCenterForm from "./UpdateCenterForm";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { server } from "@/main";

const UpdateCenterContent = () => { 
  const tpid = localStorage.getItem("trainingPartnerId");
  const [loading, setLoading] = useState(true);
  const [centersData, setCentersData] = useRecoilState(centerAtom);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCentersData = async () => {
      try {
        const response = await fetch(`${server}/center/tp/${tpid}`, { method: "GET" });
        const data = await response.json();
        if (data && data.data) {
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

  const handleUpdateClick = (center) => {
    setSelectedCenter(center);
  };

  const handleUpdateComplete = (updatedCenter) => {
    setCentersData(prevData =>
      prevData.map(c => c._id === updatedCenter._id ? updatedCenter : c)
    );
    setSelectedCenter(null);
  };

  const filteredCenters = centersData.filter(center =>
    center.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.PRN_NO.toLowerCase().includes(searchTerm.toLowerCase()) ||
    center.centerId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6 text-indigo-700">Update Centers</h1>
      <div className="mb-4 relative">
        <Input
          type="text"
          placeholder="Search centers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
      {loading ? (
        <Skeleton className="w-full h-12 mb-4" count={6} />
      ) : (
        <>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-indigo-100">
                  <TableHead className="font-semibold text-indigo-800">Index</TableHead>
                  <TableHead className="font-semibold text-indigo-800">PRN NO</TableHead>
                  <TableHead className="font-semibold text-indigo-800">Name</TableHead>
                  <TableHead className="font-semibold text-indigo-800">Center Id</TableHead>
                  <TableHead className="font-semibold text-indigo-800">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCenters.length > 0 ? (
                  filteredCenters.map((center,index) => (
                    <TableRow key={center._id} className="hover:bg-indigo-50 transition-colors duration-200">
                      <TableCell>{index+1}</TableCell>
                      <TableCell>{center.PRN_NO}</TableCell>
                      <TableCell>{center.name}</TableCell>
                      <TableCell>{center.centerId}</TableCell>
                      <TableCell>
                        <Button 
                          onClick={() => handleUpdateClick(center)}
                          className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                          Update Center
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center text-gray-500">
                      No centers found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <AnimatePresence>
            {selectedCenter && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <UpdateCenterForm
                  center={selectedCenter}
                  onClose={() => setSelectedCenter(null)}
                  onUpdate={handleUpdateComplete}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default UpdateCenterContent;
