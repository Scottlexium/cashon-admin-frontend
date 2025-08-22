"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PowerIcon } from "@/components/icons";
import { authService } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await authService.login({ email, password });
      if (result.success) {
        router.push("/dashboard");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1112] text-white flex items-center justify-center py-12 sm:px-6 lg:px-8">
      {/* Centered card with subtle backdrop */}
      <div className="relative w-full max-w-sm">
        {/* Logo badge overlapping the card */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-20">
          <PowerIcon className="w-[84px] h-[84px]" />
        </div>

        <div className="relative bg-[#15181A] border border-[#26292B] rounded-2xl pt-12 pb-8 px-6 shadow-lg">
          <div className="text-center mb-4">
            <h1 className="text-lg font-semibold">CashOn Admin Login</h1>
            <p className="text-sm text-gray-400 mt-1">
              Sign in to your admin dashboard
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-[#2D1010] border border-[#6B1F1F] text-[#FFB4B4] px-3 py-2 rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm text-gray-300"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="mt-2 block w-full bg-[#2A2C2E] border border-[#3A3C3E] rounded-md px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00E6A3]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm text-gray-300"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-2 block w-full bg-[#2A2C2E] border border-[#3A3C3E] rounded-md px-3 py-2 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00E6A3]"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-300">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="h-4 w-4 text-[#00E6A3] bg-[#2A2C2E] border-[#3A3C3E] rounded"
                />
                <span className="ml-2">Show Password</span>
              </label>

              <div className="flex items-center">
                <label className="flex items-center text-gray-300 mr-4">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-[#00E6A3] bg-[#2A2C2E] border-[#3A3C3E] rounded"
                  />
                  <span className="ml-2">Remember me</span>
                </label>
                <a
                  href="#"
                  className="text-[#A9FBD1] hover:underline"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-md py-2 text-sm font-medium bg-gradient-to-r from-[#00E6A3] to-[#2DF0B0] text-black shadow-md hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
