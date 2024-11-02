import { ObjectId } from 'mongodb';
export interface MyMessage {
    role: 'user' | 'system';
    content: string;
  }
export interface Candidate {
    _id: ObjectId;
    personal_information: PersonalInformation;
    education: Education[];
    certifications: string[];
    skills: string[];
    tools: string[];
    profile: string;
    experience: Experience[];
    technical_environment: string[];
    languages: string[];
    projects: Project[];
    hobbies: string[];
    references: string[];
    additional_information: AdditionalInformation;
}

interface PersonalInformation {
    name: string;
    job_title: string;
    contact: Contact[];
}

interface Contact {
    type: string;  // e.g., "email", "phone"
    value: string;
}

interface Education {
    institution: string;
    degree: string;
    year: number;
}

interface Experience {
    company: string;
    role: string;
    duration: string;
    description: string;
}

interface Project {
    name: string;
    description: string;
    technologies: string[];
}

interface AdditionalInformation {
    [key: string]: any;  // Allow for additional fields as key-value pairs
}
