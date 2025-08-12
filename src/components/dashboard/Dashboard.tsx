import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  FolderPlus, 
  DollarSign, 
  Users, 
  Target,
  TrendingUp,
  Heart,
  Building,
  GraduationCap,
  Home,
  MapPin,
  BarChart3,
  Eye
} from "lucide-react";
import AnalysisModal from "@/components/modals/AnalysisModal";

interface DashboardProps {
  userRole: string;
}

const Dashboard = ({ userRole }: DashboardProps) => {
  const [showAnalysis, setShowAnalysis] = useState(false);

  // Mock data for demonstration
  const stats = {
    totalProjects: 24,
    activeProjects: 12,
    completedProjects: 8,
    totalFunds: 450000,
    fundsAllocated: 320000,
    fundsAvailable: 130000,
    totalUsers: 156,
    activeUsers: 89,
  };

  // Chart data
  const monthlyData = [
    { month: "Jan", projects: 8, funding: 32000 },
    { month: "Feb", projects: 12, funding: 38000 },
    { month: "Mar", projects: 15, funding: 45000 },
    { month: "Apr", projects: 18, funding: 52000 },
    { month: "May", projects: 20, funding: 48000 },
    { month: "Jun", projects: 24, funding: 55000 }
  ];

  const projectTypeData = [
    { name: "Education", value: 40, color: "#3B82F6" },
    { name: "Healthcare", value: 30, color: "#10B981" },
    { name: "Infrastructure", value: 20, color: "#F59E0B" },
    { name: "Emergency", value: 10, color: "#EF4444" }
  ];

  const recentProjects = [
    {
      id: 1,
      name: "St. Mary's Primary School",
      type: "School",
      location: "Kenya",
      status: "Active",
      progress: 75,
      budget: 85000,
      allocated: 63750,
    },
    {
      id: 2,
      name: "Hope Medical Center",
      type: "Hospital",
      location: "Tanzania",
      status: "Planning",
      progress: 25,
      budget: 120000,
      allocated: 30000,
    },
    {
      id: 3,
      name: "Little Angels Orphanage",
      type: "Orphanage",
      location: "Uganda",
      status: "Active",
      progress: 90,
      budget: 65000,
      allocated: 58500,
    },
  ];

  const getProjectIcon = (type: string) => {
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

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-success text-success-foreground";
      case "planning":
        return "bg-mission-blue text-white";
      case "completed":
        return "bg-mission-gold text-white";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getRoleSpecificCards = () => {
    const baseCards = [
      {
        title: "Total Projects",
        value: stats.totalProjects,
        icon: FolderPlus,
        description: `${stats.activeProjects} active, ${stats.completedProjects} completed`,
        color: "text-primary",
      },
    ];

    switch (userRole) {
      case "Super Admin":
      case "Admin":
        return [
          ...baseCards,
          {
            title: "Total Funding",
            value: `$${stats.totalFunds.toLocaleString()}`,
            icon: DollarSign,
            description: `$${stats.fundsAllocated.toLocaleString()} allocated`,
            color: "text-mission-gold",
          },
          {
            title: "Active Users",
            value: stats.activeUsers,
            icon: Users,
            description: `${stats.totalUsers} total users`,
            color: "text-mission-blue",
          },
          {
            title: "Impact Reach",
            value: "12,500+",
            icon: Heart,
            description: "Lives impacted",
            color: "text-success",
          },
        ];
      case "Fund Manager":
        return [
          ...baseCards,
          {
            title: "Available Funds",
            value: `$${stats.fundsAvailable.toLocaleString()}`,
            icon: DollarSign,
            description: "Ready for allocation",
            color: "text-mission-gold",
          },
          {
            title: "Pending Approvals",
            value: 3,
            icon: Target,
            description: "Funding requests",
            color: "text-mission-blue",
          },
        ];
      case "Project Creator":
        return [
          ...baseCards,
          {
            title: "My Projects",
            value: 8,
            icon: FolderPlus,
            description: "6 active, 2 completed",
            color: "text-primary",
          },
          {
            title: "Success Rate",
            value: "92%",
            icon: TrendingUp,
            description: "Project completion",
            color: "text-success",
          },
        ];
      case "Donor Agency":
        return [
          {
            title: "Available Projects",
            value: stats.activeProjects,
            icon: FolderPlus,
            description: "Ready for funding",
            color: "text-primary",
          },
          {
            title: "My Contributions",
            value: "$45,000",
            icon: Heart,
            description: "Total donated",
            color: "text-success",
          },
          {
            title: "Projects Supported",
            value: 6,
            icon: Target,
            description: "Actively funding",
            color: "text-mission-blue",
          },
        ];
      default:
        return baseCards;
    }
  };

  const roleCards = getRoleSpecificCards();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary-glow rounded-xl p-6 text-primary-foreground shadow-large">
        <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
        <p className="text-primary-foreground/90">
          {userRole === "Super Admin" && "Manage your mission operations from this central dashboard."}
          {userRole === "Admin" && "Oversee projects and coordinate mission activities."}
          {userRole === "Project Creator" && "Create and manage impactful projects for communities in need."}
          {userRole === "Fund Manager" && "Allocate and track funding for mission projects."}
          {userRole === "Donor Agency" && "Discover and support meaningful mission projects."}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {roleCards.map((card, index) => (
          <Card key={index} className="border-0 shadow-medium hover:shadow-large transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {card.title}
              </CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{card.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section - Material UI Inspired Styling */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-slate-50 dark:from-gray-900 dark:to-gray-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-lg font-semibold">Monthly Progress</span>
            </CardTitle>
            <Button variant="outline" size="sm" onClick={() => setShowAnalysis(true)} className="border-blue-200 hover:bg-blue-50 dark:hover:bg-blue-900/20">
              <Eye className="h-4 w-4 mr-2" />
              View Analysis
            </Button>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">Project completion trends over time</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.3}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(255, 255, 255, 0.95)', 
                      border: '1px solid #E5E7EB', 
                      borderRadius: '8px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                  <Bar dataKey="projects" fill="url(#colorBar)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-emerald-50 dark:from-gray-900 dark:to-emerald-900/10">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg">
                <Target className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-lg font-semibold">Project Categories</span>
            </CardTitle>
            <Button variant="outline" size="sm" onClick={() => setShowAnalysis(true)} className="border-emerald-200 hover:bg-emerald-50 dark:hover:bg-emerald-900/20">
              <Eye className="h-4 w-4 mr-2" />
              View Analysis
            </Button>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">Distribution by project type</p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <defs>
                    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.1"/>
                    </filter>
                  </defs>
                  <Pie
                    data={projectTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    filter="url(#shadow)"
                  >
                    {projectTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(255, 255, 255, 0.95)', 
                      border: '1px solid #E5E7EB', 
                      borderRadius: '8px',
                      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics - Enhanced Material Design */}
      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-green-900/10">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="flex items-center space-x-2">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-lg font-semibold">Funding Trends</span>
          </CardTitle>
          <Button variant="outline" size="sm" onClick={() => setShowAnalysis(true)} className="border-green-200 hover:bg-green-50 dark:hover:bg-green-900/20">
            <Eye className="h-4 w-4 mr-2" />
            View Analysis
          </Button>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Monthly funding performance</p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-muted-foreground">Funding ($)</span>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#6B7280' }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#6B7280' }}
                  tickFormatter={(value) => `$${(value/1000)}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(255, 255, 255, 0.95)', 
                    border: '1px solid #E5E7EB', 
                    borderRadius: '12px',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                    backdropFilter: 'blur(10px)'
                  }}
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Funding']}
                />
                <Line 
                  type="monotone" 
                  dataKey="funding" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ 
                    fill: "#10B981", 
                    strokeWidth: 3, 
                    r: 6,
                    stroke: '#ffffff',
                    filter: 'drop-shadow(0 2px 4px rgba(16, 185, 129, 0.3))'
                  }}
                  activeDot={{ 
                    r: 8, 
                    stroke: '#ffffff', 
                    strokeWidth: 3,
                    filter: 'drop-shadow(0 4px 8px rgba(16, 185, 129, 0.4))'
                  }}
                  fill="url(#colorGradient)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Recent Projects */}
      <Card className="border-0 shadow-medium">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FolderPlus className="h-5 w-5 text-primary" />
            <span>Recent Projects</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentProjects.map((project) => {
              const ProjectIcon = getProjectIcon(project.type);
              return (
                <div key={project.id} className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <ProjectIcon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">{project.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{project.location}</span>
                      <Badge variant="secondary" className={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      ${project.allocated.toLocaleString()} / ${project.budget.toLocaleString()}
                    </p>
                    <div className="w-20 h-2 bg-muted rounded-full mt-1 overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Analysis Modal */}
      <AnalysisModal
        isOpen={showAnalysis}
        onClose={() => setShowAnalysis(false)}
        userRole={userRole}
      />
    </div>
  );
};

export default Dashboard;