import React, { useContext } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";

function AchievementsPreview() {
  const { resumeInfo } = useContext(ResumeInfoContext);

  return (
    <div className="my-3">
      {/* Heading */}
      <h2
        className="text-left font-bold text-md mb-2 uppercase tracking-wide"
        style={{
          color: resumeInfo?.themeColor || "gray-200",
        }}
      >
        Achievements
      </h2>

      {/* Horizontal Line */}
      <hr
        className="border-[1.5px] my-2"
        style={{
          borderColor: resumeInfo?.themeColor || "gray-200",
        }}
      />

      {/* Achievements */}
      <ul className="list-disc list-inside space-y-1 text-xs">
        {resumeInfo?.achievements &&
          resumeInfo?.achievements?.map((item, index) => (
            <li key={index}>{item?.achievements}</li>
          ))}
      </ul>
    </div>
  );
}

export default AchievementsPreview;
