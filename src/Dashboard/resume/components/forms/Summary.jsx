import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { Brain, LoaderCircle } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { toast } from "sonner";
import { AIChatSession } from "./../../../../../service/AIModal";

// AI prompt template
const prompt =
  "Job Title: {jobTitle} - Generate a resume summary in 3-4 lines. " +
  "Return the response strictly in the following JSON format: " +
  '{ "JobTitle": "{jobTitle}", "Summaries": [ ' +
  '{ "experienceLevel": "Fresher", "summary": "Your summary here." }, ' +
  '{ "experienceLevel": "Mid-Level", "summary": "Your summary here." }, ' +
  '{ "experienceLevel": "Experienced", "summary": "Your summary here." } ' +
  "] }. " +
  "Do NOT change the field names. Use lowercase for 'experienceLevel' and 'summary'. " +
  "Ensure the response strictly follows this format with no extra fields.";

function Summary({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState([]);

  const { resumeId } = useParams();

  //   Update Summary
  useEffect(() => {
    if (resumeInfo?.summary) {
      setSummary(resumeInfo?.summary);
    }
  }, [resumeInfo]);

  //   Add Summary
  useEffect(() => {
    setResumeInfo((prev) => ({ ...prev, summary }));
  }, [summary]);

  //   Generate Summary from AI
  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle || "");

    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      const text = await result.response.text();
      const parsedResponse = JSON.parse(text);

      if (parsedResponse?.Summaries) {
        setAiGeneratedSummaryList(parsedResponse.Summaries);
      } else {
        setAiGeneratedSummaryList([]);
        toast.error("Invalid AI response format.");
      }
    } catch (error) {
      console.error("Error parsing AI response:", error);
      setAiGeneratedSummaryList([]);
      toast.error("Failed to generate AI summary.");
    } finally {
      setLoading(false);
    }
  };

  //   On Save
  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await GlobalApi.UpdateResumeDetail(resumeId, { data: { summary } });
      enabledNext(true);
      toast("Summary updated successfully!");
    } catch (error) {
      toast("Server Error, Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3 md:p-6 shadow-lg rounded-lg border-t-4 border-t-gray-200 mt-10 text-sm md:text-base">
      {/* Heading */}
      <h2 className="font-bold text-sm sm:text-lg md:text-xl">Summary</h2>
      <p className="text-xs sm:text-sm md:text-base">
        Add a short summary for your job title
      </p>

      {/* Form */}
      <form onSubmit={onSave} className="mt-4 md:mt-6 space-y-3 md:space-y-4">
        {/* Header with AI button */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <label className="text-xs sm:text-sm md:text-base font-medium">
            Add Summary
          </label>

          <Button
            variant="outline"
            type="button"
            size="sm"
            className="border-primary text-primary flex items-center gap-2 text-xs md:text-sm cursor-pointer"
            onClick={GenerateSummaryFromAI}
            disabled={loading}
          >
            {loading ? (
              <LoaderCircle className="animate-spin h-4 w-4" />
            ) : (
              <>
                <Brain className="h-4 w-4" />
                Generate From AI
              </>
            )}
          </Button>
        </div>

        {/* Textarea for Summary */}
        <Textarea
          required
          className="mt-2 text-xs md:text-sm"
          rows={5}
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Type your summary or use AI to generate it..."
        />

        {/* Save Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={loading}
            className="text-xs md:text-sm cursor-pointer"
          >
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>

      {/* Suggestions Section */}
      {aiGeneratedSummaryList?.length > 0 && (
        <div className="my-5 md:my-6">
          <h3 className="font-semibold text-sm md:text-base mb-3">
            AI Suggestions
          </h3>

          <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2">
            {aiGeneratedSummaryList?.map((item, index) => (
              <div
                key={index}
                onClick={() => setSummary(item?.summary)}
                className="p-3 border rounded-lg shadow-sm cursor-pointer hover:bg-gray-50 transition text-xs md:text-sm"
              >
                <h4 className="font-bold text-primary mb-1">
                  Level: {item?.experienceLevel}
                </h4>
                <p className="text-gray-700">{item?.summary}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Summary;
