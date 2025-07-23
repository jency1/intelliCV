import React, { useState, useEffect } from "react";
import PersonalDetail from "./forms/PersonalDetail";
import Summary from "./forms/Summary";
import Experience from "./forms/Experience";
import Education from "./forms/Education";
import Skills from "./forms/Skills";
import Achievements from "./forms/Achievements";
import { Link, Navigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import ThemeColor from "./ThemeColor";

function FormSection() {
  // Load from localStorage during initial state setup
  const [activeFormIndex, setActiveFormIndex] = useState(() => {
    const saved = localStorage.getItem("resumeFormIndex");
    return saved ? parseInt(saved) : 1;
  });

  const [enabledNext, setEnabledNext] = useState(false);
  const { resumeId } = useParams();

  // Save activeFormIndex to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("resumeFormIndex", activeFormIndex.toString());
  }, [activeFormIndex]);

  // Form Rendering
  const renderForm = () => {
    switch (activeFormIndex) {
      case 1:
        return <PersonalDetail enabledNext={(v) => setEnabledNext(v)} />;
      case 2:
        return <Summary enabledNext={(v) => setEnabledNext(v)} />;
      case 3:
        return <Experience enabledNext={(v) => setEnabledNext(v)} />;
      case 4:
        return <Education enabledNext={(v) => setEnabledNext(v)} />;
      case 5:
        return <Skills enabledNext={(v) => setEnabledNext(v)} />;
      case 6:
        return <Achievements enabledNext={(v) => setEnabledNext(v)} />;
      case 7:
        return <Navigate to={`/my-resume/${resumeId}/view`} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Header Controls */}
      <div className="flex justify-between items-center">
        <div className="flex gap-3">
          {/* Home Button */}
          <Link to={"/dashboard"}>
            <Button className="cursor-pointer">
              <Home />
            </Button>
          </Link>
          <ThemeColor />
        </div>

        <div className="flex gap-2">
          {/* Left Arrow */}
          {activeFormIndex > 1 && (
            <Button
              className="cursor-pointer"
              size="sm"
              onClick={() => setActiveFormIndex(activeFormIndex - 1)}
            >
              <ArrowLeft />
            </Button>
          )}

          {/* Right Arrow */}
          <Button
            disabled={!enabledNext}
            className="flex gap-2 cursor-pointer"
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}
          >
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {/* Render Current Form */}
      <div className="mt-6">{renderForm()}</div>
    </div>
  );
}

export default FormSection;
