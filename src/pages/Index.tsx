import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import Dashboard from "@/components/dashboard/Dashboard";
import ProjectsList from "@/components/projects/ProjectsList";
import UserManagement from "@/components/users/UserManagement";
import FundManagement from "@/components/funds/FundManagement";
import CreateProject from "@/components/projects/CreateProject";
import DonationsHistory from "@/components/donations/DonationsHistory";
import SystemSettings from "@/components/settings/SystemSettings";
import LoginForm from "@/components/auth/LoginForm";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [currentUser, setCurrentUser] = useState<{ email: string; role: string } | null>(null);
  const [currentView, setCurrentView] = useState("dashboard");
  const { toast } = useToast();

  const handleLogin = (email: string, role: string) => {
    setCurrentUser({ email, role });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
  };

  const renderCurrentView = () => {
    if (!currentUser) return null;

    switch (currentView) {
      case "dashboard":
        return <Dashboard userRole={currentUser.role} />;
      case "projects":
        return <ProjectsList userRole={currentUser.role} />;
      case "users":
        return <UserManagement userRole={currentUser.role} />;
      case "funds":
        return <FundManagement userRole={currentUser.role} />;
      case "create":
        return <CreateProject userRole={currentUser.role} />;
      case "donations":
        return <DonationsHistory userRole={currentUser.role} />;
      case "settings":
        return <SystemSettings userRole={currentUser.role} />;
      default:
        return <Dashboard userRole={currentUser.role} />;
    }
  };

  if (!currentUser) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <DashboardLayout
      userRole={currentUser.role}
      userEmail={currentUser.email}
      onLogout={handleLogout}
      currentView={currentView}
      onViewChange={setCurrentView}
    >
      {renderCurrentView()}
    </DashboardLayout>
  );
};

export default Index;
