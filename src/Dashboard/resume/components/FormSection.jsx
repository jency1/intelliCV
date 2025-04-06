import React, { useState, useEffect } from "react";
import PersonalDetail from "./forms/PersonalDetail";
import Summary from "./forms/Summary";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import Achievements from "./forms/Achievements";
import { Link, Navigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from "lucide-react";
import ThemeColor from "./ThemeColor";

function FormSection() {
  const [activeFormIndex, setActiveFormIndex] = useState(1); // Starting form index
  const [enabledNext, setEnabledNext] = useState(false);
  const { resumeId } = useParams();

  // Add useEffect to persist the active form index
  useEffect(() => {
    const savedIndex = localStorage.getItem("resumeFormIndex");
    if (savedIndex) {
      setActiveFormIndex(parseInt(savedIndex));
    }
  }, []);

  // Update localStorage whenever activeFormIndex changes
  useEffect(() => {
    localStorage.setItem("resumeFormIndex", activeFormIndex.toString());
  }, [activeFormIndex]);

  return (
    <div>
      {/* ------------------------------------------- */}

      {/* Buttons */}

      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          {/* Home Button */}
          <Link to={"/dashboard"}>
            <Button className="cursor-pointer">
              <Home />
            </Button>
          </Link>

          {/* Theme Options Button */}
          <ThemeColor />
        </div>

        <div className="flex gap-2">
          {/* Left Arrow */}
          {activeFormIndex > 1 && (
            <Button
              className="cursor-pointer"
              size="sm"
              onClick={() => {
                setActiveFormIndex(activeFormIndex - 1);
              }}
            >
              <ArrowLeft />
            </Button>
          )}

          {/* Right Arrow */}
          <Button
            disabled={!enabledNext}
            className="flex gap-2 cursor-pointer"
            size="sm"
            onClick={() => {
              setActiveFormIndex(activeFormIndex + 1);
            }}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {/* ------------------------------------------- */}

      {/* Form */}

      {/* Personal Details */}
      {/* Summary */}
      {/* Professional Experience */}
      {/* Educational Details */}
      {/* Skills */}
      {/* Achievements */}

      {activeFormIndex == 1 ? (
        <PersonalDetail enabledNext={(v) => setEnabledNext(v)} />
      ) : activeFormIndex == 2 ? (
        <Summary enabledNext={(v) => setEnabledNext(v)} />
      ) : activeFormIndex == 3 ? (
        <Experience enabledNext={(v) => setEnabledNext(v)} />
      ) : activeFormIndex == 4 ? (
        <Education enabledNext={(v) => setEnabledNext(v)} />
      ) : activeFormIndex == 5 ? (
        <Skills enabledNext={(v) => setEnabledNext(v)} />
      ) : activeFormIndex == 6 ? (
        <Achievements enabledNext={(v) => setEnabledNext(v)} />
      ) : activeFormIndex == 7 ? (
        <Navigate to={"/my-resume/" + resumeId + "/view"} />
      ) : null}
    </div>
  );
}

export default FormSection;
