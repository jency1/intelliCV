import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { toast } from "sonner";

function Education({ enabledNext }) {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const [educationalList, setEducationalList] = useState([
    {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ]);

  //   Load Educational List
  useEffect(() => {
    resumeInfo && setEducationalList(resumeInfo?.education);
  }, []);

  // Handle Change
  const handleChange = (event, index) => {
    const newEntries = educationalList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    console.log(newEntries);
    setEducationalList(newEntries);
  };

  //   Add New Education
  const AddNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  //   Remove Education
  const RemoveEducation = () => {
    setEducationalList((educationalList) => educationalList.slice(0, -1));
  };

  // OnSave
  const onSave = () => {
    setLoading(true);

    const data = {
      data: {
        education: educationalList.map(({ id, ...rest }) => rest),
      },
    };

    GlobalApi.UpdateResumeDetail(params.resumeId, data).then(
      (res) => {
        console.log(res);
        setLoading(false);
        enabledNext(true);
        toast("Education Details updated!");
      },
      (error) => {
        setLoading(false);
        toast("Server Error, Please try again!");
      }
    );
  };

  //   Update Resume Info - whenever educationalList changes
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationalList,
    });
  }, [educationalList]);

  return (
    <div className="p-3 md:p-6 shadow-lg rounded-lg border-t-gray-200 border-t-4 mt-10">
      {/* Heading */}
      <h2 className="font-bold text-sm sm:text-lg md:text-xl">Education</h2>
      <p className="text-xs sm:text-sm md:text-base">
        Add your educational details.
      </p>

      {/* Education List */}
      <div>
        {educationalList.map((item, index) => (
          <div key={index}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
              {/* University Name */}
              <div className="col-span-1 sm:col-span-2">
                <label className="text-xs sm:text-sm md:text-base font-medium">
                  University Name
                </label>
                <Input
                  name="universityName"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.universityName}
                  className="text-sm py-1 px-2"
                />
              </div>

              {/* Degree */}
              <div>
                <label className="text-xs sm:text-sm md:text-base font-medium">
                  Degree
                </label>
                <Input
                  name="degree"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.degree}
                  className="text-sm py-1 px-2"
                />
              </div>

              {/* Branch (major) */}
              <div>
                <label className="text-xs sm:text-sm md:text-base font-medium">
                  Branch
                </label>
                <Input
                  name="major"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.major}
                  className="text-sm py-1 px-2"
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="text-xs sm:text-sm md:text-base font-medium">
                  Start Date
                </label>
                <Input
                  type="date"
                  name="startDate"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.startDate}
                  className="text-sm py-1 px-2"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="text-xs sm:text-sm md:text-base font-medium">
                  End Date
                </label>
                <Input
                  type="date"
                  name="endDate"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.endDate}
                  className="text-sm py-1 px-2"
                />
              </div>

              {/* Description */}
              <div className="col-span-1 sm:col-span-2">
                <label className="text-xs sm:text-sm md:text-base font-medium">
                  Description
                </label>
                <Textarea
                  name="description"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.description}
                  className="text-sm py-1 px-2"
                  placeholder="E.g. 85% / 9.2 CGPA / Graduated with distinction"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row justify-between gap-3 mt-4">
        <div className="flex gap-2 flex-wrap">
          {/* Add More Button */}
          <Button
            variant="outline"
            className="text-primary cursor-pointer text-xs sm:text-sm md:text-base"
            onClick={AddNewEducation}
          >
            + Add More
          </Button>

          {/* Remove Button */}
          <Button
            variant="outline"
            className="text-primary cursor-pointer text-xs sm:text-sm md:text-base"
            onClick={RemoveEducation}
          >
            - Remove
          </Button>
        </div>

        {/* Save Button */}
        <Button
          className="cursor-pointer text-xs sm:text-sm md:text-base w-full sm:w-auto justify-center"
          disabled={loading}
          onClick={() => onSave()}
        >
          {loading ? <LoaderCircle className="animate-spin w-4 h-4" /> : "Save"}
        </Button>
      </div>
    </div>
  );
}

export default Education;
