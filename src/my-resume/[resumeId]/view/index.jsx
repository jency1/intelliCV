import Header from "@/components/custom/Header";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import ResumePreview from "@/Dashboard/resume/components/ResumePreview";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import GlobalApi from "./../../../../service/GlobalApi";

function ViewResume() {
  const { resumeId } = useParams();
  const [resumeInfo, setResumeInfo] = useState();

  // Fetch Resumes based on ID
  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    GlobalApi.GetResumeById(resumeId).then((res) => {
      console.log(res.data.data);
      setResumeInfo(res.data.data);
    });
  };

  const HandleDownload = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${resumeInfo?.firstName} ${resumeInfo?.lastName} Resume`,
          text: "Hello, open this to see my resume!",
          url: `${import.meta.env.VITE_BASE_URL}/my-resume/${resumeId}/view`,
        })
        .then(() => console.log("Shared successfully!"))
        .catch((err) => console.error("Share failed:", err));
    } else {
      alert("Web Share is not supported in this browser.");
    }
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print">
        <Header />

        {/* Heading */}
        <div className="my-10 mx-5 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your ultimate AI Generated Resume is ready!!
          </h2>
          <p className="text-center text-gray-400">
            Now you are ready to download your resume and can share unique
            resume url.
          </p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-0 mt-10 md:px-10 lg:px-72">
            {/* Download */}
            <Button
              className="cursor-pointer w-full md:w-auto"
              onClick={HandleDownload}
            >
              Download
            </Button>
            {/* Share */}
            <Button
              className="cursor-pointer w-full md:w-auto"
              onClick={handleShare}
            >
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Resume Preview */}
      <div id="print-area" className="my-10 mx-5 md:mx-20 lg:mx-[20rem]">
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
