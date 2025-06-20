export type InquiryListEntry = {
  id: string; // BigInt in Prisma, usually mapped to number in TS
  full_name: string;
  phone_number: number; // Decimal mapped to number, or string if very large
  date_of_birth: string; // DateTime usually handled as ISO string in frontend
  gender: string;
  email?: string | null; // email is optional in schema
  reference: string;
  created_at: string; // DateTime handled as ISO string
  age: number;
};

export type InquiryListProps = {
  data: InquiryListEntry[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};

export type Inquiry = {
  id: string;
  created_at: string;
  full_name: string;
  phone_number: number | string;
  date_of_birth: string;
  gender: string;
  email?: string | null;
  reference: string;
  current_address?: string | null;
  permanent_address?: string | null;
  course_selection?: string | null;
  course_duration?: string | null;
  user_availability?: string | null;
  job_guarentee?: string | null;
  job_assistance?: string | null;
  job_location?: string | null;
  expected_package?: string | null;
  future_goal?: string | null;
  career_transition_reason?: string | null;
  recent_education?: string | null;
  passing_year?: string | null;
  cgpa?: string | null;
  age: number;
};

export type FormState = {
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
