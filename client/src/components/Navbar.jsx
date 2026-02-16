import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await axios.get(
        "https://banao-tech-tplv.onrender.com/isloggedin",
        { withCredentials: true }
      );
      if (res.status === 200) setIsLoggedIn(true);
    } catch {
      setIsLoggedIn(false);
    }
  };

  const resetForm = () => {
    setForm({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignup) {
        if (form.password !== form.confirmPassword) {
          alert("Passwords do not match");
          return;
        }

        await axios.post(
          "https://banao-tech-tplv.onrender.com/signup",
          {
            username: form.username,
            email: form.email,
            password: form.password,
          },
          { withCredentials: true }
        );
      } else {
        await axios.post(
          "https://banao-tech-tplv.onrender.com/signin",
          {
            email: form.email,
            password: form.password,
          },
          { withCredentials: true }
        );
      }

      setIsLoggedIn(true);
      setShowModal(false);
      resetForm(); 
      navigate("/"); // Optional redirect after login
    } catch (err) {
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Something went wrong");
      }
    }
  };

  const logout = async () => {
    try {
      const res = await axios.get(
        "https://banao-tech-tplv.onrender.com/logout",
        { withCredentials: true }
      );

      if (res.status === 200) {
        setIsLoggedIn(false);
        resetForm();
        setShowModal(false);
        navigate("/"); 
      }
    } catch {
      alert("Logout failed");
    }
  };

  return (
    <>
   
      <header className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-[#1c1c25]">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-10 py-5">

          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-semibold text-white tracking-wide hover:text-pink-400 transition"
          >
            Task1
          </Link>

          {isLoggedIn ? (
            <div className="flex items-center gap-6">

              <Link
                to="/settings"
                className="text-white hover:text-pink-400 transition"
              >
                Settings
              </Link>

              <Link
                to="/dashboard"
                className="text-white hover:text-pink-400 transition"
              >
                Dashboard
              </Link>

              <Link
                to="/user"
                className="text-white hover:text-pink-400 transition"
              >
                Users
              </Link>

              <button
                onClick={logout}
                className="px-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 hover:scale-105 transition-all duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                resetForm();
                setShowModal(true);
              }}
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#ff7eb3] to-[#8054ff] hover:opacity-80 hover:scale-105 transition-all duration-300 shadow-lg shadow-purple-500/20"
            >
              Sign In / Sign Up
            </button>
          )}
        </div>
      </header>

   
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

          <div className="bg-[#16161d] border border-[#222] w-96 p-8 rounded-2xl shadow-2xl relative">

            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              ✕
            </button>

            <h2 className="text-2xl text-white font-semibold mb-6 text-center">
              {isSignup ? "Create Account" : "Welcome Back"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              {isSignup && (
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0b0b0f] text-white border border-[#222] p-3 rounded-lg focus:outline-none focus:border-purple-500 transition"
                />
              )}

              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-[#0b0b0f] text-white border border-[#222] p-3 rounded-lg focus:outline-none focus:border-purple-500 transition"
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full bg-[#0b0b0f] text-white border border-[#222] p-3 rounded-lg focus:outline-none focus:border-purple-500 transition"
              />

              {isSignup && (
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#0b0b0f] text-white border border-[#222] p-3 rounded-lg focus:outline-none focus:border-purple-500 transition"
                />
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-[#ff7eb3] to-[#8054ff] hover:opacity-80 transition"
              >
                {isSignup ? "Register" : "Login"}
              </button>
            </form>

            <p className="text-center text-sm text-gray-400 mt-6">
              {isSignup
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <span
                onClick={() => setIsSignup(!isSignup)}
                className="text-pink-400 cursor-pointer hover:underline"
              >
                {isSignup ? "Sign In" : "Sign Up"}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
