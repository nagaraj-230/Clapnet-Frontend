import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { 
  Plus, 
  Save, 
  X, 
  MapPin, 
  DollarSign, 
  Users, 
  Calendar as CalendarIcon, 
  Upload, 
  Image as ImageIcon,
  Building,
  GraduationCap,
  Home,
  AlertCircle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: string;
}

const CreateProjectModal = ({ isOpen, onClose, userRole }: CreateProjectModalProps) => {
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    type: "",
    category: "",
    location: "",
    country: "",
    targetAmount: "",
    estimatedDuration: "",
    beneficiaries: "",
    priority: "",
    objectives: "",
    expectedOutcomes: "",
    sustainability: "",
    projectImages: []
  });
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const { toast } = useToast();

  const handleSave = () => {
    if (!projectData.title || !projectData.description || !projectData.targetAmount) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Project Created",
      description: `${projectData.title} has been successfully submitted for review.`,
    });
    
    // Reset form
    setProjectData({
      title: "",
      description: "",
      type: "",
      category: "",
      location: "",
      country: "",
      targetAmount: "",
      estimatedDuration: "",
      beneficiaries: "",
      priority: "",
      objectives: "",
      expectedOutcomes: "",
      sustainability: "",
      projectImages: []
    });
    setStartDate(undefined);
    setEndDate(undefined);
    onClose();
  };

  const getProjectIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "school": return GraduationCap;
      case "hospital": return Building;
      case "orphanage": return Home;
      default: return Building;
    }
  };

  const handleImageUpload = () => {
    toast({
      title: "Image Upload",
      description: "Project image upload functionality would be available here.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Project
          </DialogTitle>
          <DialogDescription>
            Submit a new mission project for approval and funding
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Project Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Hope Primary School Construction"
                      value={projectData.title}
                      onChange={(e) => setProjectData({...projectData, title: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="type">Project Type *</Label>
                    <Select value={projectData.type} onValueChange={(value) => setProjectData({...projectData, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="School">School</SelectItem>
                        <SelectItem value="Hospital">Hospital</SelectItem>
                        <SelectItem value="Orphanage">Orphanage</SelectItem>
                        <SelectItem value="Church">Church</SelectItem>
                        <SelectItem value="Community Center">Community Center</SelectItem>
                        <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Project Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a detailed description of the project, its purpose, and expected impact..."
                    value={projectData.description}
                    onChange={(e) => setProjectData({...projectData, description: e.target.value})}
                    className="h-32"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={projectData.category} onValueChange={(value) => setProjectData({...projectData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                        <SelectItem value="Community Development">Community Development</SelectItem>
                        <SelectItem value="Emergency Relief">Emergency Relief</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input
                      id="location"
                      placeholder="City/Region"
                      value={projectData.location}
                      onChange={(e) => setProjectData({...projectData, location: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Select value={projectData.country} onValueChange={(value) => setProjectData({...projectData, country: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Kenya">Kenya</SelectItem>
                        <SelectItem value="Tanzania">Tanzania</SelectItem>
                        <SelectItem value="Uganda">Uganda</SelectItem>
                        <SelectItem value="Ethiopia">Ethiopia</SelectItem>
                        <SelectItem value="Ghana">Ghana</SelectItem>
                        <SelectItem value="Nigeria">Nigeria</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Financial & Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Financial & Timeline Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="targetAmount">Target Amount ($) *</Label>
                    <Input
                      id="targetAmount"
                      type="number"
                      placeholder="50000"
                      value={projectData.targetAmount}
                      onChange={(e) => setProjectData({...projectData, targetAmount: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="beneficiaries">Beneficiaries *</Label>
                    <Input
                      id="beneficiaries"
                      type="number"
                      placeholder="300"
                      value={projectData.beneficiaries}
                      onChange={(e) => setProjectData({...projectData, beneficiaries: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="priority">Priority Level</Label>
                    <Select value={projectData.priority} onValueChange={(value) => setProjectData({...projectData, priority: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Critical">Critical</SelectItem>
                        <SelectItem value="High">High</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : "Select start date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={setStartDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label>End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : "Select end date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={setEndDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Images */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Project Images
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-24 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer" onClick={handleImageUpload}>
                      <Upload className="h-6 w-6 text-muted-foreground" />
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">Upload project images (JPG, PNG. Max 5MB each)</p>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Project Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    {projectData.type && (
                      <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        {(() => {
                          const Icon = getProjectIcon(projectData.type);
                          return <Icon className="h-5 w-5 text-primary" />;
                        })()}
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold">{projectData.title || "Project Title"}</h3>
                      {projectData.location && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {projectData.location}
                        </p>
                      )}
                    </div>
                  </div>

                  {projectData.targetAmount && (
                    <div className="p-3 bg-primary/5 rounded-lg">
                      <p className="text-sm text-muted-foreground">Target Amount</p>
                      <p className="text-lg font-bold text-primary">${Number(projectData.targetAmount).toLocaleString()}</p>
                    </div>
                  )}

                  {projectData.beneficiaries && (
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{Number(projectData.beneficiaries).toLocaleString()} beneficiaries</span>
                    </div>
                  )}

                  {projectData.priority && (
                    <Badge variant="outline">{projectData.priority} Priority</Badge>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Project Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Submission Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="space-y-2">
                  <h4 className="font-medium">Required Documents:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Detailed project proposal</li>
                    <li>• Budget breakdown</li>
                    <li>• Timeline & milestones</li>
                    <li>• Community impact assessment</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Review Process:</h4>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Initial review (2-3 days)</li>
                    <li>• Committee evaluation (1 week)</li>
                    <li>• Final approval & funding</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Submit Project
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectModal;