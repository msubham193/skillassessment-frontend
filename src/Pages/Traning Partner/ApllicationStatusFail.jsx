import React from 'react'
import { Frown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ApplicationStatusFail = () => {
  const navigate = useNavigate()

  const handleBackToLogin = () => {
    navigate('/trainingPartner/signin')
  }

  return (
    <div className='w-full h-screen bg-black flex items-center justify-center p-5 '>
      <div className='flex flex-col items-center gap-4'>
        <Frown size={50} className='text-yellow-700 '/>
        <h1 className=' text-white text-2xl'>Oops! Looks like your application is not Approved Yet!</h1>
        <button 
          onClick={handleBackToLogin}
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        >
          Back to Login
        </button>
      </div>
    </div>
  )
}

export default ApplicationStatusFail