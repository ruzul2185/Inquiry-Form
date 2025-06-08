import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import type { Inquiry } from "@/types/InquiryTypes";

interface ViewInquiryDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  loading: boolean;
  data: Inquiry | null;
}

export default function ViewInquiryDialog({
  open,
  setOpen,
  loading,
  data,
}: ViewInquiryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Inquiry Details</DialogTitle>
          <DialogDescription>
            {loading ? (
              <div className="space-y-2">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="h-4 bg-gray-300 rounded animate-pulse w-full"
                  />
                ))}
              </div>
            ) : data ? (
              <div className="space-y-1 text-sm">
                <p><strong>ID:</strong> {data.id}</p>
                <p><strong>Created At:</strong> {new Date(data.created_at).toLocaleString()}</p>
                <p><strong>Full Name:</strong> {data.full_name}</p>
                <p><strong>Phone Number:</strong> {data.phone_number}</p>
                <p><strong>Date of Birth:</strong> {data.date_of_birth}</p>
                <p><strong>Age:</strong> {data.age}</p>
                <p><strong>Gender:</strong> {data.gender}</p>
                <p><strong>Email:</strong> {data.email ?? "—"}</p>
                <p><strong>Reference:</strong> {data.reference}</p>
                <p><strong>Current Address:</strong> {data.current_address ?? "—"}</p>
                <p><strong>Permanent Address:</strong> {data.permanent_address ?? "—"}</p>
                <p><strong>Course Selection:</strong> {data.course_selection ?? "—"}</p>
                <p><strong>Course Duration:</strong> {data.course_duration ?? "—"}</p>
                <p><strong>User Availability:</strong> {data.user_availability ?? "—"}</p>
                <p><strong>Job Guarantee:</strong> {data.job_guarentee ?? "—"}</p>
                <p><strong>Job Assistance:</strong> {data.job_assistance ?? "—"}</p>
                <p><strong>Job Location:</strong> {data.job_location ?? "—"}</p>
                <p><strong>Expected Package:</strong> {data.expected_package ?? "—"}</p>
                <p><strong>Future Goal:</strong> {data.future_goal ?? "—"}</p>
                <p><strong>Career Transition Reason:</strong> {data.career_transition_reason ?? "—"}</p>
                <p><strong>Recent Education:</strong> {data.recent_education ?? "—"}</p>
                <p><strong>Passing Year:</strong> {data.passing_year ?? "—"}</p>
                <p><strong>CGPA:</strong> {data.cgpa ?? "—"}</p>
              </div>
            ) : (
              <p>No data available</p>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
