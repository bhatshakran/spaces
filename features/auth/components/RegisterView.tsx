"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { RegisterCredentials } from "../types";

type FieldErrors = Partial<Record<keyof RegisterCredentials, string>>;

const Field = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div>
    <label className="block text-xs font-medium text-stone-600 mb-1.5">
      {label}
    </label>
    {children}
    {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
  </div>
);

const inputClass = (hasError: boolean) =>
  `w-full px-4 py-3 bg-white border rounded-xl text-sm text-stone-700
  placeholder:text-stone-300 focus:outline-none focus:ring-2 transition-all ${
    hasError
      ? "border-red-300 focus:border-red-400 focus:ring-red-100"
      : "border-stone-200 focus:border-[#C05A32] focus:ring-[#C05A32]/10"
  }`;

export const RegisterView = () => {
  const { register } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState<RegisterCredentials>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const set =
    (key: keyof RegisterCredentials) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((p) => ({ ...p, [key]: e.target.value }));
      setErrors((p) => ({ ...p, [key]: undefined }));
    };

  const validate = (): FieldErrors => {
    const e: FieldErrors = {};
    if (!form.firstName) e.firstName = "Required";
    if (!form.lastName) e.lastName = "Required";
    if (!form.email) e.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone) e.phone = "Required";
    if (!form.password) e.password = "Required";
    else if (form.password.length < 8) e.password = "Minimum 8 characters";
    if (!form.confirmPassword) e.confirmPassword = "Required";
    else if (form.password !== form.confirmPassword)
      e.confirmPassword = "Passwords don't match";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) return setErrors(errs);
    setIsLoading(true);
    try {
      await register(form);
      router.replace("/discover");
    } catch {
      setErrors({ email: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F2EC] flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-[45%] bg-stone-900 flex-col justify-between p-12 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 30%, #C05A32 0%, transparent 60%)",
          }}
        />
        <span className="font-cormorant text-[28px] font-semibold text-[#F6F2EC] relative z-10">
          Spa<span className="text-[#C05A32]">ce</span>s
        </span>
        <div className="relative z-10">
          <p className="font-cormorant text-[42px] font-semibold text-[#F6F2EC] leading-tight mb-4">
            Your next great event starts here.
          </p>
          <p className="text-stone-400 text-sm leading-relaxed">
            Join thousands of hosts and guests discovering spaces that make
            moments memorable.
          </p>
        </div>
        <p className="text-stone-600 text-xs relative z-10">
          © 2025 Spaces Inc.
        </p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <div className="lg:hidden mb-8 text-center">
            <span className="font-cormorant text-[28px] font-semibold text-stone-800">
              Spa<span className="text-[#C05A32]">ce</span>s
            </span>
          </div>

          <h1 className="font-cormorant text-[32px] font-semibold text-stone-800 mb-1">
            Create an account
          </h1>
          <p className="text-sm text-stone-400 mb-8">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#C05A32] hover:underline underline-offset-4"
            >
              Sign in
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name row */}
            <div className="grid grid-cols-2 gap-3">
              <Field label="First name" error={errors.firstName}>
                <input
                  value={form.firstName}
                  onChange={set("firstName")}
                  placeholder="Jane"
                  className={inputClass(!!errors.firstName)}
                />
              </Field>
              <Field label="Last name" error={errors.lastName}>
                <input
                  value={form.lastName}
                  onChange={set("lastName")}
                  placeholder="Smith"
                  className={inputClass(!!errors.lastName)}
                />
              </Field>
            </div>

            <Field label="Email" error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="you@example.com"
                className={inputClass(!!errors.email)}
              />
            </Field>

            <Field label="Phone" error={errors.phone}>
              <input
                type="tel"
                value={form.phone}
                onChange={set("phone")}
                placeholder="+1 (555) 000-0000"
                className={inputClass(!!errors.phone)}
              />
            </Field>

            <Field label="Password" error={errors.password}>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={set("password")}
                  placeholder="Minimum 8 characters"
                  className={inputClass(!!errors.password) + " pr-11"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {showPassword ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    ) : (
                      <>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </Field>

            <Field label="Confirm password" error={errors.confirmPassword}>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={set("confirmPassword")}
                  placeholder="Repeat your password"
                  className={inputClass(!!errors.confirmPassword) + " pr-11"}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {showConfirm ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      />
                    ) : (
                      <>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </Field>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 mt-2 bg-stone-900 text-[#F6F2EC] rounded-xl text-sm font-medium
                hover:bg-[#C05A32] transition-colors duration-300 disabled:opacity-60
                disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#F6F2EC]/30 border-t-[#F6F2EC] rounded-full animate-spin" />
                  Creating account…
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
