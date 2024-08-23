import React, { useEffect, useState } from 'react'
import FormTable from './FormTable';
import axios from 'axios';
import { server } from '@/main';

const ShowAccessmentAgency = ({ setAssesmentAgency,course,sector,state,setassessmentagencyName }) => {
    const [assessmentAgency, setAssessmentAgency] = useState([]); 
    const [loading, setLoading] = useState(false);

    //here i can apply the filter for accessment agency.........

    // console.log(course,sector,state)

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
              // console.log(response.data.data)
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
      // console.log(row)//agencyName
      setassessmentagencyName(row?.agencyName)
      setAssesmentAgency(row._id); // Assuming _id is the id of the assessment agency
    };

    return (
      <div>
        <FormTable filter1={"agencyName"} columns={columns} data={assessmentAgency} isLoading={loading} onRowClick={handleRowClick} />
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
      header: "email",
    },
    {
      accessorKey: "_id",
      header: "id",
    },
];