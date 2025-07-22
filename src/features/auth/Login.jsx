import React, { useState } from "react";
import axios from "axios";

const Login = ({ onSwitch }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
const res = await axios.post("https://oddo-hackathon.onrender.com/api/auth/login", {
  email: form.email,
  password: form.password,
});

const { token, user } = res.data;
const role = user.role;

// Save token and role locally
localStorage.setItem("token", token);
localStorage.setItem("role", role);

if (role !== "admin") {
  alert("Access denied: Not an admin");
  return;
}

alert("Login successful ✅");
onSwitch("dashboard"); // Redirect to dashboard

  } catch (err) {
    console.error(err.response?.data || err);
    alert(err.response?.data?.message || "Login failed.");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center mb-8">Sign in to your account</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
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
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              👁️
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-2 rounded"
          >
            Sign in
          </button>
        </form>
        <div className="text-center mt-4">
          <span className="text-gray-600">Need an account? </span>
          <button
            className="text-indigo-600 hover:underline font-semibold"
            onClick={() => onSwitch("register")}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
