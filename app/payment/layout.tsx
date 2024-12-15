import { SidebarProvider } from "@/components/ui/sidebar";

export const metadata = {
  title: "Donation Platform",
  description: "Support verified causes and make a difference",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
