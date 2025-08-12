import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Cell,
  AreaChart,
  Area
} from "recharts";
import { TrendingUp, Users, DollarSign, Target, Calendar, BarChart3, X } from "lucide-react";

interface AnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: string;
}

const AnalysisModal = ({ isOpen, onClose, userRole }: AnalysisModalProps) => {
  const [timeRange, setTimeRange] = useState("6months");

  // Mock data for different chart types
  const monthlyData = [
    { month: "Jan", projects: 12, funding: 45000, donations: 28000, users: 156 },
    { month: "Feb", projects: 15, funding: 52000, donations: 31000, users: 162 },
    { month: "Mar", projects: 18, funding: 48000, donations: 35000, users: 178 },
    { month: "Apr", projects: 22, funding: 65000, donations: 42000, users: 194 },
    { month: "May", projects: 20, funding: 58000, donations: 38000, users: 205 },
    { month: "Jun", projects: 24, funding: 72000, donations: 45000, users: 218 }
  ];

  const projectStatusData = [
    { name: "Active", value: 45, color: "#10B981" },
    { name: "Completed", value: 30, color: "#3B82F6" },
    { name: "Planning", value: 15, color: "#F59E0B" },
    { name: "On Hold", value: 10, color: "#EF4444" }
  ];

  const fundingBreakdown = [
    { category: "Education", amount: 125000, projects: 8 },
    { category: "Healthcare", amount: 98000, projects: 6 },
    { category: "Infrastructure", amount: 87000, projects: 4 },
    { category: "Emergency Relief", amount: 65000, projects: 3 },
    { category: "Community Development", amount: 45000, projects: 3 }
  ];

  const impactMetrics = [
    { metric: "Lives Impacted", value: 12500, change: "+15%" },
    { metric: "Communities Served", value: 85, change: "+8%" },
    { metric: "Success Rate", value: "92%", change: "+3%" },
    { metric: "Avg Project Duration", value: "6.2 months", change: "-0.5" }
  ];

  const getAnalysisContent = () => {
    switch (userRole) {
      case "Super Admin":
      case "Admin":
        return (
          <>
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4" />
                      Monthly Progress
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="projects" stroke="#3B82F6" strokeWidth={2} />
                        <Line type="monotone" dataKey="funding" stroke="#10B981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-4 w-4" />
                      Project Status Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={projectStatusData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {projectStatusData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Funding by Category
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={fundingBreakdown}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="amount" fill="#3B82F6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="impact" className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {impactMetrics.map((metric, index) => (
                  <Card key={index}>
                    <CardContent className="p-4 text-center">
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <p className="text-sm text-muted-foreground">{metric.metric}</p>
                      <Badge variant="outline" className="mt-2">
                        {metric.change}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>User Growth & Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="users" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </>
        );

      case "Fund Manager":
        return (
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Fund Allocation Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="funding" stroke="#10B981" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Category-wise Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={fundingBreakdown} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="category" type="category" width={80} />
                      <Tooltip />
                      <Bar dataKey="amount" fill="#F59E0B" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        );

      case "Project Creator":
        return (
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Project Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={monthlyData.slice(0, 4)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="projects" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Success Metrics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">92%</p>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">$284K</p>
                    <p className="text-sm text-muted-foreground">Total Funding Raised</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-600">6,200</p>
                    <p className="text-sm text-muted-foreground">Lives Impacted</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        );

      case "Donor Agency":
        return (
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Contribution History</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="donations" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Impact Overview</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">$45,000</p>
                    <p className="text-sm text-muted-foreground">Total Contributed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-blue-600">6</p>
                    <p className="text-sm text-muted-foreground">Projects Supported</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-purple-600">1,850</p>
                    <p className="text-sm text-muted-foreground">Lives Impacted</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        );

      default:
        return (
          <TabsContent value="overview" className="space-y-6">
            <div className="text-center p-8">
              <BarChart3 className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-lg font-medium">Analytics Coming Soon</p>
              <p className="text-muted-foreground">Detailed analytics will be available for your role.</p>
            </div>
          </TabsContent>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Advanced Analytics Dashboard
          </DialogTitle>
          <DialogDescription>
            Comprehensive insights and performance metrics for {userRole.toLowerCase()}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Controls */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <Select value={timeRange} onValueChange={setTimeRange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">Last Month</SelectItem>
                    <SelectItem value="3months">Last 3 Months</SelectItem>
                    <SelectItem value="6months">Last 6 Months</SelectItem>
                    <SelectItem value="1year">Last Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Analytics Content */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="impact">Impact</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>

            {getAnalysisContent()}

            <TabsContent value="trends" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Growth Trends Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <Tooltip />
                      <Line yAxisId="left" type="monotone" dataKey="projects" stroke="#3B82F6" strokeWidth={2} />
                      <Line yAxisId="right" type="monotone" dataKey="funding" stroke="#10B981" strokeWidth={2} />
                      <Line yAxisId="right" type="monotone" dataKey="donations" stroke="#F59E0B" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnalysisModal;