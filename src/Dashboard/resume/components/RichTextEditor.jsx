import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import Editor from "react-simple-wysiwyg";
import { AIChatSession } from "./../../../../service/AIModal";
import { toast } from "sonner";

const prompt =
  " Position Title: {positionTitle}. Generate a 2-3 point summary of my experience for a resume. Ensure you give only 2-3 points and nothing else";

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [value, setValue] = useState(defaultValue);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue(defaultValue || "");
  }, [defaultValue]);

  const GenerateSummaryFormAI = async () => {
    if (!resumeInfo?.experience[index]?.title) {
      toast("Please add Position Title");
      return;
    }

    setLoading(true);
    const PROMPT = prompt.replace(
      "{positionTitle}",
      resumeInfo.experience[index].title
    );

    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      const res = await result.response.text();
      const cleaned = res.replace(/[\[\]]/g, "");
      setValue(cleaned);
      onRichTextEditorChange({ target: { value: cleaned } });
    } catch (error) {
      toast("AI generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-sm">
      <div className="flex flex-col sm:flex-row justify-between my-2 gap-2">
        <label className="text-sm font-medium">Summary</label>
        <Button
          size="sm"
          variant="outline"
          onClick={GenerateSummaryFormAI}
          className="flex gap-2 border-primary text-primary w-full sm:w-auto justify-center cursor-pointer"
        >
          {loading ? (
            <LoaderCircle className="animate-spin w-4 h-4" />
          ) : (
            <>
              <Brain className="h-4 w-4" />
              Generate from AI
            </>
          )}
        </Button>
      </div>
      <div className="text-sm [&_textarea]:min-h-[120px] [&_textarea]:p-2 [&_textarea]:text-sm [&_textarea]:w-full [&_textarea]:rounded-md [&_textarea]:border [&_textarea]:border-gray-300">
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        />
      </div>
    </div>
  );
}

export default RichTextEditor;
