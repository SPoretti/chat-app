import React, { useState } from "react";
import { updateUserData } from "../../../firebase"; // Assume updateUserData is a function to update user data in Firebase

const UserProfile = ({ userData }: { userData: any }) => {
  const [user, setUser] = useState(userData);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserData(user.id, user);
      alert("Profile updated successfully");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <div>
      <h1>User Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={user.username || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email || ""}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
      {error && <p>Error: {error}</p>}
    </div>
  );
};

export default UserProfile;
