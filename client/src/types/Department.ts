// src/types/Department.ts

export interface Department {
    id: number; // This will be included automatically by Django REST Framework
    name: string; // Department name (required, max 250 characters)
    description?: string; // Optional field for description
    status: number; // Integer status, 1 for active, others for different statuses
    date_added: string; // ISO string for date the department was added
    date_updated: string; // ISO string for last update to the department
  }
  