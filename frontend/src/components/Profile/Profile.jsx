import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setName(user?.name || "");
    setAvatarUrl(user?.avatarUrl || "");
  }, [user]);

  const saveProfile = async () => {
    if (
      (name.trim() === "" || name === user?.name) &&
      (avatarUrl.trim() === "" || avatarUrl === user?.avatarUrl)
    ) {
      setMessage("No changes to update.");
      return;
    }

    try {
      const updatedUser = await api.put("/users/me", { name, avatarUrl });
      setUser(updatedUser.data);
      setMessage("Profile updated!");
    } catch {
      setMessage("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen min-w-[320px] bg-[var(--bg-color)] p-8 font-cute flex flex-col items-center">
      <h2 className="text-4xl font-bold text-[var(--text-color)] mb-8">
        Your Profile
      </h2>

      <div className="w-full max-w-md bg-[var(--form-bg)] p-8 rounded-3xl shadow-form-neumorphism text-[var(--text-color)]">
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded-xl bg-[var(--input-bg)] shadow-deep-inset text-[var(--text-color)] placeholder:text-[var(--placeholder-color)] focus:outline-none focus:shadow-button-neumorphism transition"
            placeholder="Your name"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold">Avatar URL:</label>
          <input
            type="text"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className="w-full p-3 rounded-xl bg-[var(--input-bg)] shadow-deep-inset text-[var(--text-color)] placeholder:text-[var(--placeholder-color)] focus:outline-none focus:shadow-button-neumorphism transition"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>

        {avatarUrl && (
          <div className="mb-6 flex justify-center">
            <img
              src={avatarUrl}
              alt="Avatar preview"
              className="w-24 h-24 rounded-full object-cover shadow-lg"
            />
          </div>
        )}

        <div className="flex justify-between items-center gap-4">
          <button
            onClick={saveProfile}
            className="flex-grow px-6 py-3 rounded-xl bg-[var(--button-bg)] shadow-button-neumorphism hover:shadow-button-neumorphism-hover text-[var(--text-color)] font-semibold transition"
            aria-label="Save Profile"
          >
            Save
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 rounded-xl bg-[var(--button-bg)] shadow-button-neumorphism hover:shadow-button-neumorphism-hover text-[var(--text-color)] font-semibold transition"
            aria-label="Go Back to Decks"
          >
            Go Back
          </button>
        </div>

        {message && (
          <p className="mt-6 text-center text-sm font-semibold text-[var(--text-color)] select-none">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
