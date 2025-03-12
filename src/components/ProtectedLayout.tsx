
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/context/SidebarContext";

const MainContent = () => {
  const { isExpanded } = useSidebar();
  
  return (
    <div className={cn(
      "flex-1 transition-all duration-300",
      isExpanded ? "ml-64" : "ml-20"
    )}>
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
};

const ProtectedLayout = () => {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <div className="min-h-screen flex">
          <Sidebar />
          <MainContent />
        </div>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default ProtectedLayout;
