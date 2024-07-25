import React from 'react';
import { Table, TableHeader, TableBody, TableHead, TableRow, TableCell } from "@/components(shadcn)/ui/table";
import { useRecoilValue, useRecoilState } from 'recoil';
import { batchDataAtoms } from '../Atoms/batchatom';
import { Button } from '@/components(shadcn)/ui/button';
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useNavigate } from 'react-router-dom';
import { StudentDataAtom } from '../Atoms/studentAtom';
import ProfilePictureUploader from './ProfilePictureUploader'; // Correct the import path if necessary

const DataTable = ({ columns, data }) => {
    const batchData = useRecoilValue(batchDataAtoms);
    const [studentData, setStudentData] = useRecoilState(StudentDataAtom);
    const navigate = useNavigate();

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const fetchStudentData = async (batchid) => {
        try {
            const response = await fetch(`http://localhost:8000/api/v1/student/${batchid}`, {
                method: 'GET',
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.data);
                setStudentData(data.data);
                navigate(`/trainingPartner/dashboard/student/${batchid}`);
            } else {
                console.error('Failed to fetch student data');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <Table>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                            <TableHead key={header.id} className="font-semibold text-xl">
                                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                            </TableHead>
                        ))}
                       
                    </TableRow>
                ))}
            </TableHeader>

            <TableBody className="bg">
                {batchData && batchData.students && batchData.students.length > 0 ? (
                    batchData.students.map((student) => (
                        <TableRow key={student.id} className="">
                            <TableCell className="text-white">{student.name}</TableCell>
                            <TableCell className="text-white">{student.email}</TableCell>
                            <TableCell className="text-white">{student.course}</TableCell>
                            <TableCell className="text-white">
                                <Button className="text-blue-500 hover:underline" onClick={() => fetchStudentData(student._id)}>
                                    View Details
                                </Button>
                            </TableCell>
                            <TableCell>
                            <ProfilePictureUploader studentId={student._id} />
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={4} className="h-24 text-center text-white">
                            No results.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default DataTable;
