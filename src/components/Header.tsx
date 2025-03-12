import { cn } from "@/lib/utils";
import { useSidebar } from "@/context/SidebarContext";

export const Header = () => {
  const { isExpanded } = useSidebar();
  
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
    </header>
  );
};
