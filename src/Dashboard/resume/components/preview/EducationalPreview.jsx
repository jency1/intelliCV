import React from "react";

// Format date as "DD MMMM YYYY"
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

function EducationalPreview({ resumeInfo }) {
  const educationList = resumeInfo?.education || [];

  return (
    <div className="my-3">
      {/* Heading */}
      <h2
        className="text-left font-bold text-md mb-2 uppercase tracking-wide"
        style={{
          color: resumeInfo?.themeColor || "gray-200",
        }}
      >
        Education
      </h2>

      {/* Horizontal Line */}
      <hr
        className="border-[1.5px] my-2"
        style={{
          borderColor: resumeInfo?.themeColor || "gray-200",
        }}
      />

      {/* Educations */}
      {educationList.length > 0 ? (
        educationList.map((education, index) => (
          <div key={index} className="my-2">
            {/* Education Name, Degree, Date */}
            <h2
              className="text-sm font-bold"
              style={{
                color: resumeInfo?.themeColor || "gray-200",
              }}
            >
              {education.universityName}
            </h2>
            <h2 className="text-xs flex justify-between">
              {education?.degree} in {education?.major}
              <span>
                {formatDate(education?.startDate)} -{" "}
                {formatDate(education?.endDate)}
              </span>
            </h2>

            {/* Education Summary (supports rich text) */}
            {education?.description && (
              <div
                className="text-xs my-1"
                dangerouslySetInnerHTML={{ __html: education.description }}
              />
            )}
          </div>
        ))
      ) : (
        <p className="text-xs italic text-gray-500 mt-2">
          No education data available.
        </p>
      )}
    </div>
  );
}

export default EducationalPreview;
