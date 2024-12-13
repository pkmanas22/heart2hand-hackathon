"use client";

import { useState } from "react";
import { LayoutDashboard, ClipboardList, PlusCircle } from "lucide-react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar";
import { RequestHistory } from "@/components/needer/RequestHistory";
import { CreateNewRequest } from "@/components/needer/CreateNewRequest";
import { DashboardOverview } from "@/components/needer/DashboardOverview";

export default function Dashboard() {
  const [activeView, setActiveView] = useState("overview");

  const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard Overview", value: "overview" },
    { icon: PlusCircle, label: "Create New Request", value: "create" },
    { icon: ClipboardList, label: "Request History", value: "history" },
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        <AppSidebar
          items={sidebarItems}
          activeView={activeView}
          setActiveView={setActiveView}
        />
        <div className="flex flex-col w-screen overflow-y-scroll">
          <Header name="John Doe" />
          <main className="p-6">
            {activeView === "overview" && <DashboardOverview />}
            {activeView === "create" && <CreateNewRequest />}
            {activeView === "history" && <RequestHistory />}
          </main>
        </div>
        <SidebarInset className="flex-1 overflow-auto"></SidebarInset>
      </div>
    </SidebarProvider>
  );
}
