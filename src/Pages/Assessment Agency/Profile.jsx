/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaAddressCard,
  FaBook,
  FaBuilding,
  FaCheck,
  FaCheckCircle,
  FaEnvelope,
  FaEnvelopeOpenText,
  FaEnvelopeSquare,
  FaFileAlt,
  FaGavel,
  FaGlobe,
  FaIdBadge,
  FaIdCard,
  FaIndustry,
  FaMapMarkedAlt,
  FaNetworkWired,
  FaPhone,
  FaPhoneSquare,
  FaUserCircle,
  FaUsers,
  FaUserTie,
} from "react-icons/fa";
import { useRecoilState } from "recoil";
import { assessmentAgencyIdState } from "../../Components/Assessment Agency/Atoms/AssessmentAgencyAtoms";
import { useNavigate } from "react-router-dom";
import { server } from "@/main";
import { Banknote, Building2, CreditCard, Hash, MapPin } from "lucide-react";
import { Button } from "@/components(shadcn)/ui/button";

const Profile = () => {
  const [assessmentAgencyId] = useRecoilState(assessmentAgencyIdState);
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${server}/aa/${assessmentAgencyId}`);
        console.log(response.data.data);
        setProfileData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [assessmentAgencyId]);

  if (!profileData) {
    return <div>Loading...</div>;
  }

  const handleClick = () => {
    navigate("/dashboard/bankdetails");
  };

  return (
    <div className="flex flex-col p-6 min-h-[100vh]">
      <header className="bg-white rounded-lg shadow-md py-6 px-6 md:px-6">
        <div className="container max-w-5xl flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              <FaBuilding className="inline-block mr-2" />
              {profileData.agencyName}
            </h1>
            <p className="text-lg text-muted-foreground">
              Providing high-quality assessment services for organizations.
            </p>
          </div>
          <div>
            <img
              src={profileData?.logo}
              width={120}
              height={60}
              alt="Agency Logo "
              className="rounded-md "
            />
          </div>
        </div>
      </header>
      <main className="flex-1 p-6 mt-4 rounded-lg shadow-md bg-white">
        <div className="container max-w-5xl space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4">General Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="font-medium">
                  <FaBuilding className="inline-block mr-2" />
                  Agency Name
                </p>
                <p>{profileData.agencyName}</p>
              </div>
              <div>
                <p className="font-medium">
                  <FaGavel className="inline-block mr-2" />
                  Legal Status
                </p>
                <p>{profileData.legalStatusOfTheOrganization}</p>
              </div>
              <div>
                <p className="font-medium">
                  <FaUserTie className="inline-block mr-2" />
                  Head of the Organization
                </p>
                <p>{profileData.headOfTheOrganization}</p>
              </div>
              <div>
                <p className="font-medium">
                  <FaGlobe className="inline-block mr-2" />
                  Geographical Region
                </p>
                <p>{profileData.geographical_region}</p>
              </div>
              <div>
                <p className="font-medium">
                  <FaMapMarkedAlt className="inline-block mr-2" />
                  State Under Geographical Region
                </p>
                <p>{profileData.state_Under_geographicalRegion}</p>
              </div>
              <div>
                <p className="font-medium">
                  <FaNetworkWired className="inline-block mr-2" />
                  Number of Branches
                </p>
                <p>{profileData.NO_OF_BRANCHES}</p>
              </div>
              <div>
                <p className="font-medium">
                  <FaUsers className="inline-block mr-2" />
                  Total Number of Certified Assessors
                </p>
                <p>{profileData.total_no_of_certified_Assessor}</p>
              </div>
              <div>
                <p className="font-medium">
                  <FaCheckCircle className="inline-block mr-2" />
                  Availability
                </p>
                <p>{profileData.availability ? "True" : "False"}</p>
              </div>
            </div>
          </section>
          {/* section for bank  details */}
          <section>
            <h2 className="text-2xl font-bold mb-4">Bank Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="font-medium">
                  <Banknote className="inline-block mr-2" />
                  Bank Name
                </p>
                <p>{profileData?.BankName || "N/A"}</p>
              </div>
              <div>
                <p className="font-medium">
                  <Building2 className="inline-block mr-2" />
                  Branch Name
                </p>
                <p>{profileData?.BranchName || "N/A"}</p>
              </div>
              <div>
                <p className="font-medium">
                  <CreditCard className="inline-block mr-2" />
                  Account Number
                </p>
                <p>{profileData?.AccountNumber || "N/A"}</p>
              </div>
              <div>
                <p className="font-medium">
                  <Hash className="inline-block mr-2" />
                  IFSC Code
                </p>
                <p>{profileData?.IFSC_Code || "N/A"}</p>
              </div>
              <div>
                <p className="font-medium">
                  <MapPin className="inline-block mr-2" />
                  Branch Address
                </p>
                <p>{profileData?.BRANCH_ADDRESS || "N/A"}</p>
              </div>
              <div>
                <Button onClick={handleClick}>
                  {profileData?.AccountNumber
                    ? "Update Bank Details"
                    : "Fillup Bank Details"}
                </Button>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="font-medium">
                  <FaAddressCard className="inline-block mr-2" />
                  Branch Address
                </p>
                <p>{profileData.BRANCH_ADDRESS}</p>
              </div>
              <div>
                <p className="font-medium">
                  <FaEnvelopeOpenText className="inline-block mr-2" />
                  Communication Address
                </p>
                <p>{profileData.communicationAddress}</p>
              </div>
              <div>
                <p className="font-medium">
                  <FaBuilding className="inline-block mr-2" /> Office Address
                </p>
                <p>{profileData.officeAddress}</p>
              </div>
              <div>
                <p className="font-medium">
                  <FaUserCircle className="inline-block mr-2" />
                  SPOC Name
                </p>
                <p>{profileData.SPOC_NAME}</p>
              </div>
              <div>
                <p className="font-medium">
                  <FaPhone className="inline-block mr-2" />
                  SPOC Contact Number
                </p>
                <p>{profileData.SPOC_CONTACT_NO}</p>
              </div>
              <div>
                <p className="font-medium">
                  <FaEnvelope className="inline-block mr-2" />
                  SPOC Email
                </p>
                <p>{profileData.SPOC_EMAIL}</p>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">
              Certification Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="font-medium">
                  <FaIdCard className="inline-block mr-2" />
                  Company GST Number
                </p>
                <p>{profileData.COMPANY_GST_NO}</p>
              </div>
              <div>
                <p className="font-medium">
                  <FaIdBadge className="inline-block mr-2" />
                  Company PAN Number
                </p>
                <p>{profileData.COMPANY_PAN_NO}</p>
              </div>
              <div>
                <p className="font-medium">
                  <FaFileAlt className="inline-block mr-2" />
                  Letter of NCVET
                </p>

                {profileData.LETTER_OF_NCVET ? (
                  <a
                    href={profileData.LETTER_OF_NCVET}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-blue-500 hover:underline" 
                  >
                    Letter Of NCVET
                  </a>
                ) : (
                  <p>No letter available</p>
                )}
              </div>
              <div>
                <p className="font-medium">
                  <FaBook className="inline-block mr-2" />
                  Courses Offered
                </p>
                <ul className="list-disc pl-4">
                  {profileData.courses.map((course, index) => (
                    <li key={index}>{course}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-medium">
                  <FaCheck className="inline-block mr-2" />
                  Application Status
                </p>
                <p>{profileData.applicationStatus}</p>
              </div>
            </div>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">Additional Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="font-medium">
                  <FaPhoneSquare className="inline-block mr-2" />
                  Phone Number
                </p>
                <p>{profileData.phoneNumber}</p>
              </div>
              <div>
                <p className="font-medium">
                  <FaEnvelopeSquare className="inline-block mr-2" />
                  Email
                </p>
                <p>{profileData.email}</p>
              </div>
              <div>
                <p className="font-medium">
                  <FaIndustry className="inline-block mr-2" />
                  Sectors
                </p>
                <ul className="list-disc pl-4">
                  {profileData.sectors.map((sector, index) => (
                    <li key={index}>{sector}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
        <footer className="mt-10 px-1">
          <div className="container max-w-5xl text-xs text-muted-foreground">
            &copy; 2024 {profileData.agencyName}. All rights reserved.
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Profile;
