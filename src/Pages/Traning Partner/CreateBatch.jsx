import { Input } from '@/components(shadcn)/ui/input';
import { Label } from '@/components(shadcn)/ui/label';
import React, { useState } from 'react';
import { Popover,PopoverTrigger, PopoverContent } from '@/components(shadcn)/ui/popover';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { Button } from '@/components(shadcn)/ui/button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { batchDataAtoms } from '@/Components/Traning Partner/Atoms/batchatom';
import { Calendar } from '@/components(shadcn)/ui/calendar';
import { useRecoilValue } from 'recoil';
import { sectorData } from '@/Components/Traning Partner/Atoms/sectorAtom';
import { tpDataAtoms } from '@/Components/Traning Partner/Atoms/trainingPartnerData';
const CreateBatch = () => {
  const sector=useRecoilValue(tpDataAtoms);
  console.log("sectorData",sector)
  const navigate = useNavigate();
  const [batchInputs, setBatchInputs] = useState({ courseName: '', sectorName: '', trainingOrganization: '', scheme: '', state: '', startDate: null, endDate: null, ABN_Number: '' });
  const setBatchData = useSetRecoilState(batchDataAtoms);
  console.log(batchInputs)
  const handleDateChange = (date, name) => {
    setBatchInputs({ ...batchInputs, [name]: date });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBatchInputs({ ...batchInputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/v1/batch/create', {
        method: 'POST',
        headers: {
          'x-access-token': localStorage.getItem('token'),
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          courseName: batchInputs.courseName,
          sectorName: batchInputs.sectorName,
          trainingOrganization: batchInputs.trainingOrganization,
          scheme: batchInputs.scheme,
          state: batchInputs.state,
          startDate: batchInputs.startDate ? batchInputs.startDate.toISOString() : null,
          endDate: batchInputs.endDate ? batchInputs.endDate.toISOString() : null,
          ABN_Number: batchInputs.ABN_Number,
        }),
      });
       console.log(batchInputs)
      if (response.ok) {
        const data = await response.json();
        setBatchData(data.data);
        toast(`${data.data.name} Batch is Created Successfully`);
        navigate('/trainingPartner/dashboard');
      } else {
        const errorData = await response.json();
        toast("Failed to create batch");
        console.error('Failed to create batch:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 py-12 md:py-24">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Create New Batch</h1>
        <p className="text-muted-foreground">Fill out the form below to create a new training batch.</p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="course-name">Course Name</Label>
            <Input id="course-name" name="courseName" placeholder="Enter course name" value={batchInputs.courseName} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sector-name">Sector Name</Label>
            <Input id="sector-name" name="sectorName" placeholder="Enter sector name" value={sector.sec} onChange={handleInputChange} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="training-org">Training Organization</Label>
            <Input id="training-org" name="rainingOrganization" placeholder="Enter training organization" value={batchInputs.rainingOrganization} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="scheme">Scheme</Label>
            <Input id="scheme" name="scheme" placeholder="Enter scheme" value={batchInputs.scheme} onChange={handleInputChange} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="state">State</Label>
            <Input id="state" name="state" placeholder="Enter state" value={batchInputs.state} onChange={handleInputChange} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start font-normal">
                    {batchInputs.startDate ? batchInputs.startDate.toDateString() : 'Pick a date'}
                    <div className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={batchInputs.startDate}
                    onSelect={(date) => handleDateChange(date, 'startDate')}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start font-normal">
                    {batchInputs.endDate ? batchInputs.endDate.toDateString() : 'Pick a date'}
                    <div className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={batchInputs.endDate}
                    onSelect={(date) => handleDateChange(date, 'endDate')}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="abn">ABN Number</Label>
          <Input id="abn" name="ABN_Number" placeholder="Enter ABN number" value={batchInputs.ABN_Number} onChange={handleInputChange} />
        </div>
        <Button type="submit" className="w-full">
          Create Batch
        </Button>
      </form>
    </div>
  );
};


export default CreateBatch;
