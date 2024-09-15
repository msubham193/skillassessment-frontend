import React, { useEffect, useState } from 'react';
import { useNavigate, useNavigation, useParams } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components(shadcn)/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components(shadcn)/ui/avatar";
import { Badge } from "@/components(shadcn)/ui/badge";
import { Button } from '@/components(shadcn)/ui/button';
import { useRecoilValue } from 'recoil';
import { batchIdAtoms } from '../Atoms/BatchId';
import { server } from '@/main';
useNavigation
// TrainerDetails component
const TrainerDetails = () => {
    const {teacherId}=useParams()
    const navigate=useNavigate()
  const [trainer, setTrainer] = useState(null); // State to store trainer data
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [isError, setIsError] = useState(false); // Error state
  const batchId=useRecoilValue(batchIdAtoms)
  // Fetching trainer details using the normal fetch API
  useEffect(() => {
    const fetchTrainerDetails = async () => {
      try {
        // Fetch data from the API using the trainer ID
        const response = await fetch(`${server}/trainer/${teacherId}`);
        
        // Check if the response is okay, otherwise throw an error
        if (!response.ok) {
          throw new Error('Failed to fetch trainer details');
        }

        // Parse the JSON data from the response
        const data = await response.json();
        
        // Update the trainer state with the fetched data
        setTrainer(data.data);
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching trainer details:', error);
        setIsError(true); // Set error state to true in case of an error
        setIsLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchTrainerDetails(); // Invoke the fetch function on component mount
  }, [teacherId]); // Dependency array includes 'id' to re-fetch if it changes

  // Display a loading message while data is being fetched
  if (isLoading) return <div>Loading...</div>;

  // Display an error message if there was an error fetching data
  if (isError) return <div>Error fetching trainer details</div>;

  // Render the trainer details using the fetched data
  return (
    <div className="container mx-auto p-4">
        <Button onClick={()=>navigate(`/trainingPartner/viewBatch/${batchId}`)}>Back to trainers</Button>
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader className="flex flex-row items-center space-x-4 pb-2">
          <Avatar className="w-20 h-20">
            <AvatarImage src={trainer.profilePic} alt={trainer.name} />
            <AvatarFallback>{trainer.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl font-bold">{trainer.name}</CardTitle>
            <p className="text-gray-500">{trainer.email}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <InfoItem label="Phone" value={trainer.phoneNumber} />
            <InfoItem label="PAN Card" value={trainer.PAN_CARD_NO} />
            <InfoItem label="Aadhar" value={trainer.AADHAR_NO} />
            <InfoItem label="PRN No" value={trainer.PRN_NO} />
            <InfoItem label="State" value={trainer.state} />
            <InfoItem label="City" value={trainer.city} />
            <InfoItem label="District" value={trainer.district} />
            <InfoItem label="Pincode" value={trainer.pincode} />
            <InfoItem label="Sector" value={trainer.sector} />
            <InfoItem label="Course Code" value={trainer.coursecode} />
            <InfoItem label="Certified In" value={trainer.certifiedIn} />
            <InfoItem 
              label="Industry Experience" 
              value={`${trainer.relevant_industryExperience} years`} 
            />
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Education Qualifications</h3>
            <div className="flex flex-wrap gap-2">
              {trainer.educationQualification_1 !== "0" && (
                <Badge variant="secondary">{trainer.educationQualification_1}</Badge>
              )}
              {trainer.educationQualification_2 !== "0" && (
                <Badge variant="secondary">{trainer.educationQualification_2}</Badge>
              )}
              {trainer.educationQualification_3 !== "0" && (
                <Badge variant="secondary">{trainer.educationQualification_3}</Badge>
              )}
              {trainer.educationQualification_4 !== "0" && (
                <Badge variant="secondary">{trainer.educationQualification_4}</Badge>
              )}
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">Certification</h3>
            <Badge variant="outline">{`${trainer.certification_course} course(s)`}</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Helper component to display label-value pairs
const InfoItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

export default TrainerDetails;
