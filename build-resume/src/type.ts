  interface Experience {
  role: string;
  company: string;
  start: string;
  end: string;
  description: string;
}

interface Education {
  degree: string;
  institute: string;
  branch?: string;
  gpa?: string;
  start?: string;
}

export interface ResumeCardProps {
  title: string;
  _id: string;
  userId: string;
  fullName?: string;
  profession?: string;
  email?: string;
  summary?: string;
  experience?: Experience[];
  education?: Education[];
  skills?: string[];
  className?: string;
  phone?: string;
  city?: string;
  linkedin?: string;
  website?: string;
}