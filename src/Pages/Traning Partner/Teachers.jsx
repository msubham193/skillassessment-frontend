import React, { useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components(shadcn)/ui/dialog";
import { Button } from '@/components(shadcn)/ui/button';
import { toast } from 'react-toastify';

const Teachers = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const batchId = queryParams.get('batchId');
  console.log("Retrieved batchId:", batchId);

  const [trainers, setTrainers] = useState([]);

  const handleClick = async (trainer) => {
    delete trainer._id;
    console.log("this is the main data",trainer)
    try {
      const response = await fetch(`http://localhost:8000/api/v1/batch/addtrainer/${batchId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem('token'),
        },
        body: JSON.stringify(trainer),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Teacher added successfully:", data);
        toast.success("Teacher added successfully");
        navigate('/trainingPartner/dashboard');
      } else {
        console.error("Failed to add teacher:", data);
        toast.error(data.message || "Failed to add teacher");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to add teacher");
    }
  };

  const fetchTeachers = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/trainer", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data.data);
      setTrainers(data.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <h1 className="text-2xl font-bold">Teacher Display</h1>
      </header>
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted text-muted-foreground">
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Subject Expertise</th>
                <th className="py-3 px-4 text-right">Assign to Batch</th>
              </tr>
            </thead>
            <tbody>
              {trainers.map((trainer, index) => (
                <tr key={index} className="border-b border-muted/20">
                  <td className="py-4 px-4">{trainer.name}</td>
                  <td className="py-4 px-4">{trainer.certifiedIn}</td>
                  <td className="py-4 px-4 text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button onClick={() => handleClick(trainer)}>Assign</Button>
                      </DialogTrigger>
                    </Dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Teachers;

