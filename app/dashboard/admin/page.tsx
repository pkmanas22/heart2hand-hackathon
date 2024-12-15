"use client";

import { useState } from "react";
import { Users, BarChart } from "lucide-react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar";
import { ManageRequests } from "@/components/admin/ManageRequests";
import { PlatformStatistics } from "@/components/admin/PlatformStatistics";
import { useSession } from "next-auth/react";
import { unauthorized, useRouter } from "next/navigation";

export default function Dashboard() {
  const [activeView, setActiveView] = useState("stats");

  const sidebarItems = [
    { icon: BarChart, label: "Platform Statistics", value: "stats" },
    { icon: Users, label: "Manage Requests", value: "request" },
  ];

  const { data: session } = useSession()
  const router = useRouter();


  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        <AppSidebar
          items={sidebarItems}
          activeView={activeView}
          setActiveView={setActiveView}
        />
        <div className="flex flex-col w-screen overflow-y-scroll">
          <Header/>
          <main className="p-6">
            {activeView === "stats" && <PlatformStatistics />}
            {activeView === "request" && <ManageRequests />}
          </main>
        </div>
        <SidebarInset className="flex-1 overflow-auto"></SidebarInset>
      </div>
    </SidebarProvider>
  );
}
