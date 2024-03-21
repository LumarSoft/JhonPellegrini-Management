import SidebarComponent from "@/shared/components/sidebar/SidebarComponent";
import { ValidateAuth } from "@/shared/services/validateAuth";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ValidateAuth>
      <div className="w-screen h-screen flex">
        <SidebarComponent />
        {children}
      </div>
    </ValidateAuth>
  );
}
