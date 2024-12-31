import api from "./api";
import { Student } from "../types/Student";

/**
 * Fetch all students
 */
export async function getStudents(): Promise<Student[]> {
  const response = await api.get("/students/");
  return response.data;
}

/**
 * Fetch a single student by ID
 */
export async function getStudent(id: number): Promise<Student> {
  const response = await api.get(`/students/${id}/`);
  return response.data;
}

/**
 * Create a new student
 */
export async function createStudent(data: Partial<Student>): Promise<Student> {
  const response = await api.post("/students/", data);
  return response.data;
}

/**
 * Update an existing student
 */
export async function updateStudent(
  id: number,
  data: Partial<Student>
): Promise<Student> {
  const response = await api.put(`/students/${id}/`, data);
  return response.data;
}

/**
 * Delete a student
 */
export async function deleteStudent(id: number): Promise<void> {
  await api.delete(`/students/${id}/`);
}
