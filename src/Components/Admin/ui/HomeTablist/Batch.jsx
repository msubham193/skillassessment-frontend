import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { server } from "@/main";
import { DataTable } from "../notiification/DataTable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,  
  SelectValue,
} from "@/components(shadcn)/ui/select"; 
import { RotateCcw, X } from "lucide-react";

const Batch = () => { 
  const [batch, setBatch] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [sectors, setSectors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [trainingOrganizations, setTrainingOrganizations] = useState([]);
  const [filters, setFilters] = useState({
    state: "",
    sector: "",
    course: "",
    trainingOrganization: "",
  });
  const [selectedValues, setSelectedValues] = useState({
    state: "",
    sector: "",
    course: "",
    trainingOrganization: "",
  });

  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    if (!isDataFetched) {
      fetchBatches();
    }
  }, [filters]);

  const fetchBatches = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${server}/batch/all/query`, {
        params: filters,
        withCredentials: true,
        headers: {
            "Cache-Control": "no-cache",
            'Pragma': "no-cache",
            'Expires': "0",
          },
      });
      // console.log(response.data.data)
      const filteredBatches = response.data.data.filter(
        (batch) => batch?.approvedByGovernmentBody === true || batch?.schemeType === "Corporate"
      );
      // console.log(filteredBatches)
      setBatch(filteredBatches.reverse());
      setIsDataFetched(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setSelectedValues((prev) => ({ ...prev, [name]: value }));
    setIsDataFetched(false);
  };

  const resetFilters = () => {
    setFilters({
      state: "",
      sector: "",
      course: "",
      trainingOrganization: "",
    });
    setSelectedValues({
      state: "",
      sector: "",
      course: "",
      trainingOrganization: "",
    });
    setIsDataFetched(false);
  };

  useEffect(() => {
    axios
      .get(`${server}/sector/all`, { withCredentials: true ,headers: {
            "Cache-Control": "no-cache",
            'Pragma': "no-cache",
            'Expires': "0",
          },},)
      .then((response) => {
        setSectors(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${server}/course/course`, { withCredentials: true ,headers: {
            "Cache-Control": "no-cache",
            'Pragma': "no-cache",
            'Expires': "0",
          },})
      .then((response) => {
        setCourses(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${server}/tp`, { withCredentials: true,headers: {
            "Cache-Control": "no-cache",
            'Pragma': "no-cache",
            'Expires': "0",
          }, })
      .then((response) => {
        setTrainingOrganizations(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  return (
    <>
    <div className="h-full flex-1 flex-col space-y-8  md:flex  w-[1250px]"> 
    <div className="flex items-center justify-between space-y-2">
      <div>

      </div>

      <div className="flex items-center space-x-2"> 
        <Select
          value={selectedValues.sector}
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
          value={selectedValues.course}
          onValueChange={(value) => handleFilterChange("course", value)}
        >
          <SelectTrigger className="w-fit border-0">
            <SelectValue placeholder="Filter by Course" />
          </SelectTrigger>
          <SelectContent>
            {courses.map((course) => (
              <SelectItem key={course.id} value={course.courseName}>
                {course.courseName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedValues.trainingOrganization}
          onValueChange={(value) =>
            handleFilterChange("trainingOrganization", value)
          }
        >
          <SelectTrigger className="w-fit border-0">
            <SelectValue placeholder="Filter by Training Organization" />
          </SelectTrigger>
          <SelectContent>
            {trainingOrganizations.map((tp) => (
              <SelectItem key={tp.id} value={tp.organizationName}>
                {tp.organizationName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedValues.state}
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
        {hasActiveFilters && (
          <div className="flex">
            <span className="font-semibold">Reset</span>
            <X
              onClick={resetFilters}
              className="w-4 cursor-pointer hover:cursor-pointer"
            />
          </div>
        )}
      </div>
      </div>

      <DataTable
        filter1={"ABN_Number"}
        path={"/admin/dasbord"}
        columns={batchColumns}
        data={batch}
        isLoading={loading}
        pageUrl={"batch"}
      />
      </div>
    </>
  );
};

export default Batch;

export const batchColumns = [
{
    accessorKey: "SL_NO",
    header: "Sl No",
    cell: ({ row }) => { 
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "ABN_Number",
    header: "Abn no",
  },
  {
    accessorKey: "schemeType",
    header: "Scheme Name",
  },
  {
    accessorKey: "courseName",
    header: "Course ",
  },
  {
    accessorKey: "trainingOrganization",
    header: "TP Name",
  },
  {
    accessorKey: "students", 
    header: "No of Student",
    cell: ({ row }) => {
      return (
        <div className="font-medium w-fit px-4 py-2 rounded-lg">
          {row.original.students.length}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div
          className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
            "bg-orange-100 text-orange-500":
              row.getValue("status") === "onGoing",
            "bg-green-100 text-green-400":
              row.getValue("status") === "Completed",
          })}
        >
          {row.getValue("status")}
        </div>
      );
    },
  },
  {
    accessorKey: "isAssigned",
    header: "Assigned Status",
    cell: ({ row }) => {
      const paymentStatus = row.getValue("isAssigned");
      return (
        <div
          className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
            "bg-orange-100 text-orange-500": paymentStatus === false,
            "bg-green-100 text-green-400": paymentStatus === true,
          })}
        >
          {paymentStatus ? "Assigned" : "Not Assigned"}
        </div>
      );
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",
    cell: ({ row }) => {
      const paymentStatus = row.getValue("paymentStatus");
      return (
        <div
          className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
            "bg-orange-100 text-orange-500": paymentStatus === false,
            "bg-green-100 text-green-400": paymentStatus === true,
          })}
        >
          {paymentStatus ? "Paid" : "Not Paid"}
        </div>
      );
    },
  },
];
