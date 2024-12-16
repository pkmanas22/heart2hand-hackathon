"use client";

import { useState } from "react";
import { Search, History, Heart } from 'lucide-react'
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Header } from "@/components/header";
import { AppSidebar } from "@/components/app-sidebar";
import VerifiedRequest from "@/components/helper/VerifiedRequest";
import DonationHistory from "@/components/helper/DonationHistory";
import ImpactStories from "@/components/helper/ImpactStories";

export default function Dashboard() {
  const [activeView, setActiveView] = useState("impactStories");

  const sidebarItems = [
    { icon: Heart, label: "Impact Stories", value: "impactStories" },
    { icon: Search, label: "Verified Requests", value: "request" },
    { icon: History, label: "Donation History", value: "history" },
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
          <Header />
          <main className="p-6">
            {activeView === "impactStories" && <ImpactStories />}
            {activeView === "request" && <VerifiedRequest />}
            {activeView === "history" && <DonationHistory />}
          </main>
        </div>
        <SidebarInset className="flex-1 overflow-auto"></SidebarInset>
      </div>
    </SidebarProvider>
  );
}
