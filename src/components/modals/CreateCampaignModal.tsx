import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Save, X, Upload, Camera, Image as ImageIcon, Calendar, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: string;
}

const CreateCampaignModal = ({ isOpen, onClose, userRole }: CreateCampaignModalProps) => {
  const [campaignData, setCampaignData] = useState({
    name: "",
    description: "",
    target: "",
    location: "",
    category: "",
    startDate: "",
    endDate: "",
    coverImage: "",
    projectType: ""
  });
  const { toast } = useToast();

  const handleSave = () => {
    if (!campaignData.name || !campaignData.target || !campaignData.description) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Campaign Created",
      description: `${campaignData.name} has been successfully created.`,
    });
    
    // Reset form
    setCampaignData({
      name: "",
      description: "",
      target: "",
      location: "",
      category: "",
      startDate: "",
      endDate: "",
      coverImage: "",
      projectType: ""
    });
    onClose();
  };

  const handleImageUpload = () => {
    toast({
      title: "Image Upload",
      description: "Image upload functionality would be available here.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Campaign
          </DialogTitle>
          <DialogDescription>
            Set up a new funding campaign for your mission project
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Campaign Cover Image */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Campaign Cover Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-32 w-48 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                  {campaignData.coverImage ? (
                    <img src={campaignData.coverImage} alt="Campaign cover" className="h-full w-full object-cover rounded-lg" />
                  ) : (
                    <div className="text-center">
                      <Camera className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">No image selected</p>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Button variant="outline" onClick={handleImageUpload}>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                  <p className="text-xs text-muted-foreground">JPG, PNG, or WebP. Max 5MB</p>
                  <p className="text-xs text-muted-foreground">Recommended: 1200x600px</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Campaign Name *</Label>
                  <Input
                    id="name"
                    placeholder="Enter campaign name"
                    value={campaignData.name}
                    onChange={(e) => setCampaignData({...campaignData, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="target">Target Amount ($) *</Label>
                  <Input
                    id="target"
                    type="number"
                    placeholder="50000"
                    value={campaignData.target}
                    onChange={(e) => setCampaignData({...campaignData, target: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Campaign Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your campaign mission, goals, and impact..."
                  value={campaignData.description}
                  onChange={(e) => setCampaignData({...campaignData, description: e.target.value})}
                  className="h-32"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={campaignData.category} onValueChange={(value) => setCampaignData({...campaignData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                      <SelectItem value="Community">Community Development</SelectItem>
                      <SelectItem value="Emergency">Emergency Relief</SelectItem>
                      <SelectItem value="Environment">Environment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, Country"
                    value={campaignData.location}
                    onChange={(e) => setCampaignData({...campaignData, location: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projectType">Project Type</Label>
                  <Select value={campaignData.projectType} onValueChange={(value) => setCampaignData({...campaignData, projectType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="School">School</SelectItem>
                      <SelectItem value="Hospital">Hospital</SelectItem>
                      <SelectItem value="Orphanage">Orphanage</SelectItem>
                      <SelectItem value="Church">Church</SelectItem>
                      <SelectItem value="Community Center">Community Center</SelectItem>
                      <SelectItem value="Water Project">Water Project</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Campaign Timeline
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={campaignData.startDate}
                    onChange={(e) => setCampaignData({...campaignData, startDate: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endDate">End Date</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={campaignData.endDate}
                    onChange={(e) => setCampaignData({...campaignData, endDate: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Campaign Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Campaign Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 border rounded-lg bg-muted/20">
                <div className="flex items-start gap-4">
                  <div className="h-16 w-24 bg-primary/10 rounded-lg flex items-center justify-center">
                    {campaignData.coverImage ? (
                      <img src={campaignData.coverImage} alt="Preview" className="h-full w-full object-cover rounded-lg" />
                    ) : (
                      <ImageIcon className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{campaignData.name || "Campaign Name"}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {campaignData.description || "Campaign description will appear here..."}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      {campaignData.target && (
                        <Badge variant="outline">
                          Target: ${Number(campaignData.target).toLocaleString()}
                        </Badge>
                      )}
                      {campaignData.location && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {campaignData.location}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Create Campaign
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCampaignModal;