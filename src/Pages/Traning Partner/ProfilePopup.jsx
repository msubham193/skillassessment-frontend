import { Button } from '@/components(shadcn)/ui/button'
import { tpDataAtoms } from '@/Components/Traning Partner/Atoms/trainingPartnerData'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
const ProfilePopup = () => {
  const trainingPartner = useRecoilValue(tpDataAtoms);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/trainingPartner/signin");
  };

  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 flex flex-col justify-between space-y-6">
      <div className="flex flex-col justify-center items-center space-y-4">
        <div className="bg-gray-300 w-24 h-24 rounded-full flex items-center justify-center">
          {/* Placeholder for profile image */}
          <span className="text-gray-500 text-2xl">TP</span>
        </div>
        <div className="text-2xl font-semibold text-gray-800">
          {trainingPartner.name || 'Training Partner'}
        </div>
      </div>
      <hr className="border-gray-300" />
      <div className="flex flex-col space-y-2 text-gray-700">
        <span><strong>Email:</strong> {trainingPartner.registeredOfficeEmail || 'N/A'}</span>
        <span><strong>Organization:</strong> {trainingPartner.organizationName || 'N/A'}</span>
      </div>
      <div className="flex justify-center">
        <Button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700" onClick={handleLogout}>
          Log out
        </Button>
      </div>
    </div>
  );
};

export default ProfilePopup;
