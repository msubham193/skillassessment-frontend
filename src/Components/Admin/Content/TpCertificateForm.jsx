import { Input } from '@/components(shadcn)/ui/input';
import { Label } from '@/components(shadcn)/ui/label';
import React, { useState } from 'react'
import TpCertificate from './TpCertificate';
import { Button } from '@/components(shadcn)/ui/button';

const TpCertificateForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    ward: "",
    dob: "",
    trainerID: "",
    qualificationName: "",
    earned: "",
    nsqfLevel: "",
    duration: "",
    centerplace: "",
    District: "",
    State: "",
    placeOfIssue: "",
    dateOfIssue: "",
    assessorPic: null,
  });

  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

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

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow-lg rounded-md">
      <form onSubmit={handleSubmit}>
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
          <Label htmlFor="ward">Ward</Label>
          <Input
            id="ward"
            name="ward"
            type="text"
            value={formData.ward}
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
          <Label htmlFor="assessorID">Trainer ID</Label>
          <Input
            id="assessorID"
            name="assessorID"
            type="text"
            value={formData.trainerID}
            onChange={handleChange}
            className="mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="qualificationName">Qualification Name</Label>
          <Input
            id="qualificationName"
            name="qualificationName"
            type="text"
            value={formData.qualificationName}
            onChange={handleChange}
            className="mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="earned">Earned</Label>
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
          <Label htmlFor="duration">Duration</Label>
          <Input
            id="duration"
            name="duration"
            type="text"
            value={formData.duration}
            onChange={handleChange}
            className="mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="centerplace">Center Place</Label>
          <Input
            id="centerplace"
            name="centerplace"
            type="text"
            value={formData.centerplace}
            onChange={handleChange}
            className="mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="District">District</Label>
          <Input
            id="District"
            name="District"
            type="text"
            value={formData.District}
            onChange={handleChange}
            className="mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="State">State</Label>
          <Input
            id="State"
            name="State"
            type="text"
            value={formData.State}
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
          <Label htmlFor="assessorPic">Assessor Picture</Label>
          <Input
            id="assessorPic"
            name="assessorPic"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="mt-1 block w-full"
            required
          />
        </div>
      </form>
      <div className='mt-4'> <TpCertificate data={formData}/></div>
      <div className="mt-4 text-center">
          <Button type="submit">Generate Marksheet</Button>
        </div>
    </div>
  );
}

export default TpCertificateForm
