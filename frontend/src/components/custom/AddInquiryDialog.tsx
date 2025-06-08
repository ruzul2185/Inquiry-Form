import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export type NewInquiryData = {
  full_name: string;
  phone_number: string;
  date_of_birth: string;
  gender: string;
  email?: string;
  reference: string;
  current_address?: string;
  permanent_address?: string;
  course_selection?: string;
  course_duration?: string;
  user_availability?: string;
  job_guarentee?: string;
  job_assistance?: string;
  job_location?: string;
  expected_package?: string;
  future_goal?: string;
  career_transition_reason?: string;
  recent_education?: string;
  passing_year?: string;
  cgpa?: string;
};

type AddInquiryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (inquiry: NewInquiryData) => void;
};

const AddInquiryDialog = ({ open, onOpenChange, onSubmit }: AddInquiryDialogProps) => {
  const [newInquiry, setNewInquiry] = useState<NewInquiryData>({
    full_name: "",
    phone_number: "",
    date_of_birth: "",
    gender: "",
    email: "",
    reference: "",
    current_address: "",
    permanent_address: "",
    course_selection: "",
    course_duration: "",
    user_availability: "",
    job_guarentee: "",
    job_assistance: "",
    job_location: "",
    expected_package: "",
    future_goal: "",
    career_transition_reason: "",
    recent_education: "",
    passing_year: "",
    cgpa: "",
  });

  const handleChange = (field: keyof NewInquiryData, value: string) => {
    setNewInquiry((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSubmit(newInquiry);
    setNewInquiry({
      full_name: "",
      phone_number: "",
      date_of_birth: "",
      gender: "",
      email: "",
      reference: "",
      current_address: "",
      permanent_address: "",
      course_selection: "",
      course_duration: "",
      user_availability: "",
      job_guarentee: "",
      job_assistance: "",
      job_location: "",
      expected_package: "",
      future_goal: "",
      career_transition_reason: "",
      recent_education: "",
      passing_year: "",
      cgpa: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>Add Inquiry</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add New Inquiry</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          <div>
            <Label>Full Name</Label>
            <Input
              value={newInquiry.full_name}
              onChange={(e) => handleChange("full_name", e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Phone Number</Label>
            <Input
              type="tel"
              value={newInquiry.phone_number}
              onChange={(e) => handleChange("phone_number", e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Date of Birth</Label>
            <Input
              type="date"
              value={newInquiry.date_of_birth}
              onChange={(e) => handleChange("date_of_birth", e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Gender</Label>
            <Select
              value={newInquiry.gender}
              onValueChange={(value) => handleChange("gender", value)}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Email</Label>
            <Input
              type="email"
              value={newInquiry.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Reference</Label>
            <Input
              value={newInquiry.reference}
              onChange={(e) => handleChange("reference", e.target.value)}
              required
            />
          </div>
          <div className="md:col-span-2">
            <Label>Current Address</Label>
            <Textarea
              value={newInquiry.current_address}
              onChange={(e) => handleChange("current_address", e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <Label>Permanent Address</Label>
            <Textarea
              value={newInquiry.permanent_address}
              onChange={(e) => handleChange("permanent_address", e.target.value)}
            />
          </div>
          <div>
            <Label>Course Selection</Label>
            <Input
              value={newInquiry.course_selection}
              onChange={(e) => handleChange("course_selection", e.target.value)}
            />
          </div>
          <div>
            <Label>Course Duration</Label>
            <Input
              value={newInquiry.course_duration}
              onChange={(e) => handleChange("course_duration", e.target.value)}
            />
          </div>
          <div>
            <Label>User Availability</Label>
            <Input
              value={newInquiry.user_availability}
              onChange={(e) => handleChange("user_availability", e.target.value)}
            />
          </div>
          <div>
            <Label>Job Guarantee</Label>
            <Input
              value={newInquiry.job_guarentee}
              onChange={(e) => handleChange("job_guarentee", e.target.value)}
            />
          </div>
          <div>
            <Label>Job Assistance</Label>
            <Input
              value={newInquiry.job_assistance}
              onChange={(e) => handleChange("job_assistance", e.target.value)}
            />
          </div>
          <div>
            <Label>Job Location</Label>
            <Input
              value={newInquiry.job_location}
              onChange={(e) => handleChange("job_location", e.target.value)}
            />
          </div>
          <div>
            <Label>Expected Package</Label>
            <Input
              value={newInquiry.expected_package}
              onChange={(e) => handleChange("expected_package", e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <Label>Future Goal</Label>
            <Textarea
              value={newInquiry.future_goal}
              onChange={(e) => handleChange("future_goal", e.target.value)}
            />
          </div>
          <div className="md:col-span-2">
            <Label>Career Transition Reason</Label>
            <Textarea
              value={newInquiry.career_transition_reason}
              onChange={(e) => handleChange("career_transition_reason", e.target.value)}
            />
          </div>
          <div>
            <Label>Recent Education</Label>
            <Input
              value={newInquiry.recent_education}
              onChange={(e) => handleChange("recent_education", e.target.value)}
            />
          </div>
          <div>
            <Label>Passing Year</Label>
            <Input
              value={newInquiry.passing_year}
              onChange={(e) => handleChange("passing_year", e.target.value)}
            />
          </div>
          <div>
            <Label>CGPA</Label>
            <Input
              value={newInquiry.cgpa}
              onChange={(e) => handleChange("cgpa", e.target.value)}
            />
          </div>
        </div>
        <Button className="w-full mt-4" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default AddInquiryDialog;
