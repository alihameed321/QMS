import { UserProfile } from "../types/UserProfile";
import api from "./api";

export async function getUserProfiles(): Promise<UserProfile[]> {
  const response = await api.get("/profiles/");
  return response.data;
}

export async function getUserProfile(id: number): Promise<UserProfile> {
  const response = await api.get(`/profiles/${id}/`);
  return response.data;
}

export async function createUserProfile(data: Partial<UserProfile>): Promise<UserProfile> {
  if (!data.user) {
    throw new Error('User ID is required');
  }
  const response = await api.post("/profiles/", data);
  return response.data;
}

export async function updateUserProfile(id: number, data: Partial<UserProfile>): Promise<UserProfile> {
  const response = await api.put(`/profiles/${id}/`, data);
  return response.data;
}

export async function deleteUserProfile(id: number): Promise<void> {
  await api.delete(`/profiles/${id}/`);
}