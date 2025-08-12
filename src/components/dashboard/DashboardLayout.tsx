import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  FolderPlus, 
  DollarSign, 
  Users, 
  Settings, 
  LogOut,
  Menu,
  X,
  Heart,
  Building,
  GraduationCap,
  Home
} from "lucide-react";
import { cn } from "@/lib/utils";
import LogoFallback from "@/components/ui/logo-fallback";

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: string;
  userEmail: string;
  onLogout: () => void;
  currentView: string;
  onViewChange: (view: string) => void;
}

const DashboardLayout = ({ 
  children, 
  userRole, 
  userEmail, 
  onLogout, 
  currentView, 
  onViewChange 
}: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getMenuItems = () => {
    const baseItems = [
      { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
      { id: "projects", label: "Projects", icon: FolderPlus },
    ];

    const roleSpecificItems = {
      "Super Admin": [
        ...baseItems,
        { id: "users", label: "User Management", icon: Users },
        { id: "funds", label: "Fund Management", icon: DollarSign },
        { id: "settings", label: "System Settings", icon: Settings },
      ],
      "Admin": [
        ...baseItems,
        { id: "users", label: "Users", icon: Users },
        { id: "funds", label: "Funds", icon: DollarSign },
      ],
      "Project Creator": [
        ...baseItems,
        { id: "create", label: "Create Project", icon: FolderPlus },
      ],
      "Fund Manager": [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "funds", label: "Fund Management", icon: DollarSign },
        { id: "projects", label: "Projects", icon: FolderPlus },
      ],
      "Donor Agency": [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "projects", label: "Available Projects", icon: FolderPlus },
        { id: "donations", label: "My Donations", icon: Heart },
      ],
    };

    return roleSpecificItems[userRole as keyof typeof roleSpecificItems] || baseItems;
  };

  const menuItems = getMenuItems();

  const getProjectTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "school":
        return GraduationCap;
      case "hospital":
        return Building;
      case "orphanage":
        return Home;
      default:
        return Building;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-full w-64 bg-card/95 backdrop-blur-md border-r border-border/50 shadow-large transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border/50">
            <div className="flex items-center space-x-3">
              <LogoFallback className="h-8 w-8" />
              <div>
                <h2 className="font-bold text-foreground">Mission Portal</h2>
                <p className="text-xs text-muted-foreground">{userRole}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                variant={currentView === item.id ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start h-11 transition-all duration-200",
                  currentView === item.id 
                    ? "bg-primary text-primary-foreground shadow-medium" 
                    : "hover:bg-primary/10 hover:shadow-soft"
                )}
                onClick={() => {
                  onViewChange(item.id);
                  setSidebarOpen(false);
                }}
              >
                <item.icon className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            ))}
          </nav>

          {/* User info and logout */}
          <div className="p-4 border-t border-border/50 space-y-3">
            <div className="text-sm">
              <p className="font-medium text-foreground truncate">{userEmail}</p>
              <p className="text-xs text-muted-foreground">{userRole}</p>
            </div>
            <Button
              variant="outline"
              className="w-full justify-start border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground"
              onClick={onLogout}
            >
              <LogOut className="mr-3 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-card/80 backdrop-blur-md border-b border-border/50 shadow-soft">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden mr-2"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold text-foreground capitalize">
              {currentView === "dashboard" ? "Dashboard" : 
               currentView === "projects" ? "Projects" :
               currentView === "users" ? "User Management" :
               currentView === "funds" ? "Fund Management" :
               currentView === "create" ? "Create Project" :
               currentView === "donations" ? "My Donations" :
               currentView === "settings" ? "System Settings" : 
               currentView}
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="hidden sm:block text-right text-sm">
              <p className="font-medium text-foreground">{userRole}</p>
              <p className="text-xs text-muted-foreground">Mission Portal</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;