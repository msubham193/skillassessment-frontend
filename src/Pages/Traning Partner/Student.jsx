import { Button } from '@/components(shadcn)/ui/button'
import { StudentDataAtom } from '@/Components/Traning Partner/Atoms/studentAtom'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
const Student = () => {
    const navigate = useNavigate();
    const studentData=useRecoilValue(StudentDataAtom)
    const defaultUserPhoto='./image/user.'

  return (
   <div className='bg-white h-screen w-auto'>
    <div className=' flex justify-between items-center p-4'>
     <div className='flex flex-col'>
        <h1 className='text-gray-700 text-3xl font-bold'>Student Information</h1>
        <p className='text-gray-500 text-sm'>This page contain all the info about Student</p>
     </div>
     <div>
     <Button className="bg-blue-700" onClick={() => navigate("/trainingPartner/dashboard")}>
      Back to Dashboard
    </Button>
     </div>
     </div>
     <div className='flex justify-between  w-full h-auto p-8'>
     {/* student info */}

     <div className='grid grid-cols-3 gap-8  w-[70%] font-medium text-gray-700'>
      {/* Column 1: Basic Info */}
      <div className=''>
        <h2 className='text-lg font-bold mb-4 underline'>Basic Info</h2>
        <table className='w-full'>
          <tbody>
            <tr>
              <td className='p-2'>Name</td>
              <td className=' p-2'>{studentData.name}</td>
            </tr>
            <tr>
              <td className=' p-2'>Father's Name</td>
              <td className=' p-2'>{studentData.fathername}</td>
            </tr>
            <tr>
              <td className=' p-2'>Mother's Name</td>
              <td className=' p-2'>{studentData.mothername}</td>
            </tr>
            <tr>
              <td className=' p-2'>Date of Birth</td>
              <td className=' p-2'>{new Date(studentData.dob).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td className=' p-2'>Gender</td>
              <td className=' p-2'>{studentData.gender}</td>
            </tr>
            <tr>
              <td className=' p-2'>Religion</td>
              <td className=' p-2'>{studentData.religion}</td>
            </tr>
            <tr>
              <td className=' p-2'>Category</td>
              <td className=' p-2'>{studentData.category}</td>
            </tr>
            <tr>
              <td className=' p-2'>Nationality</td>
              <td className=' p-2'>{studentData.nationality}</td>
            </tr>
            <tr>
              <td className=' p-2'>General Qualification</td>
              <td className=' p-2'>{studentData.generalqualification}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Column 2: Address */}
      <div>
        <h2 className='text-lg font-bold mb-4 underline'>Address</h2>
        <table className='w-full'>
          <tbody >
            <tr>
              <td className=' p-2'>Address</td>
              <td className=' p-2'>{studentData.address}</td>
            </tr>
            <tr>
              <td className=' p-2'>State</td>
              <td className=' p-2'>{studentData.state}</td>
            </tr>
            <tr>
              <td className=' p-2'>District</td>
              <td className=' p-2'>{studentData.district}</td>
            </tr>
            <tr>
              <td className=' p-2'>City</td>
              <td className=' p-2'>{studentData.city}</td>
            </tr>
            <tr>
              <td className=' p-2'>Pincode</td>
              <td className=' p-2'>{studentData.pincode}</td>
            </tr>
            <tr>
              <td className=' p-2'>Mobile</td>
              <td className=' p-2'>{studentData.mobile}</td>
            </tr>
            <tr>
              <td className=' p-2'>Email</td>
              <td className=' p-2'>{studentData.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      {/* Column 3: Training Details */}
      <div>
        <h2 className='text-lg font-bold mb-4 underline'>Training Details</h2>
        <table className='w-full'>
          <tbody>
            <tr>
              <td className=' p-2'>Sector Name</td>
              <td className=' p-2'>{studentData.sector_name}</td>
            </tr>
            <tr>
              <td className=' p-2'>Course</td>
              <td className=' p-2'>{studentData.course}</td>
            </tr>
            <tr>
              <td className=' p-2'>Module</td>
              <td className=' p-2'>{studentData.module}</td>
            </tr>
            <tr>
              <td className=' p-2'>UID</td>
              <td className=' p-2'>{studentData.uid}</td>
            </tr>
            <tr>
              <td className=' p-2'>Training Start Date</td>
              <td className=' p-2'>{new Date(studentData.traininstartdate).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td className=' p-2'>Training End Date</td>
              <td className=' p-2'>{new Date(studentData.trainingenddate).toLocaleDateString()}</td>
            </tr>
            <tr>
              <td className=' p-2'>Training Hours</td>
              <td className=' p-2'>{studentData.trainingHours}</td>
            </tr>
            <tr>
              <td className=' p-2'>Total Hours</td>
              <td className=' p-2'>{studentData.totalhours}</td>
            </tr>
          </tbody>
        </table>
      </div>
     </div>
     {/* student image */}
     <div className='w-[20%]'>
     <div className="border-[1px] border-black w-48 mx-auto md:w-40 md:mx-0 h-48 overflow-hidden  md:mt-0">
          <img
            src={studentData.profilepic || defaultUserPhoto}
            alt="user"
            onError={(e) => (e.target.src = defaultUserPhoto)}
            className="w-full h-full object-cover"
          />
        </div>
        </div>
     </div>
   </div>

  )
}

export default Student

