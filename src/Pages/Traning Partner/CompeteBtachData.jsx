import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useReactToPrint } from 'react-to-print';
import TopBar from '@/Components/Traning Partner/TopBar';
import SideNav from '@/Components/Traning Partner/SideNav';
import { Button } from '@/components(shadcn)/ui/button';
import { Download } from 'lucide-react';
import { CompeltebatchDataAtoms } from '@/Components/Traning Partner/Atoms/completeBtachAtom';
import GenerateMarksheetFrom from '@/Components/Traning Partner/ui/Marksheet/generateMarkFrom';
import { server } from '@/main';

const CompeteBatchData = () => {
    const batchData = useRecoilValue(CompeltebatchDataAtoms);
    const componentRef = useRef();
    const [loadingStates, setLoadingStates] = useState({});
    const [studentData, setStudentData] = useState(null);
    const [currentStudentId, setCurrentStudentId] = useState(null);

    const handleGenerateMarkSheet = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'MarkSheet', 
    });

    const getmark = useCallback(async (studentId) => {
        setLoadingStates(prev => ({ ...prev, [studentId]: true }));
        setCurrentStudentId(studentId);
        try {
            const response = await fetch(`${server}/student/${studentId}`, { 
                method: "GET"
            });
            const data = await response.json();
            setStudentData(data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingStates(prev => ({ ...prev, [studentId]: false }));
        }
    }, []);

    useEffect(() => {
        if (currentStudentId && studentData) {
            handleGenerateMarkSheet();
        }
    }, [currentStudentId, studentData, handleGenerateMarkSheet]);

    const generateDummyData = useCallback((student) => {
        if (!student) return null;

        return {
            schemCode: student.marks.TrainingPartner || 'N/A',
            name: student.name,
            ward: student.fathername,
            qualificationName: student.course,
            qualificationCode: student.marks.batchABN ? student.marks.batchABN.split('/')[1] : 'N/A',
            nsqfLevel: '5', 
            sector: student.sector_name,
            duration: `${student.totaldays} days`,
            assessorRegNo: 'AR123456', 
            dob: new Date(student.dob).toISOString().split('T')[0],
            assessmentBatchNo: student.marks.batchABN,
            assessmentDate: student.marks.examDate ? new Date(student.marks.examDate).toISOString().split('T')[0] : 'N/A',
            nosMarks: student.marks.Nos.map((nos, index) => ({
                code: `NOS${index + 1}`,
                name: nos.name,
                type: 'Theory', 
                maxMarks: nos.passMark,
                marksObtained: nos.MarksObtained
            })),
            totalMarks: student.marks.total,
            grade: student.marks.Grade,
            result: student.marks.Result,
            dateOfIssue: new Date().toISOString().split('T')[0], 
            certificateNo: `CERT${student.redg_No}`,
        };
    }, []);

    return (
        <div className="flex h-screen bg-gray-100">
            <SideNav />
            <div className="flex-1 flex flex-col overflow-hidden">
                <TopBar />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                    <div className="container mx-auto px-6 py-8">
                        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Students</h1>
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            {batchData && batchData.students && batchData.students.length > 0 ? (
                                batchData.students.map((student) => (
                                    <div key={student._id} className="p-6 border-b border-gray-200 hover:bg-gray-50 transition duration-150 ease-in-out">
                                        <div className="flex items-center">
                                            <div className="flex-grow">
                                                <h2 className="text-xl font-semibold text-gray-800">{student.name}</h2>
                                                <p className="text-gray-600">{student.course}</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <Button
                                                    onClick={() => getmark(student._id)}
                                                    disabled={loadingStates[student._id] || !student.markUploadStatus}
                                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    <Download className="mr-2 h-4 w-4" />
                                                    {loadingStates[student._id] ? 'Generating...' : 'MarkSheet'}
                                                </Button>
                                                <Button
                                                    disabled={!student.markUploadStatus}
                                                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                                                >
                                                    <Download className="mr-2 h-4 w-4" /> Certificate
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="p-6 text-center text-gray-500">No students found</div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
            <div className="hidden">
                <GenerateMarksheetFrom 
                    ref={componentRef} 
                    data={currentStudentId && studentData ? generateDummyData(studentData) : null} 
                />
            </div>
        </div>    
    );
};

export default CompeteBatchData;