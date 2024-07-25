import React from 'react'
import { Frown } from 'lucide-react';

const ApllicationStatusFail = () => {
  return (
    <div className='w-full h-screen bg-black flex items-center justify-center p-5 '>
      <div className='flex flex-col items-center gap-4'>
      <Frown size={50} className='text-yellow-700 '/>
      <h1 className=' text-white text-2xl'>Oops ! looking like your application is not Approved Yet  !!!</h1>
      </div>
    </div>
  )
}

export default ApllicationStatusFail