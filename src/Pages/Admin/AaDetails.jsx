import AaDetailsBox from "@/Components/Admin/AaDetailsBox";
import SideNav from "@/Components/Admin/SideNav";
import TopBar from "@/Components/Admin/TopBar";
import React from "react";
import { useParams } from "react-router-dom";
//in this component fetch by id of a poticular rewuest of the aa from the aanotifaction
const AaDetails = () => {
  const { id } = useParams();
  // console.log(id);
  return (
    <>
      <div className="min-h-screen bg-white text-black flex flex-col">
        {/*top Bar */}
        <TopBar />
        {/* side bar */}
        <div className="min-h-screen bg-white text-black flex">
          <SideNav />

          {/* main page */}
          <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Basic Info!
                </h2>
                <p className="text-muted-foreground">
                  Here&apos;s is all detail's of the Assessment Agency!
                </p>
              </div>
              <div className="flex items-center space-x-2">
                {/* add the functionality like search and filter */}
                {/* For now  there is nothing to add in fecture if there some data  thenn we will put there  */}
              </div>
            </div>
            {/* Derails of Traning Partner */}
            <AaDetailsBox id={id} data={Assessment_Agency}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default AaDetails;

export const Assessment_Agency ={
    agencyName:"Rakesh Pradhan",
    officeAddress: {
       city:"Nimapada",
      street:"puri",
      state:"Odisha",
      pin:752114,
      country:"INDIA"
    },
    password: "GUNGUN",
    applicationStatus: "Pending",
    communicationAddress: {
     city:"Nimapada",
      street:"puri",
      state:"Odisha",
      pin:752114,
      country:"INDIA"
     },
    subject: "Approve the letter",
    phoneNumber: "6372700872",
    availability:true,
    role: "AssesmentAgency",
    email:"rp5865442@gmail.com",
    websiteLink: "cutm.ac.in",
    headOfTheOrganization:"RAkesh Pradhan",
    SPOC_NAME:"centurion",
    SPOC_EMAIL:"centurion@gmail.com",
    SPOC_CONTACT_NO:"55666998833",
    legalStatusOfTheOrganization: "Avable",
    COMPANY_PAN_NO:"56TYG58",
    COMPANY_GST_NO:"33773276445",
    NO_OF_BRANCHES:"6",
    BRANCH_ADDRESS: {
       city:"Nimapada",
      dist:"puri",
      state:"Odisha",
      pin:752114
    },
    geographical_region:"near SandhaPur",
    state_Under_geographicalRegion:"INDIA",
    total_no_of_certified_Assessor: "5",
    LETTER_OF_NCVET:"this ia a letter",
  }