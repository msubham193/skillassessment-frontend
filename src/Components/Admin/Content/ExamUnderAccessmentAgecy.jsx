import React, { useEffect, useState } from 'react'
import { DataTable } from '../ui/notiification/DataTable'
import { examcolumns } from '../ui/HomeTablist/AllExam'
import axios from 'axios';
import { server } from '@/main';

const ExamUnderAccessmentAgecy = ({id}) => {
    const [exam, setExam] = useState({});
    const [loding, setLoding] = useState(false);

     // function for fetch exam by aaID.........
  useEffect(() => {
    try {
      setLoding(true);
      axios
        .get(`${server}/exam/aa/${id}`, {
          withCredentials: true,
        })
        .then((response) => {
          setLoding(false);
          setExam(response.data.data.reverse());
          setReferesh((prev) => !prev);
        });
    } catch (error) {
      setLoding(false);
      console.log(error);
    }
  }, []);
  return (
    <div>
    <DataTable
    columns={examcolumns}
    data={exam && exam}
    isLoding={loding}
  />
    </div>
  )
}

export default ExamUnderAccessmentAgecy
