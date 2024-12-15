import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata = {
  title: "Needer Dashboard",
  description: "Dashboard for managing needer requests and donations",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
        <SidebarProvider>{children}</SidebarProvider>
  );
}
