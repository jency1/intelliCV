import React from "react";

function PersonalDetailPreview({ resumeInfo }) {
  return (
    <div>
      {/* Name */}
      <h2
        className="font-bold text-xl text-center"
        style={{
          color: resumeInfo?.themeColor || "gray-200",
        }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>

      {/* Job Title */}
      <h2 className="font-medium text-sm text-center">
        {resumeInfo?.jobTitle}
      </h2>

      {/* Address */}
      <h2
        className="font-normal text-xs text-center"
        style={{
          color: resumeInfo?.themeColor || "gray-200",
        }}
      >
        {resumeInfo?.address}
      </h2>

      <div className="flex justify-between mt-3">
        {/* Contact No */}
        <h2
          className="font-normal text-xs"
          style={{
            color: resumeInfo?.themeColor || "gray-200",
          }}
        >
          {resumeInfo?.phone}
        </h2>

        {/* Email */}
        <h2
          className="font-normal text-xs"
          style={{
            color: resumeInfo?.themeColor || "gray-200",
          }}
        >
          {resumeInfo?.email}
        </h2>
      </div>

      {/* Horizontal Line */}
      <hr
        className="border-[1.5px] my-2"
        style={{
          borderColor: resumeInfo?.themeColor || "gray-200",
        }}
      />
    </div>
  );
}

export default PersonalDetailPreview;
