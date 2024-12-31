import api from "./api";
import { Attendance } from "../types/Attendance";

/**
 * Fetch all attendance records
 */
export async function getAttendances(): Promise<Attendance[]> {
  const response = await api.get("/attendances/");
  return response.data;
}

/**
 * Fetch a single attendance record by ID
 */
export async function getAttendance(id: number): Promise<Attendance> {
  const response = await api.get(`/attendances/${id}/`);
  return response.data;
}

/**
 * Create a new attendance record
 */
export async function createAttendance(data: Partial<Attendance>): Promise<Attendance> {
    console.log("Sending data to backend:", data); // Debug log
    const response = await api.post("/attendances/", data);
    return response.data;
  }

/**
 * Update an existing attendance record
 */
export async function updateAttendance(
  id: number,
  data: Partial<Attendance>
): Promise<Attendance> {
  const response = await api.put(`/attendances/${id}/`, data);
  return response.data;
}

/**
 * Delete an attendance record
 */
export async function deleteAttendance(id: number): Promise<void> {
  await api.delete(`/attendances/${id}/`);
}
