
export interface InquiryBodyInput {
  "Full Name": string;
  "Phone Number": string;
  "Date of Birth": string; // ISO format (e.g., "2025-06-05" or "6/5/2025")
  "Gender": string;
  "Email Address"?: string;
  "Email"?: string;
  "Reference": string;
  "Current Address"?: string;
  "Permanent Address"?: string;
  "Which course are you looking for?"?: string;
  "Course Duration"?: string;
  "How many hours can you invest daily / monthly?"?: string;
  "Are you looking for 100% Job guarantee?"?: string;
  "Are you interested in Job Assistance?"?: string;
  "Preferred Job Location"?: string;
  "How much package do you wish to have?"?: string;
  "Where do you want to see yourself after 5 years?"?: string;
  "Why do you want to shift into IT from any other field? (For Non - Technical)"?: string;
  "Last Education"?: string;
  "Passing Year"?: string;
  "CGPA"?: string;
  "Timestamp"?: string;
}

export interface InquiryBodyInput {
  full_name?: string;
  phone_number?: number | string;
  date_of_birth?: string;
  gender?: string;
  email?: string | null;
  reference?: string;
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
  passing_year?: string | number | null;
  cgpa?: string | number | null;
}