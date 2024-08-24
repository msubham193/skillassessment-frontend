import { server } from '@/main';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { DataTable } from '../ui/notiification/DataTable';


const ListOfSna = () => {
    const [sna, setSna] = useState([]);
    const [loding, setLoding] = useState(false);
    useEffect(() => {
      try {
        setLoding(true);
        axios
          .get(`${server}/sna/all`, { 
            withCredentials: true,
            headers: {
              "Cache-Control": "no-cache",
              'Pragma': "no-cache",
              'Expires': "0",
            },
          })
          .then((response) => {
            setLoding(false);
            setSna(response.data.data.reverse());
            console.log(response.data.data)
          });
      } catch (error) {
        setLoding(false);
        console.log(error);
      }
    }, []);
    return (
      <div>
      <DataTable
      filter1={"state"}
      columns={columns}
      data={sna}
      isLoding={loding}
    />
      </div>
    );
}

export default ListOfSna

const columns = [
    {
        accessorKey: "SL_NO",
        header: "Sl No",
        cell: ({ row }) => {
          return <div>{row.index + 1}</div>;
        },
      },
    {
      accessorKey: "email",
      header: "Email ",
    },
    {
      accessorKey: "scheme",
      header: "Scheme",
    },
    {
      accessorKey: "state",
      header: "State",
    },
    {
      accessorKey: "schemetype",
      header: "schemetype",
    },]



















// email
// : 
// "rahulmohanty637@gmail.com"
// password
// : 
// "$2a$10$En5X.enkvuMGuAvUJUwG0.eb.2qL4FGhysSq8aVceIITjPwvD1El2"
// scheme
// : 
// "AWS"
// schemetype
// : 
// "State Government"
// state
// : 
// "Odisha"