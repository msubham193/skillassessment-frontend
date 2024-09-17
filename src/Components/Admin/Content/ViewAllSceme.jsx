import axios from "axios";
import React, { useEffect, useState } from "react";
import Loder from "../ui/Loder";
import { server } from "@/main";
import { DataTable } from "../ui/notiification/DataTable";

const ViewAllSceme = () => {
  const [scheme, setScheme] = useState([]);
  const [loading, setLoading] = useState(false);

  //function  for get all the scheme
  useEffect(() => {
    fetchAllScheme();
  }, []);

  const fetchAllScheme = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${server}/scheme`, {
        withCredentials: true,
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      });
      console.log(response.data.data);
      setScheme(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loder />;
  return (
    <div>
      <DataTable
        filter1={"status"}
        columns={batchColumns}
        data={scheme}
        isLoading={loading}
      />
    </div>
  );
};

export default ViewAllSceme;

const batchColumns = [
  {
    accessorKey: "logo",
    header: "Logo",
    cell: ({ row }) => (
      <img src={row.original.logo} alt="logo" width="50" height="50" />
    ),
  },
  {
    accessorKey: "name",
    header: "Organization Name",
  },
  {
    accessorKey: "code",
    header: "Code",
  },

  {
    accessorKey: "pricePerStudent",
    header: "Price Per Student",
  },
  {
    accessorKey: "schemeType",
    header: "Scheme Type",
  },
  {
    accessorKey: "state",
    header: "State",
  },
];
