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
    IFSC_Code: "",
    accountHolderName: "",
    branchName: "",
    bankAddress: "",
  });

  const [isFetchingBankDetails, setIsFetchingBankDetails] = useState(false); // Loading state for fetching bank details
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccessMessage, setFormSuccessMessage] = useState("");
  const [ifscError, setIfscError] = useState(""); // For IFSC validation error
  const assessmentAgencyId = useRecoilState(assessmentAgencyIdState);

  const fetchBankDetails = async (IFSC_Code) => {
    setIsFetchingBankDetails(true);  // Start fetching (loading indicator)
    try {
      const response = await axios.get(`https://ifsc.razorpay.com/${IFSC_Code}`);
      setFormData({
        ...formData,
        bankName: response.data.BANK,
        branchName: response.data.BRANCH,
      });
      setIfscError(""); // Clear error if successful
    } catch (error) {
      console.error("Error fetching bank details:", error);
      setIfscError("Invalid IFSC code. Please check and try again."); // Set error message if invalid IFSC code
    } finally {
      setIsFetchingBankDetails(false); // Stop fetching (remove loading indicator)
    }
  };

  useEffect(() => {
    if (formData.IFSC_Code.length === 11) {
      fetchBankDetails(formData.IFSC_Code);
    }
  }, [formData.IFSC_Code]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to validate account number based on the bank
  const validateAccountNumber = (bankName, accountNumber) => {
    const patterns = {
     "State Bank of India": /^[0-9]{11}$/,       // SBI account numbers are typically 11 digits
      "HDFC Bank": /^[0-9]{14}$/,                 // HDFC account numbers are 14 digits
      "ICICI Bank": /^[0-9]{12}$/,                // ICICI account numbers are 12 digits
      "Axis Bank": /^[0-9]{15}$/,                 // Axis Bank account numbers are 15 digits
      "Punjab National Bank": /^[0-9]{13,16}$/,      // PNB account numbers are usually 16 digits
      "Bank of Baroda": /^[0-9]{14}$/,            // Bank of Baroda account numbers are typically 14 digits
      "Canara Bank": /^[0-9]{13}$/,               // Canara Bank account numbers are 13 digits
      "Union Bank of India": /^[0-9]{12}$/,       // Union Bank account numbers are 12 digits
      "Kotak Mahindra Bank": /^[0-9]{14}$/,       // Kotak account numbers are 14 digits
      "IndusInd Bank": /^[0-9]{13,14}$/,          // IndusInd account numbers are either 13 or 14 digits
      "Yes Bank": /^[0-9]{15}$/,                  // Yes Bank account numbers are 15 digits
      "IDFC First Bank": /^[0-9]{11,14}$/,        // IDFC First Bank account numbers are typically between 11 to 14 digits
      "Bank of India": /^[0-9]{15}$/,             // Bank of India account numbers are 15 digits
      "Indian Bank": /^[0-9]{9,17}$/,             // Indian Bank account numbers can vary between 9 and 17 digits
      "Central Bank of India": /^[0-9]{10,16}$/,  // Central Bank account numbers are between 10 and 16 digits
      "UCO Bank": /^[0-9]{14}$/,                  // UCO Bank account numbers are 14 digits
      "IDBI Bank": /^[0-9]{13}$/,                 // IDBI Bank account numbers are 13 digits
      "Federal Bank": /^[0-9]{14}$/,              // Federal Bank account numbers are 14 digits
      "South Indian Bank": /^[0-9]{16}$/,         // South Indian Bank account numbers are 16 digits
      "Indian Overseas Bank": /^[0-9]{15}$/,      // Indian Overseas Bank account numbers are 15 digits
      "Syndicate Bank": /^[0-9]{9}$/,             // Syndicate Bank account numbers are 9 digits
      "Allahabad Bank": /^[0-9]{11}$/,            // Allahabad Bank account numbers are 11 digits
      "Corporation Bank": /^[0-9]{15}$/,          // Corporation Bank account numbers are 15 digits
      "Vijaya Bank": /^[0-9]{15}$/,               // Vijaya Bank account numbers are 15 digits
      "Airtel Payments Bank": /^[0-9]{9}$/, 
    };

    const regex = patterns[bankName];

    if (regex && !regex.test(accountNumber)) {
      return `Invalid account number for ${bankName}. Please check the format.`;
    }
    return "";  // Return an empty string if valid
  };

  const validateForm = () => {
    const { accountNumber, IFSC_Code, accountHolderName, bankName } = formData;

    // Validate account number format based on the bank name
    const accountNumberError = validateAccountNumber(bankName, accountNumber);
    if (accountNumberError) {
      toast.error(accountNumberError, {
        position: "bottom-right",
        closeOnClick: true,
        draggable: true,
        theme: "colored",
      });
      setFormError(accountNumberError);
      return false;
    }

    const accountNumberRegex = /^[0-9]{9,18}$/;
    if (!accountNumberRegex.test(accountNumber)) {
      setFormError("Invalid account number. It should be between 9-18 digits.");
      return false;
    }
    if (IFSC_Code.length !== 11) {
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
    setIsSubmitting(true);
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }
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
          <label className="block text-gray-700">IFSC Code</label>
          <input
            type="text"
            name="IFSC_Code"
            value={formData.IFSC_Code}
            onChange={handleChange}
            className={`w-full p-2 mt-2 border ${ifscError ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 ${ifscError ? 'focus:ring-red-500' : 'focus:ring-blue-500'}`}
            required
          />
          {ifscError && <p className="text-red-500 mt-2">{ifscError}</p>}
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
          {isFetchingBankDetails && <Loader className="inline-block ml-2 text-green-600" />} 
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
          {isFetchingBankDetails && <Loader className="inline-block ml-2 text-green-600" />}
        </div>
        
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
          {isSubmitting ?  <Loader 
            style={{
              animation: "spin 2s linear infinite",
              '@keyframes spin': {
                '0%': { transform: 'rotate(0deg)' },
                '100%': { transform: 'rotate(360deg)' },
              }
            }} 
          /> : "Submit"}
        </button>

        {isSubmitted && (
          <p className="mt-4 text-green-500">
            {formSuccessMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default BankDetailsForm;
