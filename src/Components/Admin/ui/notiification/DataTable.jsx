"use client";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  useReactTable,
  flexRender,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components(shadcn)/ui/table";
import TableToolBar from "./TableToolBar";
import TablePagination from "./TablePagination";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loder from "../Loder";
import { Download, FileDown } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components(shadcn)/ui/tooltip"; 
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button } from "@/components(shadcn)/ui/button";
import AaAnalysis from "@/Pages/Admin/AaAnalysis";
import TpAnalysis from "@/Pages/Admin/TpAnalysis";
import BathAnalysis from "@/Pages/Admin/BathAnalysis";
import ExamAnalysis from "@/Pages/Admin/ExamAnalysis";
export function DataTable({ columns, path, data, isLoding, filter1, pageUrl }) {
  console.log(data);
  const navigate = useNavigate();
  const [rowSelection, setRowSelection] = useState({});
  const [anylisis, setAnylisis] = useState("");
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columnFilters, setColumnFilters] = useState([]);
  const [sorting, setSorting] = useState([]);
  //funncction for navigate to anylisis..
  const handleRedirect = () => {
    switch (pageUrl) {
      case "accessmentagency":
        setAnylisis("accessmentagency");
        break;
      case "trainingpartner":
        setAnylisis("trainingpartner");
        break;
      case "batch":
        setAnylisis("batch");
        break;
      case "allexam":
        setAnylisis("allexam");
        break;
    }
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
  // console.log(table.getRowModel().rows[0].original.id);

  //function for download the dataAsPDF...
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = columns.map((col) => col.header);
    const tableRows = data.map((row) =>
      columns.map((col) => row[col.accessorKey])
    );

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("table.pdf");
  };

  // console.log(table.getRowModel().rows[0].original.studentId)

  if (isLoding) {
    return <Loder />;
  }

  return (
    <TooltipProvider>
      <div className="space-y-4">
        <TableToolBar table={table} filter1={filter1} />

        <div className="rounded-md border overflow-x-auto">
          <Table className="min-w-full divide-y divide-gray-200">
            <TableHeader className="bg-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="hover:cursor-pointer">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    onClick={() =>
                      path && navigate(`${path}/${row.original._id}`)
                    }
                    className="bg-white even:bg-gray-50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={table.getAllColumns().length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div>
          <div className="flex">
            {" "}
            NO.of Rows:{" "}
            <span className="ml-1 font-bold  text-blue-800">
              {table.getRowModel().rows?.length}
            </span>
          </div>
          <TablePagination table={table} />
        </div>
        <div className="flex">
          <Tooltip delayDuration={0}>
            <TooltipTrigger>
              {" "}
              {/* here i create he function for download  the row data.. */}
              <Button className="mr-2" onClick={handleDownloadPDF}>
                <FileDown />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Download the data as PDF.</TooltipContent>
          </Tooltip>
          <div className="ml-4">
            <Button onClick={handleRedirect}>view statistic</Button>
          </div>
          
        </div>
        {anylisis==="accessmentagency" &&  <AaAnalysis data={data} />}
          {anylisis==="trainingpartner" &&  <TpAnalysis data={data} />}
          {anylisis==="batch" &&  <BathAnalysis data={data} />}
          {anylisis==="allexam" &&  <ExamAnalysis data={data} />}
      </div>
    </TooltipProvider>
  );
}
