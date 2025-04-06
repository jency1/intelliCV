import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummary: "",
};

function Experience({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [experienceList, setExperienceList] = useState([formField]);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  //   Load Experience
  useEffect(() => {
    resumeInfo?.experience.length > 0 &&
      setExperienceList(resumeInfo?.experience);
  }, []);

  //   Handle Change
  const handleChange = (index, event) => {
    const newEntries = [...experienceList];
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  //   Add New Experience
  const AddNewExperience = () => {
    setExperienceList([...experienceList, { ...formField }]);
  };

  //   Remove Experience
  const RemoveExperience = () => {
    if (experienceList.length > 1) {
      setExperienceList((experienceList) => experienceList.slice(0, -1));
    }
  };

  //   Handle RichTextEditor
  const handleRichTextEditor = (e, index) => {
    const newEntries = [...experienceList];
    newEntries[index].workSummary = e.target.value;
    setExperienceList(newEntries);
  };

  //   Add Experience
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience: experienceList,
    });
  }, [experienceList]);

  //   On Save
  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        experience: experienceList.map(({ id, ...rest }) => rest),
      },
    };

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (res) => {
        setLoading(false);
        enabledNext(true);
        toast("Experience Details updated!");
      },
      (error) => {
        setLoading(false);
        toast("Server Error, Please try again!");
      }
    );
  };

  return (
    <div>
      <div className="p-3 md:p-6 shadow-lg rounded-lg border-t-4 border-t-gray-200 mt-10 text-sm">
        <h2 className="font-bold text-sm sm:text-lg md:text-xl">
          Professional Experience
        </h2>
        <p className="text-xs sm:text-sm md:text-base">
          Add your previous job experience
        </p>

        <div className="mt-4 space-y-6">
          {experienceList?.map((item, index) => (
            <div
              key={index}
              className="border p-3 md:p-4 rounded-lg space-y-4 text-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Title */}
                <div>
                  <label className="text-xs sm:text-sm md:text-base font-medium">
                    Position Title
                  </label>
                  <Input
                    name="title"
                    value={item?.title}
                    onChange={(e) => handleChange(index, e)}
                    className="text-sm py-1 px-2"
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="text-xs sm:text-sm md:text-base font-medium">
                    Company Name
                  </label>
                  <Input
                    name="companyName"
                    value={item?.companyName}
                    onChange={(e) => handleChange(index, e)}
                    className="text-sm py-1 px-2"
                  />
                </div>

                {/* City */}
                <div>
                  <label className="text-xs sm:text-sm md:text-base font-medium">
                    City
                  </label>
                  <Input
                    name="city"
                    value={item?.city}
                    onChange={(e) => handleChange(index, e)}
                    className="text-sm py-1 px-2"
                  />
                </div>

                {/* State */}
                <div>
                  <label className="text-xs sm:text-sm md:text-base font-medium">
                    State
                  </label>
                  <Input
                    name="state"
                    value={item?.state}
                    onChange={(e) => handleChange(index, e)}
                    className="text-sm py-1 px-2"
                  />
                </div>

                {/* Start Date */}
                <div>
                  <label className="text-xs sm:text-sm md:text-base font-medium">
                    Start Date
                  </label>
                  <Input
                    name="startDate"
                    type="date"
                    value={item?.startDate}
                    onChange={(e) => handleChange(index, e)}
                    className="text-sm py-1 px-2"
                  />
                </div>

                {/* End Date */}
                <div>
                  <label className="text-xs sm:text-sm md:text-base font-medium">
                    End Date
                  </label>
                  <Input
                    name="endDate"
                    type="date"
                    value={item?.endDate}
                    onChange={(e) => handleChange(index, e)}
                    className="text-sm py-1 px-2"
                  />
                </div>
              </div>

              {/* Summary */}
              <div>
                <label className="text-xs sm:text-sm md:text-base font-medium">
                  Work Summary
                </label>
                <RichTextEditor
                  index={index}
                  defaultValue={item?.workSummary || ""}
                  onRichTextEditorChange={(e) => handleRichTextEditor(e, index)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-5 gap-4 text-sm">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="px-3 py-1 cursor-pointer"
              onClick={AddNewExperience}
            >
              + Add More
            </Button>
            <Button
              variant="outline"
              className="px-3 py-1 cursor-pointer"
              onClick={RemoveExperience}
            >
              - Remove
            </Button>
          </div>

          <Button className="px-4 py-1.5" onClick={onSave} disabled={loading}>
            {loading ? (
              <LoaderCircle className="animate-spin w-4 h-4" />
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Experience;
