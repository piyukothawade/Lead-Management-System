// src/pages/Register.jsx
import { useState } from "react";
import { Input } from "../leads/components/ui/input";
import { Button } from "../leads/components/ui/button";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    localStorage.setItem("user", JSON.stringify(form));
    alert("Registered successfully!");
    navigate("/login");
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-[#2E073F] via-[#7A1CAC] to-[#AD49E1]">

      {/* Glow Background */}
      <div className="absolute w-[400px] h-[400px] bg-purple-500 rounded-full blur-3xl opacity-30 top-10 left-10" />
      <div className="absolute w-[300px] h-[300px] bg-pink-500 rounded-full blur-3xl opacity-30 bottom-10 right-10" />

      {/* Glass Card */}
      <div className="glass glow p-8 rounded-2xl w-[380px] text-white">

        <h2 className="text-2xl font-semibold text-center mb-2">
          Create Account 🚀
        </h2>

        <p className="text-sm text-center text-white/70 mb-6">
          Start your journey with us
        </p>

        <div className="space-y-4">

          <Input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="bg-white/20 border-none text-white placeholder:text-white/60"
          />

          <Input
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="bg-white/20 border-none text-white placeholder:text-white/60"
          />

          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="bg-white/20 border-none text-white placeholder:text-white/60"
          />

          <Button
            onClick={handleRegister}
            className="w-full bg-white text-[var(--primary)] hover:bg-[var(--light)]"
          >
            Register
          </Button>

          <p className="text-sm text-center text-white/70">
            Already have an account?{" "}
            <Link to="/login" className="text-white font-medium underline">
              Login
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}

export default Register;