import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext } from "react";
import PersonalDetailPreview from "./preview/PersonalDetailPreview";
import SummaryPreview from "./preview/SummaryPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import EducationalPreview from "./preview/EducationalPreview";
import SkillsPreview from "./preview/SkillsPreview";
import AchievementsPreview from "./preview/AchievementsPreview";

function ResumePreview() {
  const { resumeInfo } = useContext(ResumeInfoContext);

  return (
    <div className="flex justify-center w-full overflow-x-auto py-2 px-2">
      <div
        className="bg-white shadow-lg border-t-[3px] w-[700px] min-h-[842px] pt-4 pb-6 px-4 sm:px-10 text-sm sm:text-base"
        style={{
          borderColor: resumeInfo?.themeColor || "gray",
        }}
      >
        {/* Personal Details */}
        <PersonalDetailPreview resumeInfo={resumeInfo} />

        {/* Summary */}
        <SummaryPreview resumeInfo={resumeInfo} />

        {/* Professional Experience */}
        <ExperiencePreview resumeInfo={resumeInfo} />

        {/* Educational Details */}
        <EducationalPreview resumeInfo={resumeInfo} />

        {/* Skills */}
        <SkillsPreview resumeInfo={resumeInfo} />

        {/* Achievements */}
        <AchievementsPreview resumeInfo={resumeInfo} />
      </div>
    </div>
  );
}

export default ResumePreview;
