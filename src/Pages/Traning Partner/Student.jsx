import { Button } from '@/components(shadcn)/ui/button';
import { StudentDataAtom } from '@/Components/Traning Partner/Atoms/studentAtom';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Card, CardContent, CardHeader, CardTitle } from '@/components(shadcn)/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components(shadcn)/ui/avatar';
import { batchDataAtoms } from '@/Components/Traning Partner/Atoms/batchatom';
import { batchIdAtoms } from '@/Components/Traning Partner/Atoms/BatchId';

const Student = () => {
    const navigate = useNavigate();
    const studentData = useRecoilValue(StudentDataAtom);
    
    const defaultUserPhoto = './image/user.png';
   const batchId=useRecoilValue(batchIdAtoms)
   console.log("allal",batchId)
    const InfoSection = ({ title, data }) => (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-4">
                    {Object.entries(data).map(([key, value]) => (
                        <div key={key} className="flex flex-col">
                            <span className="text-sm font-medium text-gray-500">{key}</span>
                            <span className="text-base text-gray-900">{value}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className='bg-gray-100 min-h-screen p-8'>
            <div className='max-w-6xl mx-auto'>
                <div className='flex justify-between items-center mb-8'>
                    <h1 className='text-3xl font-bold text-gray-800'>Student Profile</h1>
                    <Button 
                    className="bg-blue-500"
                        variant=""
                        onClick={() => navigate(`/trainingPartner/viewBatch/${batchId}`)}
                    >
                        Back to Students
                    </Button>
                </div>

                <div className='grid grid-cols-3 gap-8'>
                    {/* Left Column: Profile Summary */}
                    <div className='col-span-1'>
                        <Card className="mb-6">
                            <CardContent className="pt-6">
                                <div className="flex flex-col items-center">
                                    <Avatar className="w-32 h-32 mb-4">
                                        <AvatarImage src={studentData.profilepic || defaultUserPhoto} alt="Student" />
                                        {console.log("pic",studentData.profilepic)}
                                        <AvatarFallback>{studentData.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <h2 className="text-2xl font-bold text-gray-800 mb-1">{studentData.name}</h2>
                                    <p className="text-sm text-gray-500 mb-4">{studentData.uid}</p>
                                    <p className="text-sm text-gray-700 text-center mb-2">{studentData.course}</p>
                                    <p className="text-sm text-gray-700 text-center">{studentData.sector_name}</p>
                                </div>
                            </CardContent>
                        </Card>

                        <InfoSection 
                            title="Training Details" 
                            data={{
                                "Start Date": new Date(studentData.traininstartdate).toLocaleDateString(),
                                "End Date": new Date(studentData.trainingenddate).toLocaleDateString(),
                                "Training Hours": studentData.trainingHours,
                                "Total Hours": studentData.totalhours,
                                "Module": studentData.module,
                            }} 
                        />
                    </div>

                    {/* Right Column: Detailed Information */}
                    <div className='col-span-2'>
                        <InfoSection 
                            title="Personal Information" 
                            data={{
                                "Father's Name": studentData.fathername,
                                "Mother's Name": studentData.mothername,
                                "Date of Birth": new Date(studentData.dob).toLocaleDateString(),
                                "Gender": studentData.gender,
                                "Religion": studentData.religion,
                                "Category": studentData.category,
                                "Nationality": studentData.nationality,
                                "General Qualification": studentData.generalqualification
                            }} 
                        />

                        <InfoSection 
                            title="Contact Information" 
                            data={{
                                "Address": studentData.address,
                                "State": studentData.state,
                                "District": studentData.district,
                                "City": studentData.city,
                                "Pincode": studentData.pincode,
                                "Mobile": studentData.mobile,
                                "Email": studentData.email
                            }} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Student;


