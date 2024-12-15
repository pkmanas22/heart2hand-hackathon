import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata = {
  title: "Helper Dashboard",
  description: "Connect with verified causes and make a difference",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
