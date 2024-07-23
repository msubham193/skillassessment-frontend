import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components(shadcn)/ui/select";
import { server } from "@/main";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { DataTable } from "../ui/notiification/DataTable";
import { X } from "lucide-react";

const AaPaymentInvoicedetails = ({ id }) => {
  const months = [
    { id: "01", name: "January" },
    { id: "02", name: "February" },
    { id: "03", name: "March" },
    { id: "04", name: "April" },
    { id: "05", name: "May" },
    { id: "06", name: "June" },
    { id: "07", name: "July" },
    { id: "08", name: "August" },
    { id: "09", name: "September" },
    { id: "10", name: "October" },
    { id: "11", name: "November" },
    { id: "12", name: "December" },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => ({
    id: (currentYear - i).toString(),
    name: (currentYear - i).toString(),
  }));
  const [filters, setFilters] = useState({
    month: "",
    year: "",
  });
  const [selectedValues, setSelectedValues] = useState({
    month: "",
    year: "",
  });
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [invoice, setInvoice] = useState(false);
  const [loading, setLoading] = useState(false);

  //function for fetch monthly data in the table.....
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
      });
      setInvoice(response.data.data.reverse());
      setIsDataFetched(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //function for change the handel.........
  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
    setSelectedValues((prev) => ({ ...prev, [name]: value }));
    setIsDataFetched(false);
  };

  //function for reset filter.....
  const resetFilters = () => {
    setFilters({
      month: "",
      year: "",
    });
    setSelectedValues({
      month: "",
      year: "",
    });
    setIsDataFetched(false);
  };
  //is for reset thr unfilter data
  const hasActiveFilters = Object.values(filters).some((value) => value !== "");
  return (
    <div>
      <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <div className="flex items-center justify-start space-x-4">
          <Select
            value={selectedValues.month}
            onValueChange={(value) => handleFilterChange("month", value)}
          >
            <SelectTrigger className="w-fit border-0">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month.id} value={month.id}>
                  {month.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={selectedValues.year}
            onValueChange={(value) => handleFilterChange("year", value)}
          >
            <SelectTrigger className="w-fit border-0">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year.id} value={year.id}>
                  {year.name}
                </SelectItem>
              ))}
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
      {/*<DataTable
        filter1={"status"}
        path={"/admin/dasbord"}
        columns={batchColumns}
        data={batch}
        isLoading={loading}
        pageUrl={"batch"}
      />*/}
    </div>
  );
};

export default AaPaymentInvoicedetails;
