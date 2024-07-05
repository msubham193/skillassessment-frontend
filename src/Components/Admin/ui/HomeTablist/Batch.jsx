import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { server } from '@/main';
import { DataTable } from '../notiification/DataTable';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components(shadcn)/ui/select';
import { RotateCcw } from 'lucide-react';

const Batch = () => {
  const [batch, setBatch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sectors, setSectors] = useState([]);
  const [courses, setCourses] = useState([]);
  const [traningOraganization, setTraningOraganization] = useState([]);
  const [filters, setFilters] = useState({
    state: "",
    sector: "",
    course: "",
    trainingOrganization: "",
  });
//state, sector, course, trainingOrganization 
  useEffect(() => {
    fetchBatches();
  }, [filters]);

  const fetchBatches = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${server}/batch/all/query`, {
        params: filters,
        withCredentials: true,
      });
      setBatch(response.data.data.reverse());
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
      state: "",
      sector: "",
      course: "",
      trainingOrganization: "",
    });
  };

  const location = useLocation();
  const path = location.pathname;
//here all the functioon for get the data's
  useEffect(() => {
    try {
      axios.get(`${server}/sector/all`, {
        withCredentials: true,
      }).then((response) => {
        setSectors(response.data.data);
      })
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      axios.get(`${server}/course/all`, {
        withCredentials: true,
      }).then((response) => {
        setCourses(response.data.data);
      })
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      axios.get(`${server}/tp`, {
        withCredentials: true,
      }).then((response) => {
        setTraningOraganization(response.data.data);
      })
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Batch Details</h2>
          <p className="text-muted-foreground">Here&apos;s a list of Batches for you!</p>
        </div>
        <div className="flex items-center space-x-2">
          <Select onValueChange={(value) => handleFilterChange("sector", value)}>
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

          <Select onValueChange={(value) => handleFilterChange("course", value)}>
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

          <Select onValueChange={(value) => handleFilterChange("trainingOrganization", value)}>
            <SelectTrigger className="w-fit border-0">
              <SelectValue placeholder="Filter by Traning partner" />
            </SelectTrigger>
            <SelectContent>
              {traningOraganization.map((tp) => (
                <SelectItem key={tp.id} value={tp.organizationName}>
                  {tp.organizationName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => handleFilterChange("state", value)}>
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

      <DataTable
        filter1={"courseName"}
        path={path}
        columns={batchColumns}
        data={batch}
        isLoding={loading}
      />
    </div>
  );
};

export default Batch;

export const batchColumns = [
  {
    accessorKey: "courseName",
    header: "Batch Name",
  },
  {
    accessorKey: "trainingOrganization",
    header: "Created By",
  },
  {
    accessorKey: "scheme",
    header: "Batch under Scheme",
  },
  {
    accessorKey: "state",
    header: "State",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div
          className={cn("font-medium w-fit px-4 py-2 rounded-lg", {
            "bg-orange-100 text-orange-500": row.getValue("status") === "onGoing",
            "bg-green-100 text-green-400": row.getValue("status") === "Completed",
          })}
        >
          {row.getValue("status")}
        </div>
      );
    },
  },
];
