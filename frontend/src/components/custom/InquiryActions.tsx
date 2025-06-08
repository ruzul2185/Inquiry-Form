import React, { useState } from "react";
import { toast } from "sonner";

import ViewInquiryDialog from "./ViewInquiryDialog";
import UpdateInquiryDialog from "./UpdateInquiryDialog";
import DeleteInquiryDialog from "./DeleteInquiryDialog";

import { fetchGET, fetchPATCH, fetchDELETE } from "../../utils/FetchUtils";
import type { Inquiry } from "../../types/InquiryTypes";

// All form fields as strings for easy input binding
type FormState = {
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

interface InquiryActionsProps {
  id: string;
  onSuccess: () => void;
}

const InquiryActions: React.FC<InquiryActionsProps> = ({ id, onSuccess }) => {
  const [viewOpen, setViewOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [data, setData] = useState<Inquiry | null>(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<FormState>({
    full_name: "",
    phone_number: "",
    date_of_birth: "",
    age: "",
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

  // Converts Inquiry to form state by converting all fields to string safely
  const inquiryToForm = (inquiry: Inquiry): FormState => ({
    full_name: inquiry.full_name ?? "",
    phone_number: inquiry.phone_number?.toString() ?? "",
    date_of_birth: inquiry.date_of_birth ?? "",
    age: inquiry.age?.toString() ?? "",
    gender: inquiry.gender ?? "",
    email: inquiry.email ?? "",
    reference: inquiry.reference ?? "",
    current_address: inquiry.current_address ?? "",
    permanent_address: inquiry.permanent_address ?? "",
    course_selection: inquiry.course_selection ?? "",
    course_duration: inquiry.course_duration ?? "",
    user_availability: inquiry.user_availability ?? "",
    job_guarentee: inquiry.job_guarentee ?? "",
    job_assistance: inquiry.job_assistance ?? "",
    job_location: inquiry.job_location ?? "",
    expected_package: inquiry.expected_package ?? "",
    future_goal: inquiry.future_goal ?? "",
    career_transition_reason: inquiry.career_transition_reason ?? "",
    recent_education: inquiry.recent_education ?? "",
    passing_year: inquiry.passing_year ?? "",
    cgpa: inquiry.cgpa ?? "",
  });

  // Fetch inquiry and update both data and form states
  const fetchInquiry = async () => {
    setLoading(true);
    try {
      const json = await fetchGET<Inquiry>(`${import.meta.env.VITE_INQUIRY_ENDPOINT}/${id}`);
      setData(json);
      setForm(inquiryToForm(json));
    } catch (error) {
      toast.error("Failed to fetch inquiry data");
    } finally {
      setLoading(false);
    }
  };

  const openView = () => {
    setViewOpen(true);
    fetchInquiry();
  };

  const openUpdate = () => {
    setUpdateOpen(true);
    fetchInquiry();
  };

  const openDelete = () => {
    setDeleteOpen(true);
    fetchInquiry();
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Fields in Inquiry which are numbers and need conversion on update
  const numberFields: (keyof Inquiry)[] = [
    "phone_number",
    "age",
  ];

  // Prepare patch request only with changed fields, converting number fields as needed
  const handleUpdateSubmit = async () => {
    if (!data) return;

    const updatedFields: Partial<Inquiry> = {};

    for (const key in form) {
      const typedKey = key as keyof Inquiry;

      const originalValue = data[typedKey];
      const formValueStr = form[typedKey as keyof FormState];

      if (numberFields.includes(typedKey)) {
        if (formValueStr === "") {
          // Skip empty string for number fields (means clear or no change)
          continue;
        }
        const formValueNum = Number(formValueStr);
        if (isNaN(formValueNum)) {
          toast.error(`Invalid number input for field "${key}"`);
          return;
        }

        if (formValueNum !== originalValue) {
          updatedFields[typedKey] = formValueNum as any;
        }
      } else {
        // For string fields, compare as strings
        const originalStr = originalValue == null ? "" : String(originalValue);

        if (formValueStr !== originalStr) {
          updatedFields[typedKey] = formValueStr as any;
        }
      }
    }

    if (Object.keys(updatedFields).length === 0) {
      toast("No changes detected");
      return;
    }

    try {
      await fetchPATCH(`${import.meta.env.VITE_INQUIRY_ENDPOINT}/${id}`, updatedFields);
      toast.success("Inquiry updated successfully");
      setUpdateOpen(false);
      onSuccess();  // <--- call onSuccess here
      fetchInquiry();
      window.location.reload(); // Optional: remove if onSuccess handles UI updates
    } catch (error) {
      toast.error("Failed to update inquiry");
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await fetchDELETE(`${import.meta.env.VITE_INQUIRY_ENDPOINT}/${id}`);
      toast.success("Inquiry deleted successfully");
      setDeleteOpen(false);
      onSuccess();  // <--- call onSuccess here
      window.location.reload(); // Optional: remove if onSuccess handles UI updates
    } catch (error) {
      toast.error("Failed to delete inquiry");
    }
  };

  return (
    <>
      <div className="text-center space-x-2">
        <button
          onClick={openView}
          className="cursor-pointer px-3 py-1 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          View
        </button>
        <button
          onClick={openUpdate}
          className="cursor-pointer px-3 py-1 rounded-md bg-green-600 text-white text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Update
        </button>
        <button
          onClick={openDelete}
          className="cursor-pointer px-3 py-1 rounded-md bg-red-600 text-white text-sm font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Delete
        </button>
      </div>

      <ViewInquiryDialog
        open={viewOpen}
        setOpen={setViewOpen}
        loading={loading}
        data={data}
      />

      <UpdateInquiryDialog
        open={updateOpen}
        setOpen={setUpdateOpen}
        loading={loading}
        data={data}
        form={form}
        onChange={onChange}
        onSubmit={handleUpdateSubmit}
      />

      <DeleteInquiryDialog
        open={deleteOpen}
        setOpen={setDeleteOpen}
        onConfirm={handleDeleteConfirm}
        data={data}
      />
    </>
  );
};

export default InquiryActions;
