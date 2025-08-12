import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DeleteConfirmation } from "@/components/ui/delete-confirmation";
import { useToast } from "@/components/ui/use-toast";
import { 
  Building, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  Target,
  FileText,
  Camera,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Edit,
  Trash2
} from "lucide-react";

interface ProjectDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    id: number;
    name: string;
    type: string;
    location: string;
    status: string;
    progress: number;
    budget: number;
    allocated: number;
    raised: number;
    beneficiaries: number;
    startDate: string;
    endDate: string;
    description: string;
    creator: string;
  };
}

const ProjectDetailsModal = ({ isOpen, onClose, project }: ProjectDetailsModalProps) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { toast } = useToast();
  const team = [
    { name: "John Doe", role: "Project Manager", avatar: "/placeholder.svg" },
    { name: "Sarah Wilson", role: "Site Engineer", avatar: "/placeholder.svg" },
    { name: "Michael Brown", role: "Community Liaison", avatar: "/placeholder.svg" },
    { name: "Lisa Chen", role: "Financial Coordinator", avatar: "/placeholder.svg" }
  ];

  const timeline = [
    { phase: "Planning & Design", startDate: "2024-01-15", endDate: "2024-02-15", status: "completed" },
    { phase: "Site Preparation", startDate: "2024-02-16", endDate: "2024-03-15", status: "completed" },
    { phase: "Foundation Work", startDate: "2024-03-16", endDate: "2024-04-30", status: "in-progress" },
    { phase: "Main Construction", startDate: "2024-05-01", endDate: "2024-07-15", status: "pending" },
    { phase: "Finishing & Handover", startDate: "2024-07-16", endDate: "2024-08-15", status: "pending" }
  ];

  const documents = [
    { name: "Project Proposal.pdf", type: "Proposal", size: "2.3 MB", date: "2024-01-10" },
    { name: "Site Survey Report.pdf", type: "Survey", size: "1.8 MB", date: "2024-01-15" },
    { name: "Budget Breakdown.xlsx", type: "Financial", size: "850 KB", date: "2024-01-20" },
    { name: "Construction Plans.dwg", type: "Technical", size: "5.2 MB", date: "2024-02-01" }
  ];

  const risks = [
    { risk: "Weather delays during rainy season", impact: "Medium", probability: "High", mitigation: "Schedule buffer included" },
    { risk: "Material cost fluctuation", impact: "High", probability: "Medium", mitigation: "Fixed price contracts" },
    { risk: "Permit approval delays", impact: "Medium", probability: "Low", mitigation: "Early submission process" }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "in-progress": return <Clock className="h-4 w-4 text-blue-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            {project.name}
          </DialogTitle>
          <DialogDescription>
            Complete project details and management information
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Project Overview */}
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">${project.raised.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">Funds Raised</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{project.progress}%</div>
                    <div className="text-sm text-muted-foreground">Progress</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{project.beneficiaries}</div>
                    <div className="text-sm text-muted-foreground">Beneficiaries</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Project Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Detailed Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="timeline">Timeline</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="risks">Risks</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {project.description} This comprehensive project involves multiple phases including 
                      site preparation, construction, and community integration. The facility will feature 
                      modern amenities and sustainable design principles to ensure long-term impact.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3">Key Features</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Modern infrastructure design</li>
                          <li>• Sustainable construction materials</li>
                          <li>• Community-centered approach</li>
                          <li>• Long-term maintenance plan</li>
                          <li>• Local workforce development</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3">Expected Outcomes</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>• Improved access to services</li>
                          <li>• Enhanced community development</li>
                          <li>• Economic opportunities creation</li>
                          <li>• Sustainable impact measurement</li>
                          <li>• Knowledge transfer to locals</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="timeline" className="space-y-4">
                {timeline.map((phase, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(phase.status)}
                          <div>
                            <h4 className="font-semibold">{phase.phase}</h4>
                            <p className="text-sm text-muted-foreground">
                              {phase.startDate} - {phase.endDate}
                            </p>
                          </div>
                        </div>
                        <Badge variant={
                          phase.status === 'completed' ? 'default' :
                          phase.status === 'in-progress' ? 'secondary' : 'outline'
                        }>
                          {phase.status.replace('-', ' ')}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="team" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {team.map((member, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={member.avatar} />
                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{member.name}</h4>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                {documents.map((doc, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-primary" />
                          <div>
                            <h4 className="font-semibold">{doc.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {doc.type} • {doc.size} • {doc.date}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Download</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="risks" className="space-y-4">
                {risks.map((risk, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold">{risk.risk}</h4>
                        <div className="flex gap-4 text-sm">
                          <span>Impact: <Badge variant="outline">{risk.impact}</Badge></span>
                          <span>Probability: <Badge variant="outline">{risk.probability}</Badge></span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          <strong>Mitigation:</strong> {risk.mitigation}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{project.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{project.startDate} - {project.endDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Created by {project.creator}</span>
                </div>
                <div className="pt-2 border-t">
                  <Badge className={project.status === "Active" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                    {project.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                 <Button className="w-full">
                   <Edit className="h-4 w-4 mr-2" />
                   Edit Project
                 </Button>
                 <Button variant="outline" className="w-full">
                   <FileText className="h-4 w-4 mr-2" />
                   Generate Report
                 </Button>
                 <Button variant="outline" className="w-full">
                   <Camera className="h-4 w-4 mr-2" />
                   Upload Photos
                 </Button>
                 <Button variant="outline" className="w-full">
                   <TrendingUp className="h-4 w-4 mr-2" />
                   View Analytics
                 </Button>
                 <Button 
                   variant="destructive" 
                   className="w-full" 
                   onClick={() => setShowDeleteConfirm(true)}
                 >
                   <Trash2 className="h-4 w-4 mr-2" />
                   Delete Project
                 </Button>
              </CardContent>
            </Card>

            {/* Financial Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Financial Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Total Budget</span>
                  <span className="font-semibold">${project.budget.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Allocated</span>
                  <span className="font-semibold">${project.allocated.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Raised</span>
                  <span className="font-semibold text-green-600">${project.raised.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-sm text-muted-foreground">Remaining</span>
                  <span className="font-semibold">${(project.budget - project.raised).toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
           </div>
         </div>

         <DeleteConfirmation
           isOpen={showDeleteConfirm}
           onClose={() => setShowDeleteConfirm(false)}
           onConfirm={() => {
             toast({
               title: "Project Deleted",
               description: `${project.name} has been deleted successfully.`,
             });
             setShowDeleteConfirm(false);
             onClose();
           }}
           title="Delete Project"
           description={`Are you sure you want to delete "${project.name}"? This will remove all associated data, funding records, and progress. This action cannot be undone.`}
           itemName="project"
         />
       </DialogContent>
     </Dialog>
   );
 };

export default ProjectDetailsModal;