import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "./../../../../../service/GlobalApi";
import { toast } from "sonner";

function Skills({ enabledNext }) {
  const { resumeId } = useParams();
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  // Skills as a simple list
  const [skills, setSkills] = useState([""]);

  // Normalize skills array from context
  useEffect(() => {
    if (resumeInfo?.skills && Array.isArray(resumeInfo.skills)) {
      const normalizedSkills = resumeInfo.skills.map((skill) =>
        typeof skill === "string"
          ? skill
          : typeof skill === "object" && skill !== null
          ? skill.skills || ""
          : ""
      );
      setSkills(normalizedSkills.length > 0 ? normalizedSkills : [""]);
    }
  }, [resumeInfo?.skills]);

  // Handle skill input change
  const handleChange = (index, value) => {
    const updated = [...skills];
    updated[index] = value;
    setSkills(updated);

    // Update context immediately
    setResumeInfo((prev) => ({
      ...prev,
      skills: updated.map((s) => ({ skills: s })),
    }));
  };

  // Add new skill input
  const handleAddSkill = () => {
    const updated = [...skills, ""];
    setSkills(updated);

    setResumeInfo((prev) => ({
      ...prev,
      skills: updated.map((s) => ({ skills: s })),
    }));
  };

  // Remove last skill input
  const handleRemoveSkill = () => {
    if (skills.length > 1) {
      const updated = [...skills];
      updated.pop();
      setSkills(updated);

      setResumeInfo((prev) => ({
        ...prev,
        skills: updated.map((s) => ({ skills: s })),
      }));
    }
  };

  // On Save - Save updated skills to backend
  const onSave = () => {
    setLoading(true);

    const filteredSkills = skills
      .filter((skill) => skill.trim() !== "")
      .map((skill) => ({ skills: skill }));

    const data = {
      data: {
        skills: filteredSkills,
      },
    };

    GlobalApi.UpdateResumeDetail(resumeId, data).then(
      (res) => {
        setLoading(false);
        enabledNext(true);
        toast("Skill Details updated!");

        // Update context with filtered values
        setResumeInfo((prev) => ({
          ...prev,
          skills: filteredSkills,
        }));
      },
      (error) => {
        setLoading(false);
        toast("Server Error, Try again!");
      }
    );
  };

  return (
    <div className="p-3 md:p-6 shadow-lg rounded-lg border-t-gray-200 border-t-4 mt-10">
      {/* Heading */}
      <h2 className="font-bold text-sm sm:text-lg md:text-xl">Skills</h2>
      <p className="text-xs sm:text-sm md:text-base">
        List your skills. You can add or remove them as needed. Drag to reorder.
      </p>

      {/* Input Fields */}
      <div className="my-4 flex flex-col gap-4">
        {skills.map((skill, index) => (
          <Input
            key={`skill-${index}`}
            type="text"
            placeholder={`Skill ${index + 1}`}
            value={skill}
            onChange={(e) => handleChange(index, e.target.value)}
            className="text-sm sm:text-base"
          />
        ))}
      </div>

      {/* Add/Remove buttons */}
      <div className="flex gap-3 mt-5">
        <Button
          variant="outline"
          size="sm"
          className="text-xs sm:text-sm cursor-pointer"
          onClick={handleAddSkill}
        >
          + Add More
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-xs sm:text-sm cursor-pointer"
          onClick={handleRemoveSkill}
        >
          - Remove
        </Button>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <Button
          className="w-full sm:w-auto text-xs sm:text-sm md:text-base cursor-pointer"
          onClick={onSave}
          disabled={loading}
        >
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Skills;

// -----------------------------------------------------

// import { Input } from "@/components/ui/input";
// import React, { useContext, useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { LoaderCircle } from "lucide-react";
// import { useParams } from "react-router-dom";
// import { ResumeInfoContext } from "@/context/ResumeInfoContext";
// import GlobalApi from "./../../../../../service/GlobalApi";
// import { toast } from "sonner";

// // Fixed skill categories with title and skills key
// const initialCategories = [
//   { title: "Development", skills: [""] },
//   { title: "Languages", skills: [""] },
//   { title: "Tools", skills: [""] },
//   { title: "Other", skills: [""] },
// ];

// function Skills() {
//   const { resumeId } = useParams();
//   const [loading, setLoading] = useState(false);
//   const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

//   // Skills stored by categories
//   const [skillsByCategory, setSkillsByCategory] = useState(initialCategories);

//   // Load existing skills from resumeInfo
//   useEffect(() => {
//     if (resumeInfo?.skillsByCategory) {
//       setSkillsByCategory(resumeInfo.skillsByCategory);
//     }
//   }, [resumeInfo]);

//   // Handle skill change
//   const handleChange = (categoryIndex, skillIndex, value) => {
//     const updated = [...skillsByCategory];
//     updated[categoryIndex].skills[skillIndex] = value;
//     setSkillsByCategory(updated);
//   };

//   // Add new skill under a category
//   const handleAddSkill = (categoryIndex) => {
//     const updated = [...skillsByCategory];
//     updated[categoryIndex].skills.push("");
//     setSkillsByCategory(updated);
//   };

//   // Remove last skill from a category
//   const handleRemoveSkill = (categoryIndex) => {
//     const updated = [...skillsByCategory];
//     if (updated[categoryIndex].skills.length > 1) {
//       updated[categoryIndex].skills.pop();
//       setSkillsByCategory(updated);
//     }
//   };

//   // Save updated skills to backend
//   const onSave = () => {
//     setLoading(true);
//     const data = {
//       data: {
//         skillsByCategory: skillsByCategory,
//       },
//     };

//     GlobalApi.UpdateResumeDetail(resumeId, data).then(
//       (res) => {
//         setLoading(false);
//         toast("Skill Details updated!");
//       },
//       (error) => {
//         setLoading(false);
//         toast("Server Error, Try again!");
//       }
//     );
//   };

//   // Update resume context whenever state changes
//   useEffect(() => {
//     setResumeInfo({
//       ...resumeInfo,
//       skillsByCategory: skillsByCategory,
//     });
//   }, [skillsByCategory]);

//   return (
//     <div className="p-3 md:p-6 shadow-lg rounded-lg border-t-gray-200 border-t-4 mt-10">
//       {/* Heading */}
//       <h2 className="font-bold text-sm sm:text-lg md:text-xl">Skills</h2>
//       <p className="text-xs sm:text-sm md:text-base">
//         Add your skills under appropriate categories.
//       </p>

//       {/* Render each category */}
//       {skillsByCategory.map((categoryObj, catIndex) => (
//         <div key={catIndex} className="my-4">
//           {/* Title */}
//           <h3 className="font-semibold text-sm sm:text-base mb-2">
//             {categoryObj.title}
//           </h3>

//           {/* Skill inputs */}
//           <div className="flex flex-col gap-2">
//             {categoryObj.skills.map((skill, skillIndex) => (
//               <div key={skillIndex} className="flex items-center gap-3">
//                 <label className="text-xs sm:text-sm whitespace-nowrap">
//                   {categoryObj.title} Skill
//                 </label>
//                 <Input
//                   className="text-xs sm:text-sm w-full"
//                   placeholder={`Enter ${categoryObj.title} skill`}
//                   value={skill}
//                   onChange={(e) =>
//                     handleChange(catIndex, skillIndex, e.target.value)
//                   }
//                 />
//               </div>
//             ))}
//           </div>

//           {/* Add/Remove buttons per category */}
//           <div className="flex gap-3 mt-2">
//             <Button
//               variant="outline"
//               size="sm"
//               className="text-xs sm:text-sm cursor-pointer"
//               onClick={() => handleAddSkill(catIndex)}
//             >
//               + Add
//             </Button>
//             <Button
//               variant="outline"
//               size="sm"
//               className="text-xs sm:text-sm cursor-pointer"
//               onClick={() => handleRemoveSkill(catIndex)}
//             >
//               - Remove
//             </Button>
//           </div>
//         </div>
//       ))}

//       {/* Save Button */}
//       <div className="flex justify-end mt-6">
//         <Button
//           className="w-full sm:w-auto text-xs sm:text-sm md:text-base cursor-pointer"
//           onClick={onSave}
//           disabled={loading}
//         >
//           {loading ? <LoaderCircle className="animate-spin w-4 h-4" /> : "Save"}
//         </Button>
//       </div>
//     </div>
//   );
// }

// export default Skills;
