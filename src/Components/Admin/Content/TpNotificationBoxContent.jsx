import { DataTable } from "@/Components/Admin/ui/notiification/DataTable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components(shadcn)/ui/select";
import { cn } from "@/lib/utils";
import { server } from "@/main";
import axios from "axios";
import { RotateCcw, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const TpNotificationBoxContent = () => {
  const [traningPartnerData, setTraningPartnerData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sectors, setSectors] = useState([]);
  const [course, setCourse] = useState([]);
  const [schemes, setSchemes] = useState([]);
  const [filters, setFilters] = useState({
    sector: "",
    course: "",
    scheme: "",
    registeredOfficeState: "",
  });
  const [selectedValues, setSelectedValues] = useState({
    sector: "",
    course: "",
    scheme: "",
    registeredOfficeState: "",
  });

  useEffect(() => {
    fetchTrainingPartners();
  }, [filters]);

  const fetchTrainingPartners = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${server}/tp/all/query`, {
        params: filters,
        withCredentials: true,
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      setTraningPartnerData(response.data.data.reverse());
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setSelectedValues((prev) => ({ ...prev, [name]: value }));
  };

  const resetFilters = () => {
    setFilters({
      sector: "",
      course: "",
      scheme: "",
      registeredOfficeState: "",
    });
    setSelectedValues({
      sector: "",
      course: "",
      scheme: "",
      registeredOfficeState: "",
    });
  };

  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    try {
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
          setSectors(response.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      axios
        .get(`${server}/course/course`, {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        })
        .then((response) => {
          setCourse(response.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      axios
        .get(`${server}/scheme`, {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
            Expires: "0",
          },
        })
        .then((response) => {
          setSchemes(response.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  return (
    <>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of Training Partner's for you!
            </p>
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
                {course.map((courses) => (
                  <SelectItem key={courses.id} value={courses.courseName}>
                    {courses.courseName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedValues.scheme}
              onValueChange={(value) => handleFilterChange("scheme", value)}
            >
              <SelectTrigger className="w-fit border-0">
                <SelectValue placeholder="Filter by Scheme" />
              </SelectTrigger>
              <SelectContent>
                {schemes.map((scheme) => (
                  <SelectItem key={scheme.id} value={scheme.name}>
                    {scheme.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={selectedValues.registeredOfficeState}
              onValueChange={(value) =>
                handleFilterChange("registeredOfficeState", value)
              }
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
          filter1={"organizationName"}
          path={path}
          columns={columns}
          data={traningPartnerData}
          isLoding={loading}
          pageUrl={"trainingpartner"}
        />
      </div>
    </>
  );
};

export default TpNotificationBoxContent;

const columns = [
  {
    accessorKey: "SL_NO",
    header: "Sl No",
    cell: ({ row }) => { 
      return <div>{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "organizationName",
    header: "Training Partner Name",
  },
  {
    accessorKey: "registeredOfficeEmail",
    header: "Email",
  },
  {
    accessorKey: "registeredOfficeState",
    header: "State",
  },
  {
    accessorKey: "scheme",
    header: "Scheme",
  },
  {
    accessorKey: "applicationStatus",
    header: "Status",
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
