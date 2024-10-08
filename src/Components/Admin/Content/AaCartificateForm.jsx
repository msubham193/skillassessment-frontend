import React, { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button } from '@/components(shadcn)/ui/button';
import { Label } from '@/components(shadcn)/ui/label';
import { Input } from '@/components(shadcn)/ui/input';
import Aacertificate from './Aacertificate';

const AaCertificateForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    profilePic: null,
    state: "",
    district: "",
    dob: "",
    enrollmentNo: "",
    qualification: "",
    durationFrom: "",
    durationTo: "",
    earned: "",
    nsqfLevel: "",
    trainingCenterName: "",
    certificateNo: "",
    percentage: "",
    dateOfIssue: "",
    placeOfIssue: ""
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const certificateRef = useRef();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);
  };

  const handlePrint = useReactToPrint({
    content: () => certificateRef.current,
  });

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-md">
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="fatherName">Father Name</Label>
          <Input
            id="fatherName"
            name="fatherName"
            type="text"
            value={formData.fatherName}
            onChange={handleChange}
            className="mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="profilePic">Profile Picture</Label>
          <Input
            id="profilePic"
            name="profilePic"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            name="state"
            type="text"
            value={formData.state}
            onChange={handleChange}
            className="mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="district">District</Label>
          <Input
            id="district"
            name="district"
            type="text"
            value={formData.district}
            onChange={handleChange}
            className="mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="dob">Date of Birth</Label>
          <Input
            id="dob"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            className="mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="enrollmentNo">Enrollment No</Label>
          <Input
            id="enrollmentNo"
            name="enrollmentNo"
            type="text"
            value={formData.enrollmentNo}
            onChange={handleChange}
            className="mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="qualification">Qualification/Trade/Job role</Label>
          <Input
            id="qualification"
            name="qualification"
            type="text"
            value={formData.qualification}
            onChange={handleChange}
            className="mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="durationFrom">Duration From</Label>
          <Input
            id="durationFrom"
            name="durationFrom"
            type="date"
            value={formData.durationFrom}
            onChange={handleChange}
            className="mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="durationTo">Duration To</Label>
          <Input
            id="durationTo"
            name="durationTo"
            type="date"
            value={formData.durationTo}
            onChange={handleChange}
            className="mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="earned">Total Mark Earned</Label>
          <Input
            id="earned"
            name="earned"
            type="text"
            value={formData.earned}
            onChange={handleChange}
            className="mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="nsqfLevel">NSQF Level</Label>
          <Input
            id="nsqfLevel"
            name="nsqfLevel"
            type="text"
            value={formData.nsqfLevel}
            onChange={handleChange}
            className="mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="trainingCenterName">Training Center Name</Label>
          <Input
            id="trainingCenterName"
            name="trainingCenterName"
            type="text"
            value={formData.trainingCenterName}
            onChange={handleChange}
            className="mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="certificateNo">Certificate No</Label>
          <Input
            id="certificateNo"
            name="certificateNo"
            type="text"
            value={formData.certificateNo}
            onChange={handleChange}
            className="mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="percentage">Earned Percentage (%)</Label>
          <Input
            id="percentage"
            name="percentage"
            type="text"
            value={formData.percentage}
            onChange={handleChange}
            className="mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="dateOfIssue">Date of Issue</Label>
          <Input
            id="dateOfIssue"
            name="dateOfIssue"
            type="date"
            value={formData.dateOfIssue}
            onChange={handleChange}
            className="mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="placeOfIssue">Place of Issue</Label>
          <Input
            id="placeOfIssue"
            name="placeOfIssue"
            type="text"
            value={formData.placeOfIssue}
            onChange={handleChange}
            className="mt-1 block w-full"
            required
          />
        </div>
      </form>

      <div className="mt-4 text-center">
        <Button type="submit" onClick={handleSubmit}>Generate Certificate</Button>
      </div>

      {isFormSubmitted && (
        <div className="mt-8">
          <div ref={certificateRef}>
            <Aacertificate data={formData} />
          </div>
          <div className="mt-4 text-center">
            <Button onClick={handlePrint}>Print Certificate</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AaCertificateForm;
