import { UserProfile } from "../types/UserProfile";
import { api } from "./api"; // If you have a base `api` instance or simply use fetch/axios directly

// GET all user profiles
export async function getUserProfiles(): Promise<UserProfile[]> {
  const response = await fetch("/api/profiles/");
  if (!response.ok) {
    throw new Error("Failed to fetch user profiles");
  }
  return response.json();
}

// GET a single user profile (by ID)
export async function getUserProfile(id: number): Promise<UserProfile> {
  const response = await fetch(`/api/profiles/${id}/`);
  if (!response.ok) {
    throw new Error(`Failed to fetch user profile with ID ${id}`);
  }
  return response.json();
}

// CREATE a new user profile
export async function createUserProfile(data: Partial<UserProfile>): Promise<UserProfile> {
  const response = await fetch("/api/profiles/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Failed to create user profile");
  }
  return response.json();
}

// UPDATE an existing user profile
export async function updateUserProfile(id: number, data: Partial<UserProfile>): Promise<UserProfile> {
  const response = await fetch(`/api/profiles/${id}/`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to update user profile with ID ${id}`);
  }
  return response.json();
}

// DELETE a user profile
export async function deleteUserProfile(id: number): Promise<void> {
  const response = await fetch(`/api/profiles/${id}/`, { method: "DELETE" });
  if (!response.ok) {
    throw new Error(`Failed to delete user profile with ID ${id}`);
  }
}
