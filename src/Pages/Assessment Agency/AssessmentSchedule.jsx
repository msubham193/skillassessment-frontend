/* eslint-disable no-unused-vars */
import React from "react";
import Card from "../../Components/Assessment Agency/ui/Card";
import ScheduleBox from "../../Components/Assessment Agency/ui/ScheduleBox";
import { assessmentAgencyNameState } from "../../Components/Assessment Agency/Atoms/AssessmentAgencyAtoms";
import { useRecoilValue } from "recoil";

const AssessmentSchedule = () => {
  const aaName = useRecoilValue(assessmentAgencyNameState);
  return (
    <div className="bg-gray-100 p-1">
      <h2 className="text-xl font-semibold">{aaName}</h2> 
      <Card />
      <ScheduleBox />
    </div>
  );
};

export default AssessmentSchedule;
