import api from "./api"; // Your Axios instance
import { Course } from "../types/Course";

export async function getCourses(): Promise<Course[]> {
  const response = await api.get("/courses/");
  return response.data; // an array of Course objects
}

export async function getCourse(id: number): Promise<Course> {
  const response = await api.get(`/courses/${id}/`);
  return response.data;
}

export async function createCourse(data: Partial<Course>): Promise<Course> {
  const response = await api.post("/courses/", data);
  return response.data;
}

export async function updateCourse(
  id: number,
  data: Partial<Course>
): Promise<Course> {
  const response = await api.put(`/courses/${id}/`, data);
  return response.data;
}

export async function deleteCourse(id: number): Promise<void> {
  await api.delete(`/courses/${id}/`);
}
