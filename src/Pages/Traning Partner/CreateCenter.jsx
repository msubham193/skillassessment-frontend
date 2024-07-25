import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Label } from "@/components(shadcn)/ui/label";
import { Input } from "@/components(shadcn)/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components(shadcn)/ui/select";
import { Button } from "@/components(shadcn)/ui/button";
import { useRecoilState, useRecoilValue } from 'recoil';
import { sectorData } from '@/Components/Traning Partner/Atoms/sectorAtom';
import { tpDataAtoms } from '@/Components/Traning Partner/Atoms/trainingPartnerData';


export default function CreateCenter() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    state: '',
    PRN_NO: '',
    scheme: '',
    sanction_order_letter: null,
    centerId: '',
    projectId: '',
    sector: '',
    course: '',
    courseCode: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [courses, setCourses] = useState([]);
  const tp=useRecoilValue(tpDataAtoms)
  const sectors = tp.sector;
  
  const selectedSector = formData.sector;
  console.log("selected",selectedSector)

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSelectChange = (id, value) => {
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log('File selected:', file);
    setFormData(prevData => ({
      ...prevData,
      letter: file
    }));
  };

  const fetchCourses = async () => {
    if (!selectedSector) return;

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/sector?name=${selectedSector}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      setCourses(data.data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [selectedSector]);

  const handleCourseChange = (value) => {
    const selectedCourse = courses.find(course => course.courseName === value);
    setFormData(prevData => ({
      ...prevData,
      course: value,
      courseCode: selectedCourse ? selectedCourse.courseCode : ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        if (key === 'sanction_order_letter') {
          if (formData[key]) {
            console.log('Appending file:', formData[key].name);
            formDataToSend.append('sanction_order_letter', formData[key], formData[key].name);
          } else {
            console.log('No file selected');
          }
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }

      for (let pair of formDataToSend.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const response = await fetch('http://localhost:8000/api/v1/center', {
        method: 'POST',
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
        body: formDataToSend,
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
     

      if (data.success) {
        toast.success(data.message || 'Center created successfully!');
        navigate("/trainingPartner/dashboard");
      } else {
        throw new Error(data.message || 'Failed to create center');
      }
    } catch (error) {
      console.error('Error in handleSubmit:', error);
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        console.error('Network error: Unable to connect to the server. Please check your internet connection and ensure the server is running.');
        toast.error('Unable to connect to the server. Please check your internet connection and try again.');
      } else {
        toast.error(error.message || 'An error occurred while creating the center');
      }
    } finally {
      setIsLoading(false);
    }
  };
 console.log(formData)
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Create New Center</h1>
        <p className="text-muted-foreground">Fill out the form below to create a new center.</p>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Center Name</Label>
            <Input id="name" placeholder="Enter center name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State of Operation</Label>
            <Input id="state" placeholder="Enter state of operation" value={formData.state} onChange={handleInputChange} required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="PRN_NO">PRN No.</Label>
            <Input id="PRN_NO" placeholder="Enter PRN number" value={formData.PRN_NO} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="scheme">Scheme</Label>
            <Select id="scheme" value={formData.scheme} onValueChange={(value) => handleSelectChange('scheme', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select scheme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Government">government</SelectItem>
                <SelectItem value="State Government">State Government</SelectItem>
                <SelectItem value="Corporate">Corporate</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sanction_order_letter">Sanction Order Letter</Label>
          <Input id="sanction_order_letter" type="file" onChange={handleFileChange} required />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="centerId">Center ID</Label>
            <Input id="centerId" placeholder="Enter center ID" value={formData.centerId} onChange={handleInputChange} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="projectId">Project ID</Label>
            <Input id="projectId" placeholder="Enter project ID" value={formData.projectId} onChange={handleInputChange} required />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="sector">Sector</Label>
            <Select id="sector" value={formData.sector} onValueChange={(value) => handleSelectChange('sector', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select sector" />
              </SelectTrigger>
              <SelectContent>
                {sectors.map((sector) => (
                  <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="course">Course</Label>
            <Select id="course" value={formData.course} onValueChange={(value) => handleCourseChange(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course._id} value={course.courseName}>{course.courseName}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="courseCode">Course Code</Label>
            <Input id="courseCode" placeholder="Enter course code" value={formData.courseCode} readOnly />
          </div>
        </div>
        <Button type="submit" className="mt-4" disabled={isLoading}>
          {isLoading ? 'Creating...' : 'Create Center'}
        </Button>
      </form>
    </div>
  );
}
