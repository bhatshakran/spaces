import { SpacesProvider } from "@/features/spaces/context/SpacesContext";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SpacesProvider>
      <main className="flex-1">{children}</main>
    </SpacesProvider>
  );
}
