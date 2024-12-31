// src/types/Student.ts

export interface Student {
    id: number; // Primary key of the student
    student_code?: string; // Optional unique student code
    course: number; // Foreign key to the Course
    first_name: string; // First name of the student
    middle_name?: string; // Optional middle name
    last_name: string; // Last name of the student
    gender?: "Male" | "Female"; // Gender (optional)
    dob?: string; // Date of birth (ISO format, optional)
    contact?: string; // Optional contact number
    date_added: string; // Date when the student was added
    date_updated: string; // Date of last update
  }
  