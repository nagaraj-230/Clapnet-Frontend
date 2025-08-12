import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DeleteConfirmation } from "@/components/ui/delete-confirmation";
import { 
  DollarSign, 
  Users, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  Heart, 
  Download,
  Share2,
  Eye,
  Target,
  Trash2
} from "lucide-react";
import ProjectDetailsModal from "@/components/modals/ProjectDetailsModal";
import { useToast } from "@/hooks/use-toast";

interface FundDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  fund: {
    id: number;
    name: string;
    project: string;
    targetAmount: number;
    currentAmount: number;
    donors: number;
    status: string;
    deadline: string;
    location: string;
  };
}

const FundDetailsModal = ({ isOpen, onClose, fund }: FundDetailsModalProps) => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { toast } = useToast();
  const progressPercentage = (fund.currentAmount / fund.targetAmount) * 100;

  const recentDonors = [
    { name: "Anonymous", amount: 500, date: "2024-01-15", avatar: "/placeholder.svg" },
    { name: "John Smith", amount: 1000, date: "2024-01-14", avatar: "/placeholder.svg" },
    { name: "Mary Johnson", amount: 250, date: "2024-01-13", avatar: "/placeholder.svg" },
    { name: "David Wilson", amount: 750, date: "2024-01-12", avatar: "/placeholder.svg" },
    { name: "Sarah Brown", amount: 300, date: "2024-01-11", avatar: "/placeholder.svg" },
  ];

  const milestones = [
    { amount: 10000, title: "Site Preparation", status: "completed", date: "2024-01-10" },
    { amount: 25000, title: "Foundation Work", status: "completed", date: "2024-02-15" },
    { amount: 40000, title: "Construction Phase 1", status: "current", date: "2024-03-20" },
    { amount: 50000, title: "Final Completion", status: "pending", date: "2024-06-30" },
  ];

  const updates = [
    {
      date: "2024-01-15",
      title: "Construction Progress Update",
      content: "Foundation work has been completed ahead of schedule. The team is now moving on to the main structure.",
      images: 2
    },
    {
      date: "2024-01-10",
      title: "Site Preparation Complete",
      content: "All preliminary work including site clearing and soil testing has been successfully completed.",
      images: 4
    },
    {
      date: "2024-01-05",
      title: "Project Launched",
      content: "We are excited to announce the official launch of the Hope Primary School construction project.",
      images: 1
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            {fund.name}
          </DialogTitle>
          <DialogDescription>
            Detailed information about this funding campaign
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Stats */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold">{fund.project}</h3>
                    <Badge className={fund.status === "Active" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                      {fund.status}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {fund.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Deadline: {fund.deadline}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-3xl font-bold text-green-600">
                        ${fund.currentAmount.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground">
                        of ${fund.targetAmount.toLocaleString()} goal
                      </span>
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{progressPercentage.toFixed(1)}% funded</span>
                      <span>{fund.donors} donors</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs Content */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="updates">Updates</TabsTrigger>
                <TabsTrigger value="milestones">Milestones</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      This project aims to build a modern primary school facility that will serve over 350 children 
                      in the local community. The school will feature 8 classrooms, a library, computer lab, and 
                      proper sanitation facilities. Our goal is to provide quality education infrastructure that 
                      will impact generations of children in this underserved area.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">350</div>
                        <div className="text-sm text-muted-foreground">Children Benefiting</div>
                      </div>
                      <div className="text-center p-4 bg-muted/50 rounded-lg">
                        <div className="text-2xl font-bold text-primary">8</div>
                        <div className="text-sm text-muted-foreground">Classrooms</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="updates" className="space-y-4">
                {updates.map((update, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{update.title}</h4>
                        <span className="text-sm text-muted-foreground">{update.date}</span>
                      </div>
                      <p className="text-muted-foreground mb-2">{update.content}</p>
                      <div className="text-sm text-primary">
                        📷 {update.images} photos attached
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="milestones" className="space-y-4">
                {milestones.map((milestone, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${
                            milestone.status === 'completed' ? 'bg-green-500' :
                            milestone.status === 'current' ? 'bg-blue-500' : 'bg-gray-300'
                          }`}></div>
                          <div>
                            <h4 className="font-semibold">{milestone.title}</h4>
                            <p className="text-sm text-muted-foreground">Target: ${milestone.amount.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={
                            milestone.status === 'completed' ? 'default' :
                            milestone.status === 'current' ? 'secondary' : 'outline'
                          }>
                            {milestone.status}
                          </Badge>
                          <p className="text-sm text-muted-foreground mt-1">{milestone.date}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="gallery">
                <Card>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[1,2,3,4,5,6].map((item) => (
                        <div key={item} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                          <span className="text-muted-foreground">Photo {item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" onClick={() => toast({
                  title: "Donation Initiated",
                  description: "Redirecting to donation portal...",
                })}>
                  <Heart className="h-4 w-4 mr-2" />
                  Donate Now
                </Button>
                <Button variant="outline" className="w-full" onClick={() => toast({
                  title: "Campaign Shared",
                  description: "Share link copied to clipboard.",
                })}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Campaign
                </Button>
                <Button variant="outline" className="w-full" onClick={() => toast({
                  title: "Report Downloaded",
                  description: "Campaign report has been downloaded as PDF.",
                })}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
                 <Button variant="outline" className="w-full" onClick={() => setSelectedProject({
                   id: fund.id,
                   name: fund.project,
                   status: "Active",
                   location: fund.location,
                   description: `This project aims to ${fund.name.toLowerCase()} in ${fund.location}. We're working to make a lasting impact in the community.`,
                   funding: { target: fund.targetAmount, raised: fund.currentAmount },
                   creator: "Mission Team",
                   startDate: "2024-01-01",
                   timeline: [
                     { phase: "Planning", status: "completed", date: "2024-01-01" },
                     { phase: "Fundraising", status: "in-progress", date: "2024-02-01" },
                     { phase: "Implementation", status: "pending", date: "2024-03-01" }
                   ]
                 })}>
                   <Eye className="h-4 w-4 mr-2" />
                   View Project
                 </Button>
                 <Button 
                   variant="destructive" 
                   className="w-full" 
                   onClick={() => setShowDeleteConfirm(true)}
                 >
                   <Trash2 className="h-4 w-4 mr-2" />
                   Delete Fund
                 </Button>
              </CardContent>
            </Card>

            {/* Recent Donors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recent Donors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentDonors.map((donor, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={donor.avatar} />
                        <AvatarFallback>{donor.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{donor.name}</p>
                        <p className="text-xs text-muted-foreground">{donor.date}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-green-600">
                      ${donor.amount}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Fund Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Average Donation</span>
                  <span className="font-semibold">${Math.round(fund.currentAmount / fund.donors)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Days Remaining</span>
                  <span className="font-semibold">45</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Funding Rate</span>
                  <span className="font-semibold">${Math.round(fund.currentAmount / 30)}/day</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

         {selectedProject && (
           <ProjectDetailsModal
             isOpen={!!selectedProject}
             onClose={() => setSelectedProject(null)}
             project={selectedProject}
           />
         )}

         <DeleteConfirmation
           isOpen={showDeleteConfirm}
           onClose={() => setShowDeleteConfirm(false)}
           onConfirm={() => {
             toast({
               title: "Fund Deleted",
               description: `${fund.name} has been deleted successfully.`,
             });
             setShowDeleteConfirm(false);
             onClose();
           }}
           title="Delete Fund"
           description={`Are you sure you want to delete "${fund.name}"? This will remove all donation records and campaign data. This action cannot be undone.`}
           itemName="fund"
         />
       </DialogContent>
     </Dialog>
   );
 };

export default FundDetailsModal;