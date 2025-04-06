import { Notebook, Loader2Icon, MoreVertical } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import GlobalApi from "./../../../service/GlobalApi";
import { toast } from "sonner";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

function ResumeCardItem({ resume, refreshData }) {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  // const onMenuClick=(url)=>{
  //   navigation(url)
  // }

  const onDelete = () => {
    setLoading(true);
    GlobalApi.DeleteResumeById(resume.documentId).then(
      (res) => {
        console.log(res);
        toast("Resume Deleted!");
        refreshData?.();
        setLoading(false);
        setOpenAlert(false);
      },
      (error) => {
        setLoading(false);
        toast.error("Failed to delete resume.");
      }
    );
  };

  return (
    <>
      <div className="w-full max-w-xs">
        <Link to={"/dashboard/resume/" + resume.documentId + "/edit"}>
          <div
            className="p-14 bg-secondary flex items-center justify-center h-[280px] border-t-4 border-primary rounded-lg hover:scale-105 transition-all hover:shadow-xs shadow-primary bg-gradient-to-b
          from-pink-100 via-purple-200 to-blue-200"
          >
            <Notebook />
          </div>
        </Link>

        {/* Footer section with title and options */}
        <div
          className="border px-4 py-3 flex items-center justify-between rounded-b-lg shadow-lg"
          style={{
            background: resume?.themeColor || "#1e293b",
            color: "#fff",
          }}
        >
          {/* Resume Title */}
          <h2 className="text-center text-base font-semibold truncate max-w-[180px]">
            {resume?.title || "Untitled"}
          </h2>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <MoreVertical className="h-4 w-4 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {/* Edit */}
              <DropdownMenuItem
                onClick={() =>
                  navigation("/dashboard/resume/" + resume.documentId + "/edit")
                }
                className="cursor-pointer"
              >
                Edit
              </DropdownMenuItem>

              {/* View */}
              <DropdownMenuItem
                onClick={() =>
                  navigation("/my-resume/" + resume.documentId + "/view")
                }
                className="cursor-pointer"
              >
                View
              </DropdownMenuItem>

              {/* Download */}
              <DropdownMenuItem
                onClick={() =>
                  navigation("/my-resume/" + resume.documentId + "/view")
                }
                className="cursor-pointer"
              >
                Download
              </DropdownMenuItem>

              {/* Delete */}
              <DropdownMenuItem
                onClick={() => setOpenAlert(true)}
                className="cursor-pointer"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Delete Confirmation Dialog */}

        <AlertDialog open={openAlert}>
          <AlertDialogContent>
            {/* Header */}

            <AlertDialogHeader>
              {/* Title */}
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>

              {/* Description */}
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                resume and remove it from our system.
              </AlertDialogDescription>
            </AlertDialogHeader>

            {/* Footer */}

            <AlertDialogFooter>
              {/* Cancel Button */}

              <AlertDialogCancel
                onClick={() => setOpenAlert(false)}
                className="cursor-pointer"
              >
                Cancel
              </AlertDialogCancel>

              {/* Delete Button */}
              <AlertDialogAction
                onClick={onDelete}
                disabled={loading}
                className="cursor-pointer"
              >
                {loading ? <Loader2Icon className="animate-spin" /> : "Delete"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  );
}

export default ResumeCardItem;
