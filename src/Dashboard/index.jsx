import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import { useUser } from "@clerk/clerk-react";
import GlobalApi from "./../../service/GlobalApi";
import ResumeCardItem from "./components/ResumeCardItem";

function Dashboard() {
  const { user, isLoaded, isSignedIn } = useUser();

  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    // Fetch resume list when user is available
    if (user) GetResumesList();
  }, [user]);

  // Get users resume list
  const GetResumesList = () => {
    GlobalApi.GetUsersResume(user?.primaryEmailAddress?.emailAddress).then(
      (res) => {
        // Sort by updatedAt or createdAt (descending)
        const sortedList = res.data.data.sort(
          (a, b) =>
            new Date(b.updatedAt || b.createdAt) -
            new Date(a.updatedAt || a.createdAt)
        );
        setResumeList(sortedList);
      }
    );
  };

  return (
    <div className="p-8 sm:px-20 lg:px-32">
      <h2 className="font-bold text-2xl sm:text-3xl">My Resumes</h2>
      <p className="my-3 sm:my-4 text-sm sm:text-base">
        Craft Your Perfect AI-Powered Resume & Land Your Dream Job Effortlessly!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-8 sm:mt-10">
        {/* Add Resume Button Card */}
        <AddResume />

        {/* Resume Cards */}
        {resumeList.length > 0
          ? resumeList.map((resume, index) => (
              <ResumeCardItem
                resume={resume}
                key={index}
                refreshData={GetResumesList}
              />
            ))
          : [1, 2, 3, 4].map((item, index) => (
              <div
                key={index}
                className="h-[280px] rounded-lg bg-slate-200 animate-pulse"
              ></div>
            ))}
      </div>
    </div>
  );
}

export default Dashboard;
