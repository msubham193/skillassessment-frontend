import React, { useState } from 'react';
import ProfilePopup from '@/Pages/Traning Partner/ProfilePopup';
import { useRecoilValue } from 'recoil';
import { Search, CircleUserRound } from 'lucide-react';
import { tpDataAtoms } from './Atoms/trainingPartnerData';

const TopBar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const traingPartner = useRecoilValue(tpDataAtoms);

  const toggleProfilePopup = () => {
    setIsProfileOpen(!isProfileOpen);
    console.log("open");
  };

  return (
    <nav className="p-6 flex justify-between items-center relativeb bg-[#0C0C0C]">
      <div className="text-sm md:text-lg font-bold text-white">
        Training Partner Dashboard
      </div>
      <div className="flex items-center justify-end md:w-[70%]">
        <div className="relative">
          <input
            type="text"
            className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-blue-400"
            placeholder="Search"
          />
          <Search className="absolute left-3 top-2.5 text-gray-500" />
        </div>
      </div>
      <div className="relative ml-3">
        <CircleUserRound size={40} className="cursor-pointer text-white" onClick={toggleProfilePopup} />
        {isProfileOpen && (
          <div className="absolute right-0 mt-2">
            <ProfilePopup />
          </div>
        )}
      </div>
    </nav>
  );
};

export default TopBar;


