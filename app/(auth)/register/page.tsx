import { Suspense } from "react";
import { RegisterView } from "@/features/auth/components/RegisterView";

export default function RegisterPage() {
  return (
    <Suspense fallback={null}>
      <RegisterView />
    </Suspense>
  );
}
