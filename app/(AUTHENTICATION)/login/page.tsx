"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { PowerIcon, MailIcon, EyeIcon } from "@/components/icons";
import { useAuthStore } from "@/lib/store/useAuthStore";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  
  const { login, isLoading, isAuthenticated, refreshUser } = useAuthStore();

  // Check if already authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated) {
        try {
          await refreshUser();
        } catch (error) {
          // User is not authenticated, stay on login page
        }
      }
    };

    checkAuth();
  }, [refreshUser, isAuthenticated]);

  // Redirect to dashboard if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await login({ email, password });
      toast.success('Welcome to CashOn Admin Dashboard!');
      router.push("/dashboard");
    } catch (err: any) {
      const errorMessage = err.message || "Invalid credentials. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-[#1B1B1DB8] text-white flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Centered card with subtle backdrop */}
      <div className="relative w-full max-w-xl mx-auto space-y-6 sm:space-y-10">
        {/* Logo badge overlapping the card */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
          <PowerIcon className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24" />
        </div>

        <div className="relative bg-[#212123] border border-[#26292B] rounded-2xl sm:rounded-3xl p-6 sm:pt-10 sm:pb-8 sm:px-10 shadow-lg">
          <div className="text-center mb-6 space-y-2 sm:space-y-3 sm:my-10">
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#DEDEE3]">CashOn Admin Login</h1>
            <p className="text-sm sm:text-base text-[#A2A2A7] font-medium">
              Sign in to your admin dashboard
            </p>
          </div>

          <form className="space-y-6 sm:space-y-8 mt-4 sm:mt-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-[#2D1010] border border-[#6B1F1F] text-[#FFB4B4] px-3 py-2 rounded-md text-xs sm:text-sm">
                {error}
              </div>
            )}

            <div>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                variant="filled"
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="mt-2 sm:mt-3"
                size="lg"
              />
            </div>

            <div>
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                label="Password"
                value={password}
                size="lg"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="mt-2 sm:mt-3"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <Checkbox
                id="show-password"
                checked={showPassword}
                onChange={setShowPassword}
                label={
                  <span className="text-[#A2A2A7] font-medium">Show Password</span>
                }
                variant="filled"
                size="sm"
              />
            </div>

            <div>
              <Button
                type="submit"
                disabled={isLoading}
                size="md"
                className="w-full rounded-md text-sm font-medium bg-[#3AF4BD] text-black shadow-md hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer sm:text-base"
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
