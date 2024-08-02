import React, { useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useReactToPrint } from 'react-to-print';
import TopBar from '@/Components/Traning Partner/TopBar';
import SideNav from '@/Components/Traning Partner/SideNav';
import { Button } from '@/components(shadcn)/ui/button';
import { Download } from 'lucide-react';
import { CompeltebatchDataAtoms } from '@/Components/Traning Partner/Atoms/completeBtachAtom';
import GenerateMarksheetFrom from '@/Components/Traning Partner/ui/Marksheet/generateMarkFrom';

const CompeteBatchData = () => {
    const batchData = useRecoilValue(CompeltebatchDataAtoms);
    const componentRef = useRef();
    const [loading, setLoading] = useState(false);
    const[studentAllData,setStudentAllData]=useState({});
    const handleGenerateMarkSheet = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'MarkSheet',
        onBeforePrint: () => setLoading(true),
        onAfterPrint: () => setLoading(false),
    });
  const getmark=async(studentId)=>{
     const response=await fetch(`http://localhost:8000/api/v1/student/${studentId}`,{
        method:"GET"
     })
     try {
        const data= await response.json();
        console.log("ok",data.data)
   setStudentAllData(data.data)
     } catch (error) {
        console.log(error)
     }
  }
  console
    const dummyData = {
        schemCode: 'SCH123',
        name: 'John Doe',
        ward: 'Jane Doe',
        qualificationName: 'Diploma in Engineering',
        qualificationCode: 'QF123',
        nsqfLevel: '5',
        sector: 'Manufacturing',
        duration: '2 Years',
        assessorRegNo: 'AR123456',
        dob: '01/01/1990',
        assessmentBatchNo: 'BATCH123',
        assessmentDate: '01/06/2023',
        nosMarks: [
            { code: 'NOS123', name: 'Subject 1', type: 'Theory', maxMarks: 100, marksObtained: 85 },
            { code: 'NOS124', name: 'Subject 2', type: 'Practical', maxMarks: 100, marksObtained: 90 },
        ],
        totalMarks: 175,
        grade: 'A',
        result: 'Pass',
        dateOfIssue: '01/07/2023',
        certificateNo: 'CERT123456',
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <SideNav />
            <div className="flex-1 flex flex-col overflow-hidden">
                <TopBar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="container mx-auto px-6 py-8">
                        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Students</h1>
                        <div>
                            {batchData && batchData.students && batchData.students.length > 0 ? (
                                batchData.students.map((student) => (
                                    <div key={student._id} className="p-4 border-b border-gray-200">
                                        <div className="flex items-center">
                                            <img
                                                src={student.profilepic}
                                                alt={student.name}
                                                className="w-16 h-16 rounded-full mr-4"
                                            />
                                            <div>
                                                <h2 className="text-lg font-semibold">{student.name}</h2>
                                                <p className="text-gray-600">{student.course}</p>
                                            </div>
                                            <div className="ml-auto flex gap-2">
                                                <Button onClick={()=>{handleGenerateMarkSheet();getmark(student._id);}}  disabled={loading}>
                                                    <Download /> {loading ? 'Generating...' : 'MarkSheet'}
                                                </Button>
                                                <Button>
                                                    <Download /> Certificate
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>No students found</div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
            <div className="hidden">
                <GenerateMarksheetFrom ref={componentRef} data={dummyData} />
            </div>
        </div>    
    );
};

export default CompeteBatchData;
