export type UserRole = 'Admin' | 'Teacher' | 'Student' | 'Parent' | 'Manager';

export const USER_ROLES = {
  ADMIN: 1,
  TEACHER: 2,
  STUDENT: 3,
  PARENT: 4,
  MANAGER: 5,
} as const;

export interface UserProfile {
  id: number;
  user: number;
  username?: string;
  email?: string;
  contact: string;
  dob?: string;
  address?: string;
  avatar?: string;
  user_type: typeof USER_ROLES[keyof typeof USER_ROLES];
  role?: UserRole;
  gender?: 'Male' | 'Female';
  department?: number | null;
}

// Helper functions to check user roles
export const isAdmin = (profile?: UserProfile): boolean => profile?.user_type === USER_ROLES.ADMIN;
export const isTeacher = (profile?: UserProfile): boolean => profile?.user_type === USER_ROLES.TEACHER;
export const isStudent = (profile?: UserProfile): boolean => profile?.user_type === USER_ROLES.STUDENT;
export const isParent = (profile?: UserProfile): boolean => profile?.user_type === USER_ROLES.PARENT;
export const isManager = (profile?: UserProfile): boolean => profile?.user_type === USER_ROLES.MANAGER;