"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { RegisterCredentials } from "../types";
import { FormField } from "@/components/ui/FormField";
import { TextInput } from "@/components/ui/TextInput";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Button } from "@/components/ui/Button";

type FieldErrors = Partial<Record<keyof RegisterCredentials, string>>;

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
              <FormField label="First name" error={errors.firstName}>
                <TextInput
                  value={form.firstName}
                  onChange={set("firstName")}
                  placeholder="Jane"
                  error={!!errors.firstName}
                />
              </FormField>
              <FormField label="Last name" error={errors.lastName}>
                <TextInput
                  value={form.lastName}
                  onChange={set("lastName")}
                  placeholder="Smith"
                  error={!!errors.lastName}
                />
              </FormField>
            </div>

            <FormField label="Email" error={errors.email}>
              <TextInput
                type="email"
                value={form.email}
                onChange={set("email")}
                placeholder="you@example.com"
                error={!!errors.email}
              />
            </FormField>

            <FormField label="Phone" error={errors.phone}>
              <TextInput
                type="tel"
                value={form.phone}
                onChange={set("phone")}
                placeholder="+1 (555) 000-0000"
                error={!!errors.phone}
              />
            </FormField>

            <FormField label="Password" error={errors.password}>
              <PasswordInput
                value={form.password}
                onChange={set("password")}
                placeholder="Minimum 8 characters"
                error={!!errors.password}
              />
            </FormField>

            <FormField label="Confirm password" error={errors.confirmPassword}>
              <PasswordInput
                value={form.confirmPassword}
                onChange={set("confirmPassword")}
                placeholder="Repeat your password"
                error={!!errors.confirmPassword}
              />
            </FormField>

            <Button
              type="submit"
              size="lg"
              className="w-full mt-2"
              isLoading={isLoading}
              loadingLabel="Creating account…"
            >
              Create account
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
