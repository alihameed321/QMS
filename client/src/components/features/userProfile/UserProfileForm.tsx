import React, { useState, FormEvent } from "react";
import { createUserProfile, updateUserProfile } from "../../../services/userService";
import { UserProfile } from "../../../types/UserProfile";

interface UserProfileFormProps {
  initialData?: Partial<UserProfile>;
  onSuccess?: (profile: UserProfile) => void;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ initialData = {}, onSuccess }) => {
  const [contact, setContact] = useState<string>(initialData.contact || "");
  const [dob, setDob] = useState<string>(initialData.dob || "");
  const [address, setAddress] = useState<string>(initialData.address || "");
  const [avatar, setAvatar] = useState<string>(initialData.avatar || "");
  const [gender, setGender] = useState<'Male' | 'Female' | undefined>(
    initialData.gender
  );

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const payload: Partial<UserProfile> = {
        contact,
        dob,
        address,
        avatar,
        gender,
        // user_type, department, etc. if needed
      };

      // If initialData has an id, we assume an update. Otherwise, create.
      let result: UserProfile;
      if (initialData.id) {
        result = await updateUserProfile(initialData.id, payload);
      } else {
        result = await createUserProfile(payload);
      }

      if (onSuccess) {
        onSuccess(result);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{initialData.id ? "Update" : "Create"} User Profile</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        <label>Contact:</label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
      </div>

      <div>
        <label>DOB:</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
      </div>

      <div>
        <label>Address:</label>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div>
        <label>Avatar:</label>
        <input
          type="text"
          placeholder="Avatar URL"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
      </div>

      <div>
        <label>Gender:</label>
        <select
          value={gender || ""}
          onChange={(e) => setGender(e.target.value as 'Male' | 'Female')}
        >
          <option value="">--Select--</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      {/* More fields like user_type, department, etc. if needed */}

      <button type="submit">{initialData.id ? "Update" : "Create"}</button>
    </form>
  );
};

export default UserProfileForm;
