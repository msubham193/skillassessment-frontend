import React, { useEffect, useState } from 'react'
import FormTable from './FormTable';
import axios from 'axios';
import { server } from '@/main';

const ShowAccessmentAgency = ({ setAssesmentAgency, course, sector, state, setassessmentagencyName,closeModal }) => {
    const [assessmentAgency, setAssessmentAgency] = useState([]); 
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const fetchAssessmentAgency = async () => { 
          setLoading(true); 
          try {
              const response = await axios.get(`${server}/aa/all/query`, {
                  params: {
                      sector,
                      state,
                      course
                  },
                  withCredentials: true,
                  headers: {
                      "Cache-Control": "no-cache",
                      'Pragma': "no-cache",
                      'Expires': "0",
                  },
              });
              setAssessmentAgency(response.data.data.reverse());
          } catch (error) {
              console.error(error);
          } finally {
              setLoading(false);
          }
      };
 
      fetchAssessmentAgency();
    }, [course, sector, state]);

    const handleRowClick = (row) => {
      // Call the setter functions from props
      setassessmentagencyName(row?.agencyName);  // Set the agency name in the parent
      setAssesmentAgency(row._id);               // Set the agency ID in the parent
      closeModal();
    };

    return (
      <div>
        <FormTable 
          filter1={"agencyName"} 
          columns={columns} 
          data={assessmentAgency} 
          isLoading={loading} 
          onRowClick={handleRowClick} 
        />
      </div>
    )
}

export default ShowAccessmentAgency

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
    accessorKey: "_id",
    header: "ID",
  },
];
