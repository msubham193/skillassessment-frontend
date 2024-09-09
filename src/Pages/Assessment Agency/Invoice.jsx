import React, { useState } from "react";

const Invoice = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerateInvoice = async () => {
    if (!month || !year) {
      setError("Please select a month and enter a valid year");
      return;
    }

    const assessmentAgencyId = localStorage.getItem("assessmentAgencyId"); 

    if (!assessmentAgencyId) {
      setError("Assessment Agency ID not found in local storage.");
      return;
    }

    setError("");
    setLoading(true);
    setInvoiceData(null);

    try {
      const response = await fetch(
        "https://d31os5ub6ca4xs.cloudfront.net/api/v1/invoice/monthly/generate", 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ month, year, assessmentAgencyId }), 
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate invoice");
      }

      const data = await response.json();
      setInvoiceData(data);
    } catch (err) {
      setError("Error generating invoice. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetInvoice = async () => {
    if (!month || !year) {
      setError("Please select a month and enter a valid year");
      return;
    }

    const assessmentAgencyId = localStorage.getItem("assessmentAgencyId"); 

    if (!assessmentAgencyId) {
      setError("Assessment Agency ID not found in local storage.");
      return;
    }

    setError("");
    setLoading(true);
    setInvoiceData(null);

    try {
      const response = await fetch(
        `https://d31os5ub6ca4xs.cloudfront.net/api/v1/invoice/monthly/query?month=${month}&year=${year}`, 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ assesmentAgencyId: assessmentAgencyId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch the invoice");
      }

      const data = await response.json();
      setInvoiceData(data);
    } catch (err) {
      setError("Error fetching invoice. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Invoice Operations
        </h1>

 
        <div className="mb-4">
          <label className="block text-gray-600 mb-2">Select Month:</label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled>
              Select Month
            </option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-2">Enter Year:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="e.g. 2024"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          onClick={handleGetInvoice}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
        >
          Get Invoice
        </button>

        <hr className="my-6" />

       
        <button
          onClick={handleGenerateInvoice}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Generate Invoice of this month
        </button>

    
        {error && <p className="text-red-500 mt-4">{error}</p>}

       
        {loading && <p className="text-blue-500 mt-4">Loading...</p>}

        {invoiceData && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Invoice Details:</h2>
            <pre className="bg-gray-100 p-4 rounded">
              {JSON.stringify(invoiceData, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Invoice;
