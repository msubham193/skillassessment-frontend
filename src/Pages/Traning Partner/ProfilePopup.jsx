import React from "react";
import { useRecoilValue } from "recoil";
import { tpDataAtoms } from "@/Components/Traning Partner/Atoms/trainingPartnerData";
import { Button } from "@/components(shadcn)/ui/button";
import { Separator } from "@/components(shadcn)/ui/separator";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const ProfilePopup = () => {
  const trainingPartner = useRecoilValue(tpDataAtoms);
  const navigate = useNavigate();
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const displayValue = (value) =>
    value && value !== "0" ? value : "Not provided";

  return (
    <div className="fixed inset-0 overflow-y-auto bg-white">
      <Button
        onClick={() => navigate("/trainingPartner/dashboard")}
        className="mb-4 mt-4 ml-[20px] bg-gray-200 text-indigo-600 hover:bg-gray-300 py-2 px-4 rounded-md transition duration-300 ease-in-out"
      >
        Back to Dashboard
      </Button>
      <div className="relative max-w-4xl mx-auto px-4 md:px-6 py-8">
        <div className="grid gap-8">
          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <BuildingIcon className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold">Training Partner Profile</h1>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <InfoItem
                label="Organization Name"
                value={trainingPartner.organizationName}
              />
              <InfoItem
                label="Category"
                value={trainingPartner.organizationCategory}
              />
              <InfoItem
                label="Center ID"
                value={displayValue(trainingPartner.centerId)}
              />
              <InfoItem
                label="Training Partner Code"
                value={trainingPartner.tpCode}
              />
              <InfoItem label="Scheme" value={trainingPartner.scheme} />
              <InfoItem
                label="Affiliation"
                value={displayValue(trainingPartner.affiliation)}
              />
              <InfoItem
                label="Date of Incorporation"
                value={formatDate(trainingPartner.dateOfIncorporation)}
              />
              <InfoItem
                label="Application Status"
                value={trainingPartner.applicationStatus}
              />
            </div>
          </div>
          <Separator />
          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <LocateIcon className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold">Addresses</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="grid gap-1">
                <div className="text-sm font-medium text-muted-foreground">
                  Registered Office
                </div>
                <div>
                  {trainingPartner.registeredOfficeAddress},{" "}
                  {trainingPartner.registeredOfficeState},{" "}
                  {trainingPartner.registeredOfficeCity},{" "}
                  {trainingPartner.registeredOfficePin}
                </div>
              </div>
              <div className="grid gap-1">
                <div className="text-sm font-medium text-muted-foreground">
                  Regional State Office
                </div>
                <div>
                  {displayValue(trainingPartner.regionalStateOfficeAddress)}
                </div>
              </div>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <GlobeIcon className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold">Contact Information</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <InfoItem
                label="Website"
                value={trainingPartner.website}
                isLink
              />
              <InfoItem label="PAN" value={trainingPartner.headOwnerPanNo} />
              <InfoItem label="PRN" value={trainingPartner.prnNo} />
              <InfoItem
                label="Email"
                value={trainingPartner.registeredOfficeEmail}
              />
              <InfoItem
                label="Mobile"
                value={trainingPartner.registeredOfficeMobile}
              />
              <InfoItem
                label="Telephone"
                value={trainingPartner.registeredOfficeTelephone}
              />
            </div>
          </div>
          <Separator />
          <div className="grid gap-4">
            <div className="flex items-center gap-2">
              <UserIcon className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold">Head Owner Details</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <InfoItem label="Name" value={trainingPartner.headOwnerName} />
              <InfoItem label="Email" value={trainingPartner.headOwnerEmail} />
              <InfoItem
                label="Mobile"
                value={trainingPartner.headOwnerMobile}
              />
              <InfoItem
                label="Date of Birth"
                value={formatDate(trainingPartner.headOwnerDob)}
              />
              <InfoItem
                label="Qualification"
                value={trainingPartner.headOwnerQualification}
              />
              <InfoItem
                label="Work Experience"
                value={`${trainingPartner.headOwnerWorkExperience} years`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value, isLink = false }) => (
  <div className="grid gap-1">
    <div className="text-sm font-medium text-muted-foreground">{label}</div>
    {isLink ? (
      <a
        href={value.startsWith("http") ? value : `https://${value}`}
        className="text-blue-600 underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {value}
      </a>
    ) : (
      <div>{value}</div>
    )}
  </div>
);

function BuildingIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  );
}

function GlobeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

function LocateIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default ProfilePopup;
