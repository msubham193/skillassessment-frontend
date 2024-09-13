import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components(shadcn)/ui/table";
import { Button } from '@/components(shadcn)/ui/button';
import { Checkbox } from "@/components(shadcn)/ui/checkbox";
import { Input } from "@/components(shadcn)/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components(shadcn)/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components(shadcn)/ui/card";
import { Badge } from "@/components(shadcn)/ui/badge";
import { Search } from 'lucide-react';
import { server } from '@/main';
import { Avatar, AvatarImage, AvatarFallback } from "@/components(shadcn)/ui/avatar";
const AddBulkTrainer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const batchIds = queryParams.getAll('batchId');
  const [trainers, setTrainers] = useState([]);
  const [selectedTrainers, setSelectedTrainers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");
  const tpid = localStorage.getItem("trainingPartnerId");

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetch(`${server}/trainer/tp/${tpid}`, { method: "GET" });
        if (response.ok) {
          const data = await response.json();
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
      toast.error(error.message);
    }
  };

  const filteredTrainers = trainers.filter(trainer =>
    trainer.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterSubject === "all" || trainer.certifiedIn.includes(filterSubject))
  );

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-primary text-primary-foreground py-6 px-6 shadow-md">
        <h1 className="text-3xl font-bold">Trainers Bulk Assign</h1>
      </header>
      <main className="container mx-auto py-8 px-4 md:px-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search and Filter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search trainers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Trainers</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">Select</TableHead>
                  <TableHead>Profile</TableHead>
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
                    <TableCell>
                      <Avatar>
                        <AvatarImage src={trainer.profilePic} alt={trainer.name} />
                        <AvatarFallback>{getInitials(trainer.name)}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-medium">{trainer.name}</TableCell>
                    <TableCell>
                      {trainer.certifiedIn.split(',').map((subject, index) => (
                        <Badge key={index} variant="secondary" className="mr-1 mb-1">
                          {subject.trim()}
                        </Badge>
                      ))}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-end">
          <Button 
            onClick={handleAssign} 
            disabled={selectedTrainers.length === 0}
            size="lg"
          >
            Assign Selected Trainers
          </Button>
        </div>
      </main>
    </div>
  );
};

export default AddBulkTrainer;

