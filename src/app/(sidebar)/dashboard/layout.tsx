"use client";
import SidebarComponent from "@/shared/components/sidebar/SidebarComponent";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-screen h-screen flex">
      <SidebarComponent />
      {children}
    </div>
  );
}
