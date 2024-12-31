import api from "./api";
import { Class } from "../types/Class";

// Fetch all classes
export async function getClasses(): Promise<Class[]> {
  const response = await api.get("/classes/");
  return response.data;
}

// Fetch a single class by ID
export async function getClass(id: number): Promise<Class> {
  const response = await api.get(`/classes/${id}/`);
  return response.data;
}

// Create a new class
export async function createClass(data: Partial<Class>): Promise<Class> {
  const response = await api.post("/classes/", data);
  return response.data;
}

// Update an existing class
export async function updateClass(
  id: number,
  data: Partial<Class>
): Promise<Class> {
  const response = await api.put(`/classes/${id}/`, data);
  return response.data;
}

// Delete a class
export async function deleteClass(id: number): Promise<void> {
  await api.delete(`/classes/${id}/`);
}
