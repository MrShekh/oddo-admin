import React, { useState } from "react";
import axios from "axios";

const Register = ({ onSwitch }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post("https://oddo-hackathon.onrender.com/api/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role  // "admin" or "user"
      });

      alert("Registered successfully!");
      console.log(res.data);
      onSwitch("login"); // Switch to login screen after success
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center mb-8">Create a new account</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              👁️
            </button>
          </div>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              👁️
            </button>
          </div>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded"
          >
            <option value="">Select Role</option>
            <option value="user">User</option>
            <option value="admin">admin</option>
          </select>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded"
          >
            Register
          </button>
        </form>
        <div className="text-center mt-4">
          <span>Already have an account? </span>
          <button className="text-indigo-600" onClick={() => onSwitch("login")}>
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
