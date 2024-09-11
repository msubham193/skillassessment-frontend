/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { assessmentAgencyIdState } from "../Atoms/AssessmentAgencyAtoms";
import { server } from "@/main";
import { toast } from "react-toastify";
import { Loader } from "lucide-react";

const BankDetailsForm = () => {
  const [formData, setFormData] = useState({
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountHolderName: "",
    branchName: "",
    bankAddress: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccessMessage, setFormSuccessMessage] = useState("");
  const [ifscError, setIfscError] = useState(""); // For IFSC validation error
  const assessmentAgencyId = useRecoilState(assessmentAgencyIdState);

  const fetchBankDetails = async (ifscCode) => {
    try {
      const response = await axios.get(`https://ifsc.razorpay.com/${ifscCode}`);
      setFormData({
        ...formData,
        bankName: response.data.BANK,
        branchName: response.data.BRANCH,
      });
      setIfscError(""); // Clear error if successful
    } catch (error) {
      console.error("Error fetching bank details:", error);
      setIfscError("Invalid IFSC code. Please check and try again."); // Set error message if invalid IFSC code
    }
  };

  useEffect(() => {
    if (formData.ifscCode.length === 11) {
      fetchBankDetails(formData.ifscCode);
    }
  }, [formData.ifscCode]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { accountNumber, ifscCode, accountHolderName } = formData;
    const accountNumberRegex = /^[0-9]{9,18}$/;

    if (!accountNumberRegex.test(accountNumber)) {
      setFormError("Invalid account number. It should be between 9-18 digits.");
      return false;
    }
    if (ifscCode.length !== 11) {
      setFormError("Invalid IFSC code. It must be 11 characters long.");
      return false;
    }
    if (!accountHolderName) {
      setFormError("Account holder name is required.");
      return false;
    }
    if (ifscError) {
      setFormError(ifscError); // Prevent submission if IFSC error exists
      return false;
    }
    setFormError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try { 
      const response = await axios.put(
        `${server}/aa/bdt/${assessmentAgencyId[0]}`,
        formData
      );
      toast.success(response.data.message, {
        position: "bottom-right",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      setFormSuccessMessage("Bank details have already been set. If you want to change, you can update the details.");
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to submit bank details.", {
        position: "bottom-right",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSubmitted ? "Update Bank Details" : "Add Bank Details"}
        </h2>
        {formError && <p className="text-red-500 mb-4">{formError}</p>}
        <div className="mb-4">
          <label className="block text-gray-700">Account Number</label>
          <input
            type="text"
            name="accountNumber"
            value={formData.accountNumber}
            onChange={handleChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">IFSC Code</label>
          <input
            type="text"
            name="ifscCode"
            value={formData.ifscCode}
            onChange={handleChange}
            className={`w-full p-2 mt-2 border ${ifscError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 ${ifscError ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
            required
          />
          {ifscError && <p className="text-red-500 mt-2">{ifscError}</p>} {/* IFSC error message */}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Bank Name</label>
          <input
            type="text"
            name="bankName"
            value={formData.bankName}
            onChange={handleChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Branch Name</label>
          <input
            type="text"
            name="branchName"
            value={formData.branchName}
            onChange={handleChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Account Holder Name</label>
          <input
            type="text"
            name="accountHolderName"
            value={formData.accountHolderName}
            onChange={handleChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Bank Address</label>
          <input
            type="text"
            name="bankAddress"
            value={formData.bankAddress}
            onChange={handleChange}
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-center"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <Loader/>
          ) : (
            "Submit"
          )}
        </button>
        {isSubmitted && (
          <p className="mt-4 text-green-500">
            {formSuccessMessage}
          </p>
        )}
      </form>

      {/* Loader styles */}
     
    </div>
  );
};

export default BankDetailsForm;
