import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { server } from "@/main";
import { DataTable } from "../ui/notiification/DataTable";
import { useLocation } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components(shadcn)/ui/select";
import { RotateCcw } from "lucide-react";

//in this component fetech all the request of AA  that are present in the database as notification data...
const AaNotificationBoxContent = () => {
  const [assessmentAgency, setAssessmentAgency] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sectors, setSectors] = useState([]);
  const [course, setCourse] = useState([]);
  const [filters, setFilters] = useState({
    sector: "",
    course: "",
    state: "",
  });

  //function for fetch all data  as query...
  useEffect(() => {
    fetchAccessmentAgency();
  }, [filters]);

  const fetchAccessmentAgency = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${server}/aa/all/query`, {
        params: filters,
        withCredentials: true,
      });
      setAssessmentAgency(response.data.data.reverse());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      sector: "",
      course: "",
      state: "",
    });
  };

  //function for retrive all data course and sector

  useEffect(() => {
    try {
      axios
        .get(`${server}/sector/all`, {
          withCredentials: true,
        })
        .then((response) => {
          setSectors(response.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      axios
        .get(`${server}/courses`, {
          withCredentials: true,
        })
        .then((response) => {
          setCourse(response.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // console.log(assessmentAgency);
  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of Assessment Agency's for you!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Select
              onValueChange={(value) => handleFilterChange("sector", value)}
            >
              <SelectTrigger className="w-fit border-0">
                <SelectValue placeholder="Filter by Sector" />
              </SelectTrigger>
              <SelectContent>
                {sectors.map((sector) => (
                  <SelectItem key={sector.id} value={sector.name}>
                    {sector.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) => handleFilterChange("course", value)}
            >
              <SelectTrigger className="w-fit border-0">
                <SelectValue placeholder="Filter by Course" />
              </SelectTrigger>
              <SelectContent>
                {course.map((courses) => (
                  <SelectItem key={courses.id} value={courses.courseName}>
                    {courses.courseName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={(value) => handleFilterChange("state", value)}
            >
              <SelectTrigger className="w-fit border-0">
                <SelectValue placeholder="Filter by State" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>States</SelectLabel>
                  <SelectItem value="Odisha">Odisha</SelectItem>
                  <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
                  <SelectItem value="West Bengal">West Bengal</SelectItem>
                  <SelectItem value="Chhattisgarh">Chhattisgarh</SelectItem>
                  <SelectItem value="Jharkhand">Jharkhand</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <RotateCcw onClick={resetFilters} className="w-4" />
          </div>
        </div>
        {/* Data table for the notification */}
        <DataTable
         filter1={"agencyName"}
          path={path}
          columns={columns}
          data={assessmentAgency}
          isLoding={loading}
        />
      </div>
    </>
  );
};

export default AaNotificationBoxContent;

const columns = [
  {
    accessorKey: "agencyName",
    header: "Agency Name ",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "state_Under_geographicalRegion",
    header: "State",
  },
  {
    accessorKey: "sectors",
    header: "Sector's",
  },
  {
    accessorKey: "total_no_of_certified_Assessor",
    header: "No fo assessor",
  },

  {
    accessorKey: "applicationStatus",
    header: "applicationStatus",
    cell: ({ row }) => {
      return (
        <div
          className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
            "bg-red-100 text-red-500":
              row.getValue("applicationStatus") === "Rejected",
            "bg-orange-100 text-orange-500":
              row.getValue("applicationStatus") === "Pending",
            "bg-green-100 text-green-400":
              row.getValue("applicationStatus") === "Approved",
          })}
        >
          {row.getValue("applicationStatus")}
        </div>
      );
    },
  }, 
];
