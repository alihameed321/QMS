// src/components/features/userProfile/UserProfileList.tsx
import React, { useEffect, useState } from "react";
import { getUserProfiles } from "../../../services/userService";
import { UserProfile } from "../../../types/UserProfile";
import Card from "../common/Card"; // Assuming you have a Card.tsx

const UserProfileList: React.FC = () => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await getUserProfiles();
        setProfiles(data);
      } catch (err: any) {
        setError(err.message || "Error fetching user profiles");
      }
    };

    fetchProfiles();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      <h2>User Profiles</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1rem",
        }}
      >
        {profiles.map((profile) => (
          <Card key={profile.id}>
            <h3>User ID: {profile.user}</h3>
            <p>Contact: {profile.contact}</p>
            {profile.dob && <p>Date of Birth: {profile.dob}</p>}
            {profile.avatar && (
              <div>
                <img src={profile.avatar} alt="User avatar" width="100" />
              </div>
            )}
            {/* Add more fields as needed */}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserProfileList;
