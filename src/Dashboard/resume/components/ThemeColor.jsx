import React, { useContext, useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "./../../../../service/GlobalApi";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

function ThemeColor() {
  const colors = [
    "#1F2937", // Slate Gray
    "#4B5563", // Cool Gray
    "#374151", // Dark Gray
    "#6B7280", // Light Gray
    "#2563EB", // Blue
    "#1D4ED8", // Deep Blue
    "#047857", // Teal Green
    "#059669", // Emerald
    "#DC2626", // Red Accent
    "#D97706", // Amber
    "#7C3AED", // Violet
    "#0F172A", // Deep Navy
  ];

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [selectedColor, setSelectedColor] = useState();
  const { resumeId } = useParams();

  // Set selected color from resumeInfo if available
  useEffect(() => {
    if (resumeInfo?.themeColor) {
      setSelectedColor(resumeInfo.themeColor);
    }
  }, [resumeInfo]);

  // Set Selected Color to theme
  const onColorSelect = (color) => {
    setSelectedColor(color); // update local state
    setResumeInfo({
      ...resumeInfo,
      themeColor: color, // update global context
    });

    const data = {
      data: {
        themeColor: color,
      },
    };

    GlobalApi.UpdateResumeDetail(resumeId, data).then((res) => {
      console.log(res);
      toast("Theme Color Updated!");
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex gap-2 cursor-pointer text-xs sm:text-sm"
        >
          <LayoutGrid className="w-4 h-4 sm:w-5 sm:h-5" />
          Theme
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[200px] sm:w-[250px]">
        <h2 className="mb-2 text-xs sm:text-sm font-bold">
          Select Theme Color
        </h2>

        {/* Colors Box */}
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3">
          {colors.map((item, index) => (
            <div
              key={index}
              onClick={() => onColorSelect(item)}
              className={`h-6 w-6 sm:h-5 sm:w-5 rounded-full cursor-pointer transition 
                ${selectedColor === item ? "border-2 border-white" : "border"}
              `}
              style={{ background: item }}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default ThemeColor;
