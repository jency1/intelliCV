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
  const onSave = (e) => {
    e.preventDefault();
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
          onClick={(e) => onSave(e)}
          disabled={loading}
          type="button"
        >
          {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Skills;
