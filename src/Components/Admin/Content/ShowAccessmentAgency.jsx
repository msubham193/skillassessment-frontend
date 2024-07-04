import React, { useEffect, useState } from 'react'
import FormTable from './FormTable';
import axios from 'axios';
import { server } from '@/main';

const ShowAccessmentAgency = ({ setAssesmentAgency }) => {
    const [assessmentAgency, setAssessmentAgency] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      try {
        setLoading(true);
        axios.get(`${server}/aa/status/approved`, {
          withCredentials: true,
        }).then((response) => {
          setLoading(false);
          setAssessmentAgency(response.data.data.reverse());
        })
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }, []);

    const handleRowClick = (row) => {
      setAssesmentAgency(row._id); // Assuming _id is the id of the assessment agency
    };

    return (
      <div>
        <FormTable columns={columns} data={assessmentAgency} isLoading={loading} onRowClick={handleRowClick} />
      </div>
    )
}

export default ShowAccessmentAgency

const columns = [
    {
      accessorKey: "_id",
      header: "Organization ID",
    },
    {
      accessorKey: "agencyName",
      header: "Organization Name",
    },
];