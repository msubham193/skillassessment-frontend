import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import TopBar from '@/Components/Traning Partner/TopBar';
import SideNav from '@/Components/Traning Partner/SideNav';
import { Button } from '@/components(shadcn)/ui/button';
import { Download } from 'lucide-react';
import { CompeltebatchDataAtoms } from '@/Components/Traning Partner/Atoms/completeBtachAtom';
import generateMarkSheetPDF from '@/Components/Traning Partner/ui/Marksheet/generateMarkSheetPDF';

const CompeteBatchData = () => {
  const [students, setStudents] = useState([]);
  const batchData = useRecoilValue(CompeltebatchDataAtoms);

  useEffect(() => {
    if (batchData && batchData.students) {
      setStudents(batchData.students);
    }
  }, [batchData]);

  console.log(students);

  return (
    <div className="flex h-screen bg-gray-100">
      <SideNav />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
          <div className="container mx-auto px-6 py-8">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Students</h1>
            <div>
              {students.length > 0 ? (
                students.map((student) => (
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
                        <Button onClick={() => generateMarkSheetPDF(student)}>
                          <Download /> MarkSheet
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
    </div>
  );
}

export default CompeteBatchData;
