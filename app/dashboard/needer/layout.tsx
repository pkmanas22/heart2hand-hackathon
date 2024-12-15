import { Inter } from "next/font/google";
import { SidebarProvider } from "@/components/ui/sidebar";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>{children}</SidebarProvider>
      </body>
    </html>
  );
}
