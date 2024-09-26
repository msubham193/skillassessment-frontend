import React from 'react';

const numberToWords = (num) => {
  const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
  const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

  const convertLessThanOneThousand = (n) => {
    if (n >= 100) {
      return ones[Math.floor(n / 100)] + ' Hundred ' + convertLessThanOneThousand(n % 100);
    }
    if (n >= 20) {
      return tens[Math.floor(n / 10)] + ' ' + ones[n % 10];
    }
    if (n >= 10) {
      return teens[n - 10];
    }
    return ones[n];
  };

  if (num === 0) return 'Zero';

  const inWords = [];
  const billion = Math.floor(num / 1000000000);
  const million = Math.floor((num % 1000000000) / 1000000);
  const thousand = Math.floor((num % 1000000) / 1000);
  const remainder = num % 1000;

  if (billion) inWords.push(convertLessThanOneThousand(billion) + ' Billion');
  if (million) inWords.push(convertLessThanOneThousand(million) + ' Million');
  if (thousand) inWords.push(convertLessThanOneThousand(thousand) + ' Thousand');
  if (remainder) inWords.push(convertLessThanOneThousand(remainder));

  return inWords.join(' ');
};

const BankReceipt = ({ 
  receivedFrom,
  batchNo,
  abnNo,
  projectName,
  amountReceived,
  fundReceivedBy,
  fundTransferDetails,
  transferDate
}) => {
  const amountInWords = numberToWords(parseInt(amountReceived, 10));

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white">
      <img src="/logo.png" alt="Centurion University Logo" className="mx-auto mb-4 w-24" />
      <h1 className="text-xl font-bold text-center mb-6">Centurion University of Technology and Management</h1>
      
      <h2 className="text-lg font-semibold text-center mb-6">Cash/ Bank Receipt</h2>
      
      <div className="space-y-4">
        <p>Received with thanks from <span className="font-semibold">{receivedFrom}</span></p>
        
        <p>Payment received towards batch No. <span className="font-semibold">{batchNo}</span> and ABN No. <span className="font-semibold">{abnNo}</span></p>
        
        <p>Under Project Name <span className="font-semibold">{projectName}</span></p>
        
        <p>Amount Received Rs. <span className="font-semibold">{amountReceived}/-</span></p>
        
        <p>Amount in words Rupees: <span className="font-semibold">{amountInWords} Only.</span></p>
        
        <p>Fund Received By: <span className="font-semibold">{fundReceivedBy}</span></p>
        
        <p>Fund Transfer Details/UTR: <span className="font-semibold">{fundTransferDetails}</span> Dated <span className="font-semibold">{transferDate}</span></p>
        
        <p>On account of Assessment fee of Centurion University of Technology and Management</p>
      </div>
      
      <div className="mt-12">
        <p>FOR CUTM</p>
        <div className="mt-16">
          <p>Authorised Signatory</p>
        </div>
      </div>
    </div>
  );
};

export default BankReceipt;