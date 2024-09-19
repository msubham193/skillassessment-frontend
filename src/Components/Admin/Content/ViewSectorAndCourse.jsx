import { Button } from "@/components(shadcn)/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components(shadcn)/ui/table";
import { server } from "@/main";
import axios from "axios";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const ViewSectorAndCourse = () => {
  const [sectors, setSectors] = useState([]);
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState("");

  // Fetch all sectors
  useEffect(() => {
    try {
      setLoading(true);
      axios
        .get(`${server}/sector/all`, {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        })
        .then((response) => {
          setSectors(response.data.data.reverse());
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch courses by sector name
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
  
        const response = await axios.get(`${server}/sector`, {
          params: { name: filters },
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        });
  
        setCourse(response.data.data.reverse());
     
      // console.log(response.data.data.reverse());
  
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [filters, server]); // Dependency array includes filters and server
  

  const toggleScheme = (schemeName) => {
    setFilters(filters === schemeName ? "" : schemeName); 
  };
  
  if(loading)
  {
    return(
        <div className="text-3xl font-semibold flex">Lading...</div>
    )
  }
  if(sectors.length==0)
  {
    return(
      <div className="text-3xl font-semibold flex justify-center mt-44 text-purple-800">Oops no sector and course available yet !!</div>
  )
  }

  return (
    <div className="container mx-auto p-4">
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">SL NO</TableHead>
            <TableHead>Sector Name</TableHead>
            <TableHead>Sector Description</TableHead>
            <TableHead>No Of Courses</TableHead>
            <TableHead className="w-[100px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sectors?.map((scheme, index) => (
            <React.Fragment key={scheme.id}>
              <TableRow>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{scheme?.name}</TableCell>
                <TableCell>{scheme?.description}</TableCell>
                <TableCell>{scheme?.courses.length}</TableCell>
                <TableCell>
                  <Button
                    className="bg-purple-400"
                    size="sm"
                    onClick={() => toggleScheme(scheme.name)}
                  >
                    {filters === scheme.name ? (
                      <ChevronUpIcon className="h-4 w-4" />
                    ) : (
                      <ChevronDownIcon className="h-4 w-4" />
                    )}
                  </Button>
                </TableCell>
              </TableRow>
              {filters === scheme?.name && (
                <TableRow>
                  <TableCell colSpan={5} className="p-0">
                    <Table className="bg-purple-100">
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[100px]">Course Code</TableHead>
                          <TableHead>Course Name</TableHead>
                          <TableHead>Course Duration</TableHead>
                          <TableHead className="w-[100px]">Credits</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody >
                        {course.map((course) => (
                          <TableRow key={course?._id}>
                            <TableCell>{course?.courseCode}</TableCell>
                            <TableCell>{course?.courseName}</TableCell>
                            <TableCell>{course?.duration}</TableCell>
                            <TableCell>{course?.totalCredit}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ViewSectorAndCourse;
