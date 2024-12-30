export interface UserProfile {
    id: number;
    user: number; // This is the User foreign key ID from Django
    contact: string;
    dob?: string; // e.g., "1990-01-01", can be null
    address?: string;
    avatar?: string; // URL or path to the image
    user_type: number; // 2 by default
    gender?: 'Male' | 'Female';
    department?: number | null; // Department foreign key
  }
  