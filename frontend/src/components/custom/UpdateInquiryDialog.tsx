import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

import type { Inquiry } from "@/types/InquiryTypes";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export interface UpdateInquiryDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  loading: boolean;
  data: Inquiry | null;
  form: {
    full_name: string;
    phone_number: string;
    date_of_birth: string;
    age: string;
    gender: string;
    email: string;
    reference: string;
    current_address: string;
    permanent_address: string;
    course_selection: string;
    course_duration: string;
    user_availability: string;
    job_guarentee: string;
    job_assistance: string;
    job_location: string;
    expected_package: string;
    future_goal: string;
    career_transition_reason: string;
    recent_education: string;
    passing_year: string;
    cgpa: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: () => void;
}

function formatDateForInput(dateString: string): string {
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return "";
  const year = d.getFullYear();
  const month = (d.getMonth() + 1).toString().padStart(2, "0");
  const day = d.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function UpdateInquiryDialog({
  open,
  setOpen,
  loading,
  data,
  form,
  onChange,
  onSubmit,
}: UpdateInquiryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Inquiry</DialogTitle>
          <DialogDescription>
            Update the inquiry details below and submit the form.
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="space-y-2 mt-4">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="h-4 bg-gray-300 rounded animate-pulse w-full"
              />
            ))}
          </div>
        ) : data ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            className="space-y-4 mt-4"
          >
            <Input
              name="full_name"
              value={form.full_name}
              onChange={onChange}
              required
              placeholder="Full Name"
            />
            <Input
              name="phone_number"
              value={form.phone_number}
              onChange={onChange}
              required
              placeholder="Phone Number"
            />
            <Input
              type="date"
              name="date_of_birth"
              value={form.date_of_birth ? formatDateForInput(form.date_of_birth) : ""}
              onChange={onChange}
              placeholder="Date of Birth"
            />
            <Input
              type="number"
              name="age"
              value={form.age}
              onChange={onChange}
              required
              placeholder="Age"
            />
            <Input
              name="gender"
              value={form.gender}
              onChange={onChange}
              required
              placeholder="Gender"
            />
            <Input
              type="email"
              name="email"
              value={form.email}
              onChange={onChange}
              placeholder="Email"
            />
            <Input
              name="reference"
              value={form.reference}
              onChange={onChange}
              placeholder="Reference"
            />
            <Input
              name="current_address"
              value={form.current_address}
              onChange={onChange}
              placeholder="Current Address"
            />
            <Input
              name="permanent_address"
              value={form.permanent_address}
              onChange={onChange}
              placeholder="Permanent Address"
            />
            <Input
              name="course_selection"
              value={form.course_selection}
              onChange={onChange}
              placeholder="Course Selection"
            />
            <Input
              name="course_duration"
              value={form.course_duration}
              onChange={onChange}
              placeholder="Course Duration"
            />
            <Input
              name="user_availability"
              value={form.user_availability}
              onChange={onChange}
              placeholder="User Availability"
            />
            <Input
              name="job_guarentee"
              value={form.job_guarentee}
              onChange={onChange}
              placeholder="Job Guarantee"
            />
            <Input
              name="job_assistance"
              value={form.job_assistance}
              onChange={onChange}
              placeholder="Job Assistance"
            />
            <Input
              name="job_location"
              value={form.job_location}
              onChange={onChange}
              placeholder="Job Location"
            />
            <Input
              name="expected_package"
              value={form.expected_package}
              onChange={onChange}
              placeholder="Expected Package"
            />
            <Input
              name="future_goal"
              value={form.future_goal}
              onChange={onChange}
              placeholder="Future Goal"
            />
            <Input
              name="career_transition_reason"
              value={form.career_transition_reason}
              onChange={onChange}
              placeholder="Career Transition Reason"
            />
            <Input
              name="recent_education"
              value={form.recent_education}
              onChange={onChange}
              placeholder="Recent Education"
            />
            <Input
              name="passing_year"
              value={form.passing_year}
              onChange={onChange}
              placeholder="Passing Year"
            />
            <Input
              name="cgpa"
              value={form.cgpa}
              onChange={onChange}
              placeholder="CGPA"
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" className="mr-2">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Update</Button>
            </DialogFooter>
          </form>
        ) : (
          <p className="mt-4">No data available</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
