import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin dashboard for managing donor and needer requests",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
