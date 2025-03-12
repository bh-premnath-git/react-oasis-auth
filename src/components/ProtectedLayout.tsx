
import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/context/SidebarContext";
import { Bell, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const { isExpanded } = useSidebar();
  const { getUserInfo } = useAuth();
  const userInfo = getUserInfo();
  
  return (
    <header className={cn(
      "h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      "fixed top-0 right-0 z-30 flex items-center justify-between px-6",
      "transition-all duration-300",
      isExpanded ? "left-64" : "left-20"
    )}>
      <div className="flex items-center">
        <h2 className="text-xl font-semibold">Bighammer AI</h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
        <Avatar className="h-8 w-8">
          <AvatarImage src={userInfo?.avatarUrl || ""} alt={userInfo?.name || "User"} />
          <AvatarFallback>{userInfo?.name?.charAt(0) || userInfo?.username?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
};

const MainContent = () => {
  const { isExpanded } = useSidebar();
  
  return (
    <div className={cn(
      "flex-1 transition-all duration-300",
      isExpanded ? "ml-64" : "ml-20"
    )}>
      <Header />
      <main className="p-6 mt-16">
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
