import React, { useEffect, useState } from "react";
import axios from "axios";

const Settings = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await axios.get("https://banao-tech-tplv.onrender.com/me", {
        withCredentials: true,
      });
      setUser(res.data);
    } catch {
      setMessage("Failed to load user info");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage("");

    if (form.newPassword !== form.confirmPassword) {
      setMessage("New passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "https://banao-tech-tplv.onrender.com/change-password",
        {
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        },
        { withCredentials: true }
      );

      setMessage(res.data.message || "Password updated successfully");
      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setMessage(err.response?.data?.message || "Error changing password");
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white px-6 pt-32">

      <div className="max-w-3xl mx-auto bg-[#16161d] p-10 rounded-2xl border border-[#222] shadow-xl">

        <h1 className="text-3xl font-semibold mb-8">Account Settings</h1>

        {/* USER INFO */}
        {user && (
          <div className="mb-10 space-y-4">
            <div>
              <label className="text-gray-400 text-sm">Username</label>
              <div className="bg-[#0b0b0f] p-3 rounded-lg border border-[#222]">
                {user.username}
              </div>
            </div>

            <div>
              <label className="text-gray-400 text-sm">Email</label>
              <div className="bg-[#0b0b0f] p-3 rounded-lg border border-[#222]">
                {user.email}
              </div>
            </div>
          </div>
        )}

        {/* CHANGE PASSWORD */}
        <h2 className="text-xl font-semibold mb-4">Change Password</h2>

        <form onSubmit={handlePasswordChange} className="space-y-4">

          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={form.currentPassword}
            onChange={handleChange}
            required
            className="w-full bg-[#0b0b0f] border border-[#222] p-3 rounded-lg focus:outline-none focus:border-purple-500 transition"
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            required
            className="w-full bg-[#0b0b0f] border border-[#222] p-3 rounded-lg focus:outline-none focus:border-purple-500 transition"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="w-full bg-[#0b0b0f] border border-[#222] p-3 rounded-lg focus:outline-none focus:border-purple-500 transition"
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-[#ff7eb3] to-[#8054ff] hover:scale-105 transition"
          >
            Update Password
          </button>
        </form>

        {/* MESSAGE */}
        {message && (
          <div className="mt-6 text-sm text-center text-pink-400">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
