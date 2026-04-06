"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { FormField } from "@/components/ui/FormField";
import { TextInput } from "@/components/ui/TextInput";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";

const SocialButton = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => (
  <button
    onClick={onClick}
    className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white border
      border-stone-200 rounded-xl text-sm font-medium text-stone-600
      hover:bg-stone-50 hover:border-stone-300 transition-all"
  >
    {children}
  </button>
);

export const LoginView = () => {
  const { login, loginAsGuest } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState("");

  const validate = () => {
    const e: typeof errors = {};
    if (!email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) return setErrors(errs);
    setErrors({});
    setIsLoading(true);
    try {
      await login({ email, password, rememberMe });
      router.replace("/discover");
    } catch {
      setErrors({ password: "Invalid email or password" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocial = () => {
    loginAsGuest();
    router.replace("/discover");
  };

  const handleForgot = () => {
    setToast("Password reset link sent — check your inbox.");
    setTimeout(() => setToast(""), 3500);
  };

  return (
    <div className="min-h-screen bg-[#F6F2EC] flex">
      {/* Left panel — decorative */}
      <div className="hidden lg:flex lg:w-[45%] bg-stone-900 flex-col justify-between p-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 70%, #C05A32 0%, transparent 60%)",
          }}
        />
        <span className="font-cormorant text-[28px] font-semibold text-[#F6F2EC] relative z-10">
          Spa<span className="text-[#C05A32]">ce</span>s
        </span>
        <div className="relative z-10">
          <p className="font-cormorant text-[42px] font-semibold text-[#F6F2EC] leading-tight mb-4">
            Find the perfect space for every occasion.
          </p>
          <p className="text-stone-400 text-sm leading-relaxed">
            Studios, boardrooms, rooftops, gardens — curated spaces for work,
            events, and everything in between.
          </p>
        </div>
        <p className="text-stone-600 text-xs relative z-10">
          © 2025 Spaces Inc.
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 text-center">
            <span className="font-cormorant text-[28px] font-semibold text-stone-800">
              Spa<span className="text-[#C05A32]">ce</span>s
            </span>
          </div>

          <h1 className="font-cormorant text-[32px] font-semibold text-stone-800 mb-1">
            Welcome back
          </h1>
          <p className="text-sm text-stone-400 mb-8">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-[#C05A32] hover:underline underline-offset-4"
            >
              Sign up
            </Link>
          </p>

          {/* Social buttons */}
          <div className="flex gap-3 mb-6">
            <SocialButton onClick={handleSocial}>
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </SocialButton>
            <SocialButton onClick={handleSocial}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#00A4EF">
                <path d="M11.5 2H2v9.5h9.5V2zm1 0v9.5H22V2h-9.5zm-1 10.5H2V22h9.5v-9.5zm1 0V22H22v-9.5h-9.5z" />
              </svg>
              Microsoft
            </SocialButton>
            <SocialButton onClick={handleSocial}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              Apple
            </SocialButton>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-xs text-stone-400">
              or continue with email
            </span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField label="Email" error={errors.email}>
              <TextInput
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors((p) => ({ ...p, email: undefined }));
                }}
                placeholder="you@example.com"
                error={!!errors.email}
              />
            </FormField>

            <FormField
              label="Password"
              error={errors.password}
              rightLabel={
                <button
                  type="button"
                  onClick={handleForgot}
                  className="text-xs text-stone-400 hover:text-[#C05A32] transition-colors"
                >
                  Forgot password?
                </button>
              }
            >
              <PasswordInput
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors((p) => ({ ...p, password: undefined }));
                }}
                placeholder="••••••••"
                error={!!errors.password}
              />
            </FormField>

            <label className="flex items-center gap-2.5 cursor-pointer group">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-stone-300 accent-[#C05A32] cursor-pointer"
              />
              <span className="text-sm text-stone-500 group-hover:text-stone-700 transition-colors">
                Remember me
              </span>
            </label>

            <Button
              type="submit"
              size="lg"
              className="w-full"
              isLoading={isLoading}
              loadingLabel="Signing in…"
            >
              {" "}
              Sign in
            </Button>
          </form>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-stone-900 text-[#F6F2EC]
          text-sm px-5 py-3 rounded-xl shadow-lg animate-in slide-in-from-bottom-4 duration-300"
        >
          {toast}
        </div>
      )}
    </div>
  );
};
