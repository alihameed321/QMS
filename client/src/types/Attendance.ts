// src/types/Attendance.ts

export interface Attendance {
    id: number; // Primary key of the attendance record
    classIns: number; // Foreign key referencing Class
    student: number; // Foreign key referencing Student
    attendance_date: string; // Date of attendance (ISO format)
    type: "1" | "2" | "3"; // Attendance type: Present, Tardy, or Absent
    date_updated: string; // Last updated timestamp (ISO format)
  }
  