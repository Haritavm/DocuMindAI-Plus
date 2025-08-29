"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";


export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);   // ✅ handles spinner state
  const [error, setError] = useState("");          // ✅ handles error messages

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/qraptor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          agentName: "LoginAgent", // ✅ required for Qraptor
          userVariables: {
            input_email: "admin123@gmail.com",
            input_password: "admin123",
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      // ✅ save Qraptor response values (adapt keys as per actual response)
      localStorage.setItem("login_status", data.login_status || "");
      localStorage.setItem("user_id", data.user_id || "");
      localStorage.setItem("role", data.role || "");

      router.push("/role"); // redirect after login success
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
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

        <h2 className="text-lg font-semibold text-gray-800 text-center">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 text-sm">
          Login to continue to your account
        </p>

        {/* Error */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <form className="space-y-4" onSubmit={handleLogin}>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          <div className="flex items-center justify-between">
            <Link href="#" className="text-sm text-indigo-600 hover:underline">
              Forgot Password?
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="relative flex items-center">
          <div className="flex-grow border-t" />
          <span className="px-2 text-gray-400 text-sm">OR</span>
          <div className="flex-grow border-t" />
        </div>

        <Button variant="outline" className="w-full flex gap-2 justify-center cursor-pointer">
          <img src="/google.svg" alt="google" className="h-5 w-5" />
          Continue with Google
        </Button>

        <Button variant="outline" className="w-full flex gap-2 justify-center cursor-pointer">
          <img src="/microsoft.svg" alt="microsoft" className="h-5 w-5" />
          Continue with Microsoft
        </Button>

        <p className="text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-indigo-600 font-medium hover:underline">
            Sign up
          </Link>
        </p>

        <p className="text-center text-xs text-gray-400">
          Terms of Service • Privacy Policy
        </p>
      </div>
    </main>
  );
}
