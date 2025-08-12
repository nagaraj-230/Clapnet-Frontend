import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Plus, Save, X, DollarSign, Target, Users, Calendar, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CreateFundModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: string;
}

const CreateFundModal = ({ isOpen, onClose, userRole }: CreateFundModalProps) => {
  const [fundData, setFundData] = useState({
    name: "",
    description: "",
    targetAmount: "",
    minimumDonation: "",
    fundType: "",
    priority: "",
    allocationType: "manual",
    allowPublicDonations: true,
    autoDistribution: false,
    fundManager: "",
    deadlineType: "ongoing",
    specificDeadline: "",
    fundingGoals: [],
    restrictions: ""
  });
  const { toast } = useToast();

  const handleSave = () => {
    if (!fundData.name || !fundData.targetAmount || !fundData.description) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Fund Created",
      description: `${fundData.name} has been successfully created and is ready for allocation.`,
    });
    
    // Reset form
    setFundData({
      name: "",
      description: "",
      targetAmount: "",
      minimumDonation: "",
      fundType: "",
      priority: "",
      allocationType: "manual",
      allowPublicDonations: true,
      autoDistribution: false,
      fundManager: "",
      deadlineType: "ongoing",
      specificDeadline: "",
      fundingGoals: [],
      restrictions: ""
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Create New Fund
          </DialogTitle>
          <DialogDescription>
            Set up a new funding pool for mission projects and campaigns
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Fund Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Fund Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Fund Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Education Development Fund"
                    value={fundData.name}
                    onChange={(e) => setFundData({...fundData, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="targetAmount">Target Amount ($) *</Label>
                  <Input
                    id="targetAmount"
                    type="number"
                    placeholder="100000"
                    value={fundData.targetAmount}
                    onChange={(e) => setFundData({...fundData, targetAmount: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Fund Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the purpose of this fund, what types of projects it will support..."
                  value={fundData.description}
                  onChange={(e) => setFundData({...fundData, description: e.target.value})}
                  className="h-24"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fundType">Fund Type</Label>
                  <Select value={fundData.fundType} onValueChange={(value) => setFundData({...fundData, fundType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select fund type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General Fund</SelectItem>
                      <SelectItem value="Education">Education Fund</SelectItem>
                      <SelectItem value="Healthcare">Healthcare Fund</SelectItem>
                      <SelectItem value="Infrastructure">Infrastructure Fund</SelectItem>
                      <SelectItem value="Emergency">Emergency Relief Fund</SelectItem>
                      <SelectItem value="Endowment">Endowment Fund</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select value={fundData.priority} onValueChange={(value) => setFundData({...fundData, priority: value})}>
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

                <div className="space-y-2">
                  <Label htmlFor="minimumDonation">Minimum Donation ($)</Label>
                  <Input
                    id="minimumDonation"
                    type="number"
                    placeholder="25"
                    value={fundData.minimumDonation}
                    onChange={(e) => setFundData({...fundData, minimumDonation: e.target.value})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Fund Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Fund Management & Allocation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fundManager">Fund Manager</Label>
                <Select value={fundData.fundManager} onValueChange={(value) => setFundData({...fundData, fundManager: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Assign fund manager" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="John Doe">John Doe (Super Admin)</SelectItem>
                    <SelectItem value="Jane Smith">Jane Smith (Fund Manager)</SelectItem>
                    <SelectItem value="Mike Johnson">Mike Johnson (Admin)</SelectItem>
                    <SelectItem value="auto">Auto-assign</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Allocation Settings</Label>
                <RadioGroup 
                  value={fundData.allocationType} 
                  onValueChange={(value) => setFundData({...fundData, allocationType: value})}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="manual" id="manual" />
                    <Label htmlFor="manual" className="cursor-pointer">
                      <div>
                        <p className="font-medium">Manual Allocation</p>
                        <p className="text-sm text-muted-foreground">Fund manager manually distributes funds to projects</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="automatic" id="automatic" />
                    <Label htmlFor="automatic" className="cursor-pointer">
                      <div>
                        <p className="font-medium">Automatic Allocation</p>
                        <p className="text-sm text-muted-foreground">Funds are distributed based on predefined rules</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hybrid" id="hybrid" />
                    <Label htmlFor="hybrid" className="cursor-pointer">
                      <div>
                        <p className="font-medium">Hybrid Approach</p>
                        <p className="text-sm text-muted-foreground">Combination of automatic and manual allocation</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Allow Public Donations</p>
                    <p className="text-sm text-muted-foreground">External donors can contribute to this fund</p>
                  </div>
                  <Switch
                    checked={fundData.allowPublicDonations}
                    onCheckedChange={(checked) => setFundData({...fundData, allowPublicDonations: checked})}
                  />
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Auto Distribution</p>
                    <p className="text-sm text-muted-foreground">Automatically distribute funds when goals are met</p>
                  </div>
                  <Switch
                    checked={fundData.autoDistribution}
                    onCheckedChange={(checked) => setFundData({...fundData, autoDistribution: checked})}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Fund Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup 
                value={fundData.deadlineType} 
                onValueChange={(value) => setFundData({...fundData, deadlineType: value})}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="ongoing" id="ongoing" />
                  <Label htmlFor="ongoing" className="cursor-pointer">Ongoing Fund (No deadline)</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="deadline" id="deadline" />
                  <Label htmlFor="deadline" className="cursor-pointer">Specific Deadline</Label>
                </div>
              </RadioGroup>

              {fundData.deadlineType === "deadline" && (
                <div className="space-y-2 ml-6">
                  <Label htmlFor="specificDeadline">Fund Deadline</Label>
                  <Input
                    id="specificDeadline"
                    type="date"
                    value={fundData.specificDeadline}
                    onChange={(e) => setFundData({...fundData, specificDeadline: e.target.value})}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Restrictions & Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Fund Restrictions & Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="restrictions">Usage Restrictions (Optional)</Label>
                <Textarea
                  id="restrictions"
                  placeholder="Specify any restrictions on how this fund can be used, geographic limitations, project types, etc..."
                  value={fundData.restrictions}
                  onChange={(e) => setFundData({...fundData, restrictions: e.target.value})}
                  className="h-20"
                />
              </div>
            </CardContent>
          </Card>

          {/* Fund Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Fund Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 border rounded-lg bg-muted/20 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Fund Name:</span>
                  <span>{fundData.name || "Not specified"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Target Amount:</span>
                  <span>{fundData.targetAmount ? `$${Number(fundData.targetAmount).toLocaleString()}` : "Not specified"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Fund Type:</span>
                  <span>{fundData.fundType || "Not specified"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Allocation Type:</span>
                  <Badge variant="outline">{fundData.allocationType}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Public Donations:</span>
                  <Badge variant={fundData.allowPublicDonations ? "default" : "secondary"}>
                    {fundData.allowPublicDonations ? "Enabled" : "Disabled"}
                  </Badge>
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
            Create Fund
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateFundModal;