import { SpacesProvider } from "@/features/spaces/context/SpacesContext";
import { AuthGuard } from "@/components/AuthGuard";
import { DashboardNav } from "@/components/DashboardNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <SpacesProvider>
        <div className="min-h-screen bg-[#F6F2EC]">
          <DashboardNav />
          {children}
        </div>
      </SpacesProvider>
    </AuthGuard>
  );
}
