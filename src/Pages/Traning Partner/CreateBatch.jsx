import { Input } from '@/components(shadcn)/ui/input';
import { Label } from '@/components(shadcn)/ui/label';
import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { Button } from '@/components(shadcn)/ui/button';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { batchDataAtoms } from '@/Components/Traning Partner/Atoms/batchatom';
const CreateBatch = () => {
  const navigate=useNavigate()
  const [batchInputs, setBatchInputs] = useState({ name: '', startDate: null, endDate: null });
  const setBatchData = useSetRecoilState(batchDataAtoms);

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
          name: batchInputs.name,
          startDate: batchInputs.startDate ? batchInputs.startDate.toISOString() : null,
          endDate: batchInputs.endDate ? batchInputs.endDate.toISOString() : null,
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setBatchData(data.data)
        toast(`${data.data.name} Batch is Created Sucessfully `)
        navigate('/trainingPartner/dashboard')
      } else {
        const errorData = await response.json();
        toast("Failed to create batch")
        console.error('Failed to create batch:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="h-screen bg-slate-200 flex justify-center items-center">
      <div className="w-[400px] h-[400px] p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 p-8 bg-slate-400 rounded-lg">
          <Label htmlFor="batchName">Batch Name</Label>
          <Input
            id="batchName"
            name="name"
            type="text"
            value={batchInputs.name}
            onChange={handleInputChange}
          />

          <Label htmlFor="startDate">Start Date</Label>
          <div className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full">
            <DatePicker
              className="w-full"
              value={batchInputs.startDate}
              onChange={(date) => handleDateChange(date, 'startDate')}
            />
          </div>

          <Label htmlFor="endDate">End Date</Label>
          <div className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 w-full">
            <DatePicker
              className="w-full"
              value={batchInputs.endDate}
              onChange={(date) => handleDateChange(date, 'endDate')}
            />
          </div>
          <div className='flex justify-center items-center p-4'>
            <Button type="submit">Create Batch</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBatch;
