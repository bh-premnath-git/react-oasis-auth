
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const ProtectedLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { logout, getUserInfo } = useAuth();
  const userInfo = getUserInfo();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: 250 }}
        animate={{ width: isCollapsed ? 80 : 250 }}
        transition={{ duration: 0.3 }}
        className="glass-panel h-screen sticky top-0 p-4 flex flex-col"
      >
        <div className="flex items-center justify-between mb-8">
          {!isCollapsed && <h2 className="text-xl font-bold">KeycloakApp</h2>}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto"
          >
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </Button>
        </div>

        <nav className="flex-1">
          <ul className="space-y-2">
            {sidebarItems.map((item) => (
              <SidebarItem
                key={item.path}
                item={item}
                isCollapsed={isCollapsed}
              />
            ))}
          </ul>
        </nav>

        {userInfo && (
          <div className="mt-auto pt-4 border-t border-border/30">
            {!isCollapsed && (
              <div className="text-sm mb-2 truncate">
                {userInfo.name || userInfo.username}
              </div>
            )}
            <Button
              variant="ghost"
              size={isCollapsed ? "icon" : "default"}
              onClick={handleLogout}
              className="w-full justify-start"
            >
              <LogOut className="w-4 h-4 mr-2" />
              {!isCollapsed && "Logout"}
            </Button>
          </div>
        )}
      </motion.aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

// Sidebar navigation items
const sidebarItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: "Home",
  },
  {
    title: "Profile",
    path: "/profile",
    icon: "User",
  },
  {
    title: "Settings",
    path: "/settings",
    icon: "Settings",
  },
];

// Sidebar item component
const SidebarItem = ({ item, isCollapsed }: { item: any; isCollapsed: boolean }) => {
  const { title, path, icon } = item;
  
  // Import icon dynamically
  const Icon = require("lucide-react")[icon];
  
  return (
    <li>
      <Button
        variant="ghost"
        asChild
        className={`w-full justify-start ${isCollapsed ? "px-0" : ""}`}
      >
        <a href={path}>
          <Icon className="w-5 h-5 mr-2" />
          {!isCollapsed && <span>{title}</span>}
        </a>
      </Button>
    </li>
  );
};

export default ProtectedLayout;
