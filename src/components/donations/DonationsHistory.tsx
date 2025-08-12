import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Heart, Download, Search, Filter, Calendar, DollarSign, TrendingUp, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DonationReceiptModal from "@/components/modals/DonationReceiptModal";
import ProjectDetailsModal from "@/components/modals/ProjectDetailsModal";
import DownloadReportModal from "@/components/modals/DownloadReportModal";
import AnalysisModal from "@/components/modals/AnalysisModal";

interface DonationsHistoryProps {
  userRole: string;
}

const DonationsHistory = ({ userRole }: DonationsHistoryProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedDonation, setSelectedDonation] = useState<any>(null);
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showDownloadReport, setShowDownloadReport] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  const donations = [
    {
      id: 1,
      project: "Hope Primary School",
      amount: 5000,
      date: "2024-01-15",
      status: "Completed",
      method: "Bank Transfer",
      receipt: "RCP-2024-001",
      impact: "Helped fund 2 classrooms"
    },
    {
      id: 2,
      project: "Community Health Center",
      amount: 10000,
      date: "2024-01-10",
      status: "Completed",
      method: "Credit Card",
      receipt: "RCP-2024-002",
      impact: "Funded medical equipment purchase"
    },
    {
      id: 3,
      project: "St. Mary's Orphanage",
      amount: 2500,
      date: "2024-01-05",
      status: "Processing",
      method: "PayPal",
      receipt: "RCP-2024-003",
      impact: "Supporting 25 children's education"
    },
    {
      id: 4,
      project: "Emergency Relief Fund",
      amount: 7500,
      date: "2023-12-20",
      status: "Completed",
      method: "Bank Transfer",
      receipt: "RCP-2023-045",
      impact: "Provided emergency supplies for 150 families"
    },
    {
      id: 5,
      project: "Water Well Project",
      amount: 3000,
      date: "2023-12-15",
      status: "Completed",
      method: "Credit Card",
      receipt: "RCP-2023-044",
      impact: "Clean water access for 500 people"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Processing": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Failed": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const filteredDonations = donations.filter(donation => {
    const matchesSearch = donation.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donation.receipt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || donation.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalDonated = donations.reduce((sum, donation) => sum + donation.amount, 0);
  const completedDonations = donations.filter(d => d.status === "Completed").length;
  const thisYearDonations = donations.filter(d => d.date.startsWith("2024")).reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">My Donations</h2>
          <p className="text-muted-foreground">Track your contributions to mission projects</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowAnalysis(true)}>
            <Eye className="h-4 w-4 mr-2" />
            View Analysis
          </Button>
          <Button className="flex items-center gap-2" onClick={() => setShowDownloadReport(true)}>
            <Download className="h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Donated</p>
                <p className="text-2xl font-bold">${totalDonated.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">This Year</p>
                <p className="text-2xl font-bold">${thisYearDonations.toLocaleString()}</p>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Donations</p>
                <p className="text-2xl font-bold">{donations.length}</p>
              </div>
              <Heart className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold">{completedDonations}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Donation History</CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search donations..."
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
                  <DropdownMenuItem onClick={() => setFilterStatus("Completed")}>Completed</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("Processing")}>Processing</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("Failed")}>Failed</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDonations.map((donation) => (
              <div key={donation.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-semibold">{donation.project}</h3>
                      <Badge className={getStatusColor(donation.status)}>{donation.status}</Badge>
                    </div>
                    <p className="text-muted-foreground">{donation.impact}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Receipt: {donation.receipt}</span>
                      <span>Method: {donation.method}</span>
                      <span>Date: {donation.date}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-green-600">${donation.amount.toLocaleString()}</p>
                    <div className="flex gap-2 mt-2">
                      <Button variant="outline" size="sm" onClick={() => setSelectedDonation(donation)}>View Receipt</Button>
                      <Button variant="outline" size="sm" onClick={() => setSelectedProject({
                        id: donation.id,
                        name: donation.project,
                        status: "Active",
                        location: "Kenya",
                        description: `Project details for ${donation.project}`,
                        funding: { target: 50000, raised: donation.amount },
                        creator: "Mission Team",
                        startDate: "2024-01-01",
                        timeline: []
                      })}>Project Details</Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Impact Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">5</div>
              <div className="text-sm text-muted-foreground">Projects Supported</div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">1,175</div>
              <div className="text-sm text-muted-foreground">People Impacted</div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">3</div>
              <div className="text-sm text-muted-foreground">Countries Reached</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedDonation && (
        <DonationReceiptModal
          isOpen={!!selectedDonation}
          onClose={() => setSelectedDonation(null)}
          donation={selectedDonation}
        />
      )}

      {selectedProject && (
        <ProjectDetailsModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
        />
      )}

      <DownloadReportModal
        isOpen={showDownloadReport}
        onClose={() => setShowDownloadReport(false)}
        reportType="donation"
      />

      <AnalysisModal
        isOpen={showAnalysis}
        onClose={() => setShowAnalysis(false)}
        userRole="Donor Agency"
      />
    </div>
  );
};

export default DonationsHistory;