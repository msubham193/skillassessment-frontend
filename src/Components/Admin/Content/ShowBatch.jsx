import { server } from '@/main';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import FormTable from './FormTable';

const ShowBatch = ({ setBatch }) => {
    const [batchdata, setBatchdata] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      try {
        setLoading(true);
        axios.get(`${server}/batch`, {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache",
            'Pragma': "no-cache",
            'Expires': "0",
          },
        }).then((response) => {
          setLoading(false);
          setBatchdata(response.data.data.reverse());
        })
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }, []);

    const handleRowClick = (row) => {
      setBatch(row._id);
    };

    return (
      <div>
        <FormTable columns={columns} data={batchdata} isLoading={loading} onRowClick={handleRowClick} />
      </div>
    )
}

export default ShowBatch

const columns = [
    {
      accessorKey: "_id",
      header: "Batch_ID",
    },
    {
      accessorKey: "name",
      header: "Batch Name",
    },
];