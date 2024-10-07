/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import { motion } from "framer-motion";

const Qualification = () => {
  // Static data from your Excel sheet
  const staticData = [
    {
      "SL NO": 1,
      "QUALIFICATION NAME": "Paper Recycling Operator cum Technician",
      SECTOR: "PAPER & PAPER PRODUCTS",
      "NSQF LEVEL": 4,
      "APPROVED IN NSQC": "24TH NSQC",
      "Q-FILE": "PDF link TO BE PROVIDED HERE",
    },
    {
      "SL NO": 2,
      "QUALIFICATION NAME": "Transformer Manufacturing Engineer",
      SECTOR: "POWER",
      "NSQF LEVEL": 6,
      "APPROVED IN NSQC": "30TH NSQC",
      "Q-FILE": "PDF link TO BE PROVIDED HERE",
    },
    {
      "SL NO": 3,
      "QUALIFICATION NAME": "Transformer Manufacturing Supervisor",
      SECTOR: "POWER",
      "NSQF LEVEL": 5,
      "APPROVED IN NSQC": "30TH NSQC",
      "Q-FILE": "PDF link TO BE PROVIDED HERE",
    },
    {
      "SL NO": 4,
      "QUALIFICATION NAME": "Transformer Testing Supervisor",
      SECTOR: "POWER",
      "NSQF LEVEL": 5,
      "APPROVED IN NSQC": "30TH NSQC",
      "Q-FILE": "PDF link TO BE PROVIDED HERE",
    },
    {
      "SL NO": 5,
      "QUALIFICATION NAME": "PCB NPI – Fabrication and Verification Specialist",
      SECTOR: "ELECTRONICS AND HW",
      "NSQF LEVEL": 5,
      "APPROVED IN NSQC": "33TH NSQC",
      "Q-FILE": "PDF link TO BE PROVIDED HERE",
    },
    {
      "SL NO": 6,
      "QUALIFICATION NAME":
        "Polyhouse Installation, Monitoring and Service Supervisor",
      SECTOR: "AGRICULTURE",
      "NSQF LEVEL": 5,
      "APPROVED IN NSQC": "33TH NSQC",
      "Q-FILE": "PDF link TO BE PROVIDED HERE",
    },
    {
      "SL NO": 7,
      "QUALIFICATION NAME": "Seed Production Supervisor",
      SECTOR: "AGRICULTURE",
      "NSQF LEVEL": 5,
      "APPROVED IN NSQC": "33TH NSQC",
      "Q-FILE": "PDF link TO BE PROVIDED HERE",
    },
    {
      "SL NO": 8,
      "QUALIFICATION NAME": "Fisheries Post Harvest Supervisor",
      SECTOR: "AGRICULTURE",
      "NSQF LEVEL": 5,
      "APPROVED IN NSQC": "33TH NSQC",
      "Q-FILE": "PDF link TO BE PROVIDED HERE",
    },
    {
      "SL NO": 9,
      "QUALIFICATION NAME": "Paper Recycling Supervisor",
      SECTOR: "ENVIRONMENTAL SCIENCE",
      "NSQF LEVEL": 5,
      "APPROVED IN NSQC": "34TH NSQC",
      "Q-FILE": "PDF link TO BE PROVIDED HERE",
    },
    {
      "SL NO": 10,
      "QUALIFICATION NAME": "Milk Testing Facility Supervisor",
      SECTOR: "FOOD INDUSTRY",
      "NSQF LEVEL": 5,
      "APPROVED IN NSQC": "34TH NSQC",
      "Q-FILE": "PDF link TO BE PROVIDED HERE",
    },
    {
      "SL NO": 11,
      "QUALIFICATION NAME": "Agriculture Value Addition Consultant",
      SECTOR: "AGRICULTURE",
      "NSQF LEVEL": 5,
      "APPROVED IN NSQC": "35TH NSQC",
      "Q-FILE": "PDF link TO BE PROVIDED HERE",
    },
    {
      "SL NO": 12,
      "QUALIFICATION NAME": "Crop and Plant Supervisor",
      SECTOR: "AGRICULTURE",
      "NSQF LEVEL": 5,
      "APPROVED IN NSQC": "35TH NSQC",
      "Q-FILE": "PDF link TO BE PROVIDED HERE",
    },
    {
      "SL NO": 13,
      "QUALIFICATION NAME":
        "Post-harvest Commodity Test and Storage Supervisor",
      SECTOR: "AGRICULTURE",
      "NSQF LEVEL": 5,
      "APPROVED IN NSQC": "35TH NSQC",
      "Q-FILE": "PDF link TO BE PROVIDED HERE",
    },
    {
      "SL NO": 14,
      "QUALIFICATION NAME":
        "Reverse Engineering and Additive Manufacturing QA Supervisor",
      SECTOR: "CAPITAL GOODS",
      "NSQF LEVEL": 5,
      "APPROVED IN NSQC": "35TH NSQC",
      "Q-FILE": "PDF link TO BE PROVIDED HERE",
    },
    {
      "SL NO": 15,
      "QUALIFICATION NAME": "Plastic Mold Design and Manufacturing Engineer",
      SECTOR: "CAPITAL GOODS",
      "NSQF LEVEL": 6,
      "APPROVED IN NSQC": "35TH NSQC",
      "Q-FILE": "PDF link TO BE PROVIDED HERE",
    },
    {
      "SL NO": 16,
      "QUALIFICATION NAME": "CNC Turning Programmer",
      SECTOR: "CAPITAL GOODS",
      "NSQF LEVEL": 5,
      "APPROVED IN NSQC": "35TH NSQC",
      "Q-FILE": "PDF link TO BE PROVIDED HERE",
    },
    {
      "SL NO": 17,
      "QUALIFICATION NAME": "CNC Milling Programmer",
      SECTOR: "CAPITAL GOODS",
      "NSQF LEVEL": 5,
      "APPROVED IN NSQC": "35TH NSQC",
      "Q-FILE": "PDF link TO BE PROVIDED HERE",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState(null);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const sortedData = [...staticData].sort((a, b) => {
    if (sortConfig !== null) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const filteredData = sortedData.filter(
    (item) =>
      item["QUALIFICATION NAME"]
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      item["SECTOR"].toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section>
      <motion.div
        className="container min-h-screen mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gradient-to-br from-blue-50 to-indigo-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">
          Qualification <span className="text-blue-600">Table</span>
        </h1>
        <div className="mb-4 rounded-lg">
          <input
            type="text"
            placeholder="Search by qualification or sector..."
            value={searchQuery}
            onChange={handleSearch}
            className="border rounded-lg p-2 w-full"
          />
        </div>
        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="heading w-full text-sm font-medium">
            <thead>
              <tr className="bg-gray-300">
                <th className="px-6 py-3 text-left text-gray-700 hover:text-primary">
                  Sl. No.{" "}
                </th>
                <th
                  className="p-2 cursor-pointer"
                  onClick={() => requestSort("QUALIFICATION NAME")}
                >
                  Qualification Name
                </th>
                <th
                  className="p-2 cursor-pointer"
                  onClick={() => requestSort("SECTOR")}
                >
                  Sector
                </th>
                <th
                  className="p-2 cursor-pointer"
                  onClick={() => requestSort("NSQF LEVEL")}
                >
                  NSQF Level
                </th>
                <th className="p-2">Approved in NSQC</th>
                <th className="p-2">Q-File</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row, index) => (
                <tr
                  key={index}
                  className="bg-white hover:bg-gray-100 text-gray-700 hover:text-primary"
                >
                  <td className="px-4 py-2 text-center">{row["SL NO"]}</td>
                  <td className="px-4 py-2 text-center">
                    {row["QUALIFICATION NAME"]}
                  </td>
                  <td className="p-4 text-center">{row["SECTOR"]}</td>
                  <td className="p-4 text-center">{row["NSQF LEVEL"]}</td>
                  <td className="p-4 text-center">{row["APPROVED IN NSQC"]}</td>
                  <td className="p-4 text-center">
                    <a
                      href={row["Q-FILE"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500"
                    >
                      View PDF
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </section>
  );
};

export default Qualification;