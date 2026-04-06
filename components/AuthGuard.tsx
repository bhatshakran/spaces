"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/features/auth/context/AuthContext";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F6F2EC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <span className="font-cormorant text-[28px] font-semibold text-stone-800">
            Spa<span className="text-[#C05A32]">ce</span>s
          </span>
          <div className="w-5 h-5 border-2 border-stone-200 border-t-[#C05A32] rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  return <>{children}</>;
};
