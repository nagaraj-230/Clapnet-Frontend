import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingUp, AlertTriangle, Plus, Search, Filter, Eye, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import FundDetailsModal from "@/components/modals/FundDetailsModal";
import EditCampaignModal from "@/components/modals/EditCampaignModal";
import DownloadReportModal from "@/components/modals/DownloadReportModal";
import AnalysisModal from "@/components/modals/AnalysisModal";
import CreateCampaignModal from "@/components/modals/CreateCampaignModal";
import CreateFundModal from "@/components/modals/CreateFundModal";

interface FundManagementProps {
  userRole: string;
}

const FundManagement = ({ userRole }: FundManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedFund, setSelectedFund] = useState<any>(null);
  const [editingCampaign, setEditingCampaign] = useState<any>(null);
  const [showDownloadReport, setShowDownloadReport] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showCreateCampaign, setShowCreateCampaign] = useState(false);
  const [showCreateFund, setShowCreateFund] = useState(false);

  const funds = [
    {
      id: 1,
      name: "School Construction Fund",
      project: "Hope Primary School",
      targetAmount: 50000,
      currentAmount: 35000,
      donors: 45,
      status: "Active",
      deadline: "2024-06-30",
      location: "Kenya"
    },
    {
      id: 2,
      name: "Medical Equipment Fund",
      project: "Community Health Center",
      targetAmount: 75000,
      currentAmount: 65000,
      donors: 32,
      status: "Active",
      deadline: "2024-05-15",
      location: "Uganda"
    },
    {
      id: 3,
      name: "Orphanage Renovation",
      project: "St. Mary's Orphanage",
      targetAmount: 30000,
      currentAmount: 30000,
      donors: 28,
      status: "Completed",
      deadline: "2024-02-28",
      location: "Tanzania"
    },
    {
      id: 4,
      name: "Emergency Relief Fund",
      project: "Flood Relief Operations",
      targetAmount: 25000,
      currentAmount: 8000,
      donors: 15,
      status: "Urgent",
      deadline: "2024-03-31",
      location: "Mozambique"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "Completed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Urgent": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const filteredFunds = funds.filter(fund => {
    const matchesSearch = fund.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         fund.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || fund.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalFunds = funds.reduce((sum, fund) => sum + fund.currentAmount, 0);
  const totalTarget = funds.reduce((sum, fund) => sum + fund.targetAmount, 0);
  const activeFunds = funds.filter(f => f.status === "Active").length;
  const urgentFunds = funds.filter(f => f.status === "Urgent").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Fund Management</h2>
          <p className="text-muted-foreground">Monitor and manage mission project funding</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowAnalysis(true)}>
            <Eye className="h-4 w-4 mr-2" />
            View Analysis
          </Button>
          {(userRole === "Super Admin" || userRole === "Admin" || userRole === "Fund Manager") && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create New
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setShowCreateFund(true)}>
                  Create New Fund
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setShowCreateCampaign(true)}>
                  Create New Campaign
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Funds Raised</p>
                <p className="text-2xl font-bold">${totalFunds.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Target Amount</p>
                <p className="text-2xl font-bold">${totalTarget.toLocaleString()}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Funds</p>
                <p className="text-2xl font-bold">{activeFunds}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-blue-500"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Urgent Funds</p>
                <p className="text-2xl font-bold">{urgentFunds}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Funding Campaigns</CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search funds..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterStatus("all")}>All Status</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("Active")}>Active</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("Urgent")}>Urgent</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("Completed")}>Completed</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredFunds.map((fund) => {
              const progressPercentage = (fund.currentAmount / fund.targetAmount) * 100;
              return (
                <div key={fund.id} className="border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-semibold">{fund.name}</h3>
                        <Badge className={getStatusColor(fund.status)}>{fund.status}</Badge>
                      </div>
                      <p className="text-muted-foreground">{fund.project} • {fund.location}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{fund.donors} donors</span>
                        <span>Deadline: {fund.deadline}</span>
                      </div>
                    </div>
                    <div className="lg:w-80 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>${fund.currentAmount.toLocaleString()} raised</span>
                        <span>${fund.targetAmount.toLocaleString()} goal</span>
                      </div>
                      <Progress value={progressPercentage} className="h-3" />
                      <div className="text-right text-sm text-muted-foreground">
                        {progressPercentage.toFixed(1)}% completed
                      </div>
                    </div>
                  </div>
                  {(userRole === "Super Admin" || userRole === "Admin" || userRole === "Fund Manager") && (
                    <div className="flex gap-2 mt-4 pt-4 border-t">
                      <Button variant="outline" size="sm" onClick={() => setSelectedFund(fund)}>View Details</Button>
                      <Button variant="outline" size="sm" onClick={() => setEditingCampaign({
                        ...fund,
                        raised: fund.currentAmount,
                        target: fund.targetAmount,
                        description: `Fund for ${fund.project} located in ${fund.location}`,
                        category: "Community Development",
                        startDate: "2024-01-01",
                        endDate: fund.deadline
                      })}>Edit Campaign</Button>
                      <Button variant="outline" size="sm" onClick={() => setShowDownloadReport(true)}>Download Report</Button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {selectedFund && (
        <FundDetailsModal
          isOpen={!!selectedFund}
          onClose={() => setSelectedFund(null)}
          fund={selectedFund}
        />
      )}

      {editingCampaign && (
        <EditCampaignModal
          isOpen={!!editingCampaign}
          onClose={() => setEditingCampaign(null)}
          campaign={editingCampaign}
        />
      )}

      <DownloadReportModal
        isOpen={showDownloadReport}
        onClose={() => setShowDownloadReport(false)}
        reportType="fund"
      />

      <AnalysisModal
        isOpen={showAnalysis}
        onClose={() => setShowAnalysis(false)}
        userRole={userRole}
      />

      <CreateCampaignModal
        isOpen={showCreateCampaign}
        onClose={() => setShowCreateCampaign(false)}
        userRole={userRole}
      />

      <CreateFundModal
        isOpen={showCreateFund}
        onClose={() => setShowCreateFund(false)}
        userRole={userRole}
      />
    </div>
  );
};

export default FundManagement;