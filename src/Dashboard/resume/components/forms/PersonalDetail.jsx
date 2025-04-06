import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { toast } from "sonner";

function PersonalDetail({ enabledNext = () => {} }) {
  const params = useParams();

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(params);
  }, [params]);

  //   Handle Input Change
  const handleInputChange = (e) => {
    enabledNext(false);
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setResumeInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  //   On Save
  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      data: formData,
    };

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (res) => {
        console.log(res);
        enabledNext(true);
        setLoading(false);
        toast("Personal Details updated!");
      },
      (error) => {
        setLoading(false);
        toast("Server Error, Please try again!");
      }
    );
  };

  return (
    <div className="p-3 md:p-6 shadow-lg rounded-lg border-t-gray-200 border-t-4 mt-6 sm:mt-10 max-w-full sm:max-w-3xl mx-auto">
      {/* Heading */}
      <h2 className="font-bold text-sm sm:text-lg md:text-xl">
        Personal Details
      </h2>
      <p className="text-xs sm:text-sm md:text-base">
        Get started with the basic information
      </p>

      {/* Form */}
      <form onSubmit={onSave}>
        <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 sm:mt-5 gap-3">
          {/* First Name */}
          <div>
            <label className="text-xs sm:text-sm md:text-base font-medium">
              First Name
            </label>
            <Input
              name="firstName"
              defaultValue={resumeInfo?.firstName}
              required
              onChange={handleInputChange}
              className="text-sm py-1 px-2"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="text-xs sm:text-sm md:text-base font-medium">
              Last Name
            </label>
            <Input
              name="lastName"
              defaultValue={resumeInfo?.lastName}
              required
              onChange={handleInputChange}
              className="text-sm py-1 px-2"
            />
          </div>

          {/* Job Title */}
          <div className="col-span-1 sm:col-span-2">
            <label className="text-xs sm:text-sm md:text-base font-medium">
              Job Title
            </label>
            <Input
              name="jobTitle"
              defaultValue={resumeInfo?.jobTitle}
              required
              onChange={handleInputChange}
              className="text-sm py-1 px-2"
            />
          </div>

          {/* Address */}
          <div className="col-span-1 sm:col-span-2">
            <label className="text-xs sm:text-sm md:text-base font-medium">
              Address
            </label>
            <Input
              name="address"
              defaultValue={resumeInfo?.address}
              required
              onChange={handleInputChange}
              className="text-sm py-1 px-2"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="text-xs sm:text-sm md:text-base font-medium">
              Phone
            </label>
            <Input
              name="phone"
              defaultValue={resumeInfo?.phone}
              required
              onChange={handleInputChange}
              className="text-sm py-1 px-2"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-xs sm:text-sm md:text-base font-medium">
              Email
            </label>
            <Input
              name="email"
              defaultValue={resumeInfo?.email}
              required
              onChange={handleInputChange}
              className="text-sm py-1 px-2"
            />
          </div>
        </div>

        {/* Save */}
        <div className="mt-3 flex justify-end">
          <Button
            className="text-xs sm:text-sm md:text-base cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetail;
