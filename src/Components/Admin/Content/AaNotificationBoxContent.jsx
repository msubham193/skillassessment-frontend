import React, { useEffect, useState } from 'react'
import { cn } from '@/lib/utils';
import axios from 'axios';
import { server } from '@/main';
import { DataTable } from '../ui/notiification/DataTable';
import { useLocation } from 'react-router-dom';

//in this component fetech all the request of AA  that are present in the database as notification data...
const AaNotificationBoxContent = () => {
  const [assessmentAgency, setAssessmentAgency] = useState([]);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${server}/aa`, { withCredentials: true });
      setLoading(false);
      const newData = response.data.data.reverse();
      if (initialLoad) {
        setInitialLoad(false)
        setAssessmentAgency(newData);
      } else if (newData.length > assessmentAgency.length) {
        setAssessmentAgency(newData);
        
      }
    } catch (error) {
      setLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(); 

    const pollingInterval = setInterval(() => {
      fetchData();
    }, 30*60*1000); // 30 minutes in milliseconds

    return () => clearInterval(pollingInterval);
  }, []);

  // console.log(assessmentAgency);
  const location = useLocation();
  const path=location.pathname;
 
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
          {/* add the functionality like search and filter */}
          {/* For now  there is nothing to add in fecture if there some data  thenn we will put there */}
        </div>
      </div>
      {/* Data table for the notification */}
      <DataTable  path={path} columns={columns} data={assessmentAgency} isLoding={loading}/>
    </div>
  </>
  )
}

export default AaNotificationBoxContent

 const columns = [
    {
      accessorKey: '_id',
      header: 'ID ',
    },
    {
      accessorKey: 'agencyName',
      header: 'Organization Name',
    },
    {
      accessorKey: 'subject',
      header: 'Subject',
    },
   
    {
      accessorKey: 'applicationStatus',
      header: 'applicationStatus',
      cell:({row})=>{
        return(
          <div className={cn("font-medium w-fit px-4 py-2 rounded-lg",{
            "bg-red-100 text-red-500":row.getValue("applicationStatus")==="Rejected",
            "bg-orange-100 text-orange-500":row.getValue("applicationStatus")==="Pending",
            "bg-green-100 text-green-400":row.getValue("applicationStatus")==="Approved",
  
          })}>{row.getValue("applicationStatus")}</div>
        )
      }
    },
  ];
