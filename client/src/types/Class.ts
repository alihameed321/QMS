// src/types/Class.ts

export interface Class {
    id: number; // Unique identifier for the class
    assigned_faculty: number; // ID of the assigned faculty (UserProfile ID)
    school_year: string; // School year (e.g., "2023-2024")
    level: string; // Class level (e.g., "Grade 10")
    name: string; // Name of the class (e.g., "Section A")
  }
  