import { SidebarProvider } from "@/components/ui/sidebar";


export const metadata = {
  title: "Request",
  description: "Request with some details",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SidebarProvider>{children}</SidebarProvider>;
}
