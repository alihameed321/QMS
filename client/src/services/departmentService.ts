import api from "./api"; // Your Axios instance
import { Department } from "../types/Department";





/**
 * Fetch all departments
 */
export async function getDepartments(): Promise<Department[]> {
  const response = await api.get("/departments/");
  return response.data;
}

/**
 * Fetch a single department by ID
 */
export async function getDepartment(id: number): Promise<Department> {
  const response = await api.get(`/departments/${id}/`);
  return response.data;
}

/**
 * Create a new department
 */
export async function createDepartment(data: Partial<Department>): Promise<Department> {
  const response = await api.post("/departments/", data);
  return response.data;
}

/**
 * Update an existing department
 */
export async function updateDepartment(
  id: number,
  data: Partial<Department>
): Promise<Department> {
  const response = await api.put(`/departments/${id}/`, data);
  return response.data;
}

/**
 * Delete a department
 */
export async function deleteDepartment(id: number): Promise<void> {
  await api.delete(`/departments/${id}/`);
}
