import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components(shadcn)/ui/table";
import { Button } from '@/components(shadcn)/ui/button';
import { Checkbox } from "@/components(shadcn)/ui/checkbox";
import { Input } from "@/components(shadcn)/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components(shadcn)/ui/select";
import { server } from '@/main';

const Teachers = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const batchIds = queryParams.getAll('batchId');
 console.log("id",batchIds)
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainers, setSelectedTrainers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");
  const tpid = localStorage.getItem("trainingPartnerId");

    const handleAssign = async () => {
      try {
          const response = await fetch(`${server}/batch/bulkaddTrainer/${batchIds}`, {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
                  "x-access-token": localStorage.getItem('token'),
              },
              body: JSON.stringify({ trainerIds: selectedTrainers }), 
          });
  
          const data = await response.json();
          if (response.ok) {
              toast.success("Teachers assigned successfully");
              navigate('/trainingPartner/dashboard');
          } else {
              toast.error(data.message || "Failed to assign teachers");
          }
      } catch (error) {
          console.error("Error:", error);
          toast.error("Failed to assign teachers");
      }
  };



  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch(`${server}/trainer/tp/${tpid}`, { method: "GET" });
        if (response.ok) {
          const data = await response.json();
          console.log(data.data);
          setTrainers(data.data.map(trainer => ({
            ...trainer,
            isSelected: false
          })));
        } else {
          console.error("Failed to fetch teachers");
          setTrainers([]);
        }
      } catch (error) {
        console.error("Error:", error);
        setTrainers([]);
      }
    };

    fetchTeachers();
  }, [tpid]);

  const handleCheckboxChange = (trainerId) => {
    setTrainers(prevTrainers => prevTrainers.map(trainer => 
      trainer._id === trainerId ? { ...trainer, isSelected: !trainer.isSelected } : trainer
    ));

    setSelectedTrainers(prevSelected => 
      prevSelected.includes(trainerId)
        ? prevSelected.filter(id => id !== trainerId)
        : [...prevSelected, trainerId]
    );
  };

  const filteredTrainers = trainers.filter(trainer => 
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterSubject === "all" || trainer.certifiedIn.toLowerCase().includes(filterSubject.toLowerCase()))
  );


  console.log(selectedTrainers);
  return (
    <div className="w-full min-h-screen bg-background text-foreground">
      <header className="bg-primary text-primary-foreground py-4 px-6">
        <h1 className="text-2xl font-bold">Trainers Bulk Assign</h1>
      </header>
      <main className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex gap-4 mb-4">
          <Input
            placeholder="Search trainers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Select value={filterSubject} onValueChange={setFilterSubject}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Subjects</SelectItem>
              <SelectItem value="math">Math</SelectItem>
              <SelectItem value="science">Science</SelectItem>
              {/* Add more subjects as needed */}
            </SelectContent>
          </Select>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Select</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Subject Expertise</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTrainers.map((trainer) => (
              <TableRow key={trainer._id}>
                <TableCell>
                  <Checkbox
                    checked={trainer.isSelected}
                    onCheckedChange={() => handleCheckboxChange(trainer._id)}
                  />
                </TableCell>
                <TableCell>{trainer.name}</TableCell>
                <TableCell>{trainer.certifiedIn}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4">
          <Button onClick={handleAssign} disabled={selectedTrainers.length === 0}>
            Assign Selected Trainers
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Teachers;
