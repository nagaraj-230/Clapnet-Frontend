import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Upload, MapPin, DollarSign, Users, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateProjectProps {
  userRole: string;
}

const CreateProject = ({ userRole }: CreateProjectProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "",
    location: "",
    country: "",
    targetAmount: "",
    estimatedDuration: "",
    beneficiaries: "",
    priority: "",
    category: ""
  });
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Project Created",
      description: "Your project has been successfully submitted for review.",
    });
  };

  if (userRole !== "Project Creator" && userRole !== "Super Admin" && userRole !== "Admin") {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-foreground mb-4">Access Restricted</h2>
        <p className="text-muted-foreground">You don't have permission to create projects.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground">Create New Project</h2>
        <p className="text-muted-foreground mt-2">Submit a new mission project for approval and funding</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Project Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter project title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Project Type *</Label>
                <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="school">School Construction</SelectItem>
                    <SelectItem value="hospital">Medical Facility</SelectItem>
                    <SelectItem value="orphanage">Orphanage</SelectItem>
                    <SelectItem value="church">Church Building</SelectItem>
                    <SelectItem value="water">Water Well</SelectItem>
                    <SelectItem value="agriculture">Agricultural Project</SelectItem>
                    <SelectItem value="community">Community Center</SelectItem>
                    <SelectItem value="emergency">Emergency Relief</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Project Description *</Label>
              <Textarea
                id="description"
                placeholder="Describe the project goals, impact, and implementation plan"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={4}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location/City *</Label>
                <Input
                  id="location"
                  placeholder="Enter city or region"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
                <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kenya">Kenya</SelectItem>
                    <SelectItem value="uganda">Uganda</SelectItem>
                    <SelectItem value="tanzania">Tanzania</SelectItem>
                    <SelectItem value="rwanda">Rwanda</SelectItem>
                    <SelectItem value="ethiopia">Ethiopia</SelectItem>
                    <SelectItem value="mozambique">Mozambique</SelectItem>
                    <SelectItem value="malawi">Malawi</SelectItem>
                    <SelectItem value="zambia">Zambia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority Level *</Label>
                <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Budget & Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="targetAmount">Target Amount (USD) *</Label>
                <Input
                  id="targetAmount"
                  type="number"
                  placeholder="Enter target amount"
                  value={formData.targetAmount}
                  onChange={(e) => handleInputChange("targetAmount", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="beneficiaries">Expected Beneficiaries *</Label>
                <Input
                  id="beneficiaries"
                  type="number"
                  placeholder="Number of people who will benefit"
                  value={formData.beneficiaries}
                  onChange={(e) => handleInputChange("beneficiaries", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Select start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={startDate} onSelect={setStartDate} />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>End Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Select end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={endDate} onSelect={setEndDate} />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="estimatedDuration">Duration (months) *</Label>
                <Input
                  id="estimatedDuration"
                  type="number"
                  placeholder="Project duration"
                  value={formData.estimatedDuration}
                  onChange={(e) => handleInputChange("estimatedDuration", e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Supporting Documents
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectPlan">Project Plan (PDF)</Label>
                <Input id="projectPlan" type="file" accept=".pdf" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">Detailed Budget (Excel/PDF)</Label>
                <Input id="budget" type="file" accept=".pdf,.xlsx,.xls" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="images">Project Images</Label>
                <Input id="images" type="file" accept="image/*" multiple />
              </div>
              <div className="space-y-2">
                <Label htmlFor="permits">Permits & Approvals</Label>
                <Input id="permits" type="file" accept=".pdf" multiple />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">Save as Draft</Button>
          <Button type="submit">Submit for Review</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;