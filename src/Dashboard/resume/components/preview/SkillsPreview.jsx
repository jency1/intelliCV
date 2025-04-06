import React from "react";

function SkillsPreview({ resumeInfo }) {
  const skills = resumeInfo?.skills || [];

  // Convert skill objects to strings (updated to support { skills: "React" } structure)
  const formattedSkills = skills.map((skill) =>
    typeof skill === "string"
      ? skill
      : typeof skill === "object" && skill !== null
      ? skill.skills || ""
      : ""
  );

  return (
    <div className="my-3 w-full max-w-[794px] mx-auto">
      {/* Heading */}
      <h2
        className="text-left font-bold text-md mb-2 uppercase tracking-wide"
        style={{
          color: resumeInfo?.themeColor || "gray-200",
        }}
      >
        Skills
      </h2>

      {/* Horizontal Line */}
      <hr
        className="border-[1.5px] my-2"
        style={{
          borderColor: resumeInfo?.themeColor || "gray-200",
        }}
      />

      {/* Skills List */}
      <div className="text-sm">
        <p className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
          {formattedSkills.length > 0 &&
          formattedSkills.some((skill) => skill.trim())
            ? formattedSkills.join(", ")
            : "No skills added"}
        </p>
      </div>
    </div>
  );
}

export default SkillsPreview;

// -----------------------------------------------

// import React from "react";

// function SkillsPreview({ resumeInfo }) {
//   const skillsByCategory = resumeInfo?.skillsByCategory || [];

//   return (
//     <div className="my-6 w-full max-w-[794px] mx-auto">
//       {/* Heading */}
//       <h2
//         className="text-left font-bold text-md mb-2"
//         style={{
//           color: resumeInfo?.themeColor || "gray-200",
//         }}
//       >
//         Skills
//       </h2>

//       {/* Horizontal Line */}
//       <hr
//         className="border-[1.5px] my-2"
//         style={{
//           borderColor: resumeInfo?.themeColor || "gray-200",
//         }}
//       />

//       {/* Skills by category */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 text-sm">
//         {skillsByCategory.map((categoryObj, index) => (
//           <div key={index}>
//             {/* Category Title */}
//             <h3
//               className="font-semibold"
//               style={{ color: resumeInfo?.themeColor || "gray-200" }}
//             >
//               {categoryObj.title}
//             </h3>

//             {/* Skills List */}
//             <p className="text-xs">
//               {categoryObj.skills.length > 0
//                 ? categoryObj.skills.join(", ")
//                 : "No skills added"}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default SkillsPreview;
