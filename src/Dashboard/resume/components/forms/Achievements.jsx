import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

function Achievements({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [achievementList, setAchievementList] = useState([
    { achievements: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  // Load saved achievements from resumeInfo
  useEffect(() => {
    if (resumeInfo?.achievements?.length > 0) {
      const fixedAchievements = resumeInfo.achievements.map((item) =>
        typeof item === "string" ? { achievements: item } : item
      );
      setAchievementList(fixedAchievements);
    }
  }, [resumeInfo]);

  // Handle Input Change
  const handleChange = (index, event) => {
    const newEntries = [...achievementList];
    newEntries[index].achievements = event.target.value;
    setAchievementList(newEntries);
  };

  // Add New Achievement
  const handleAddAchievement = () => {
    setAchievementList([...achievementList, { achievements: "" }]);
  };

  // Remove Achievement
  const handleRemoveAchievement = () => {
    if (achievementList.length > 1) {
      setAchievementList((prev) => prev.slice(0, -1));
    }
  };

  // On Save - Save Data to backend and update context
  const onSave = () => {
    setLoading(true);
    const updatedList = achievementList.map(({ id, ...rest }) => rest);

    // Update context
    setResumeInfo((prev) => ({
      ...prev,
      achievements: updatedList,
    }));

    // Save to backend
    GlobalApi.UpdateResumeDetail(params?.resumeId, {
      data: { achievements: updatedList },
    }).then(
      (res) => {
        setLoading(false);
        enabledNext(true);
        toast("Achievements details updated!");
      },
      (error) => {
        setLoading(false);
        toast("Server Error, Please try again!");
      }
    );
  };

  return (
    <div className="p-3 md:p-6 shadow-lg rounded-lg border-t-4 border-t-gray-200 mt-10 text-sm">
      {/* Heading */}
      <h2 className="font-bold text-sm sm:text-lg md:text-xl">Achievements</h2>
      <p className="text-xs sm:text-sm md:text-base">
        Highlight your top achievements
      </p>

      {/* Achievements */}
      <div className="mt-4 space-y-4">
        {achievementList?.map((item, index) => (
          <div key={index}>
            <Input
              name="achievement"
              value={item?.achievements || ""}
              onChange={(e) => handleChange(index, e)}
              className="text-sm py-1 px-2"
              placeholder={`Achievement ${index + 1}`}
            />
          </div>
        ))}
      </div>

      {/* Add/Remove buttons */}
      <div className="flex gap-3 mt-5">
        <Button
          variant="outline"
          size="sm"
          className="text-xs sm:text-sm cursor-pointer"
          onClick={handleAddAchievement}
        >
          + Add More
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="text-xs sm:text-sm cursor-pointer"
          onClick={handleRemoveAchievement}
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

export default Achievements;
