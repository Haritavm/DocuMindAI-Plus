"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function SignupUser() {
  const router = useRouter();

  // form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // submit handler
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    // 🔹 For now, just simulate success
    setTimeout(() => {
      setLoading(false);
      router.push("/role"); // redirect to login
    }, 1200);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-indigo-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold">
            DocuMind<span className="text-indigo-600">AI+</span>
          </h1>
          <p className="text-gray-500 text-sm">
            Your AI-powered Legal & Compliance Assistant
          </p>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-800 text-center">
          Create Account
        </h2>

        {/* Error */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSignup}>
          <Input
            id="name"
            type="text"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
          />

          {/* Password */}
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-500"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          {/* Divider */}
          <div className="relative flex items-center">
            <div className="flex-grow border-t" />
            <span className="px-2 text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t" />
          </div>

          {/* Socials */}
          <Button
            variant="outline"
            className="w-full flex gap-2 justify-center"
          >
            <img src="/google.svg" alt="google" className="h-5 w-5" />
            Sign up with Google
          </Button>

          <Button
            variant="outline"
            className="w-full flex gap-2 justify-center"
          >
            <img src="/microsoft.svg" alt="microsoft" className="h-5 w-5" />
            Sign up with Microsoft
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Log in
          </Link>
        </p>

        <p className="text-center text-xs text-gray-400">
          Terms of Service • Privacy Policy
        </p>
      </div>
    </main>
  );
}
