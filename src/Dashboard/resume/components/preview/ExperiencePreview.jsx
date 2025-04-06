import React from "react";

// Helper function to format date as "DD Month YYYY"
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

function ExperiencePreview({ resumeInfo }) {
  return (
    <div className="my-3 w-full max-w-[794px] mx-auto">
      {/* Heading */}
      <h2
        className="text-left font-bold text-md mb-2 uppercase tracking-wide"
        style={{
          color: resumeInfo?.themeColor || "gray-200",
        }}
      >
        Experience
      </h2>

      {/* Horizontal Line */}
      <hr
        className="border-[1.5px] my-2"
        style={{
          borderColor: resumeInfo?.themeColor || "gray-200",
        }}
      />

      {/* Experiences */}
      {(resumeInfo?.experience || []).map((experience, index) => (
        <div key={index}>
          {/* Title */}
          <h2
            className="text-sm font-bold"
            style={{
              color: resumeInfo?.themeColor || "gray-200",
            }}
          >
            {experience?.title}
          </h2>

          {/* Company Name , Experience , Dates */}
          <h2 className="text-xs flex justify-between flex-wrap gap-1">
            <span>
              {experience?.companyName}, {experience?.city}, {experience?.state}
            </span>
            <span>
              {formatDate(experience?.startDate)}{" "}
              {experience?.currentlyWorking
                ? "- Present"
                : "- " + formatDate(experience?.endDate)}
            </span>
          </h2>

          {/* Bullet Points */}
          {experience?.workSummary && (
            <div
              className="text-xs my-2 list-disc list-inside space-y-1"
              dangerouslySetInnerHTML={{ __html: experience.workSummary }}
            />
          )}
        </div>
      ))}

      {/* Fallback message when no experience */}
      {(!resumeInfo?.experience || resumeInfo.experience.length === 0) && (
        <p className="text-xs italic text-gray-500 mt-2">
          No experience added yet.
        </p>
      )}
    </div>
  );
}

export default ExperiencePreview;
