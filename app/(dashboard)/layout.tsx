import { DashboardNav } from "@/components/DashboardNav";
import { SpacesProvider } from "@/features/spaces/context/SpacesContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SpacesProvider>
      <div className="min-h-screen bg-[#F6F2EC]">
        <DashboardNav />
        {children}
      </div>
    </SpacesProvider>
  );
}
