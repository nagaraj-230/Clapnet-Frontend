import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Edit3, Save, X, Target, Calendar, DollarSign, Users, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EditCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: {
    id: number;
    name: string;
    description: string;
    target: number;
    raised: number;
    status: string;
    startDate: string;
    endDate: string;
    location: string;
    category: string;
  };
}

const EditCampaignModal = ({ isOpen, onClose, campaign }: EditCampaignModalProps) => {
  const [editedCampaign, setEditedCampaign] = useState(campaign);
  const [deleteItem, setDeleteItem] = useState<{ type: 'photo' | 'update', id: number } | null>(null);
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Campaign Updated",
      description: `${editedCampaign.name} has been successfully updated.`,
    });
    onClose();
  };

  const handleDeleteItem = () => {
    if (deleteItem) {
      const itemType = deleteItem.type === 'photo' ? 'Photo' : 'Update';
      toast({
        title: `${itemType} Deleted`,
        description: `The ${itemType.toLowerCase()} has been removed successfully.`,
      });
      setDeleteItem(null);
    }
  };

  const progressPercentage = (editedCampaign.raised / editedCampaign.target) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Edit3 className="h-5 w-5" />
            Edit Campaign
          </DialogTitle>
          <DialogDescription>
            Modify campaign details and settings
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="media">Photos & Media</TabsTrigger>
            <TabsTrigger value="funding">Funding</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="media" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Edit3 className="h-4 w-4" />
                  Campaign Photos & Updates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Cover Image */}
                <div className="space-y-4">
                  <h4 className="font-medium">Cover Image</h4>
                  <div className="flex items-center space-x-4">
                    <div className="h-32 w-48 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                      <div className="text-center">
                        <Edit3 className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">Current campaign image</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button variant="outline" onClick={() => toast({
                        title: "Image Upload",
                        description: "Photo upload functionality available here.",
                      })}>
                        <Edit3 className="h-4 w-4 mr-2" />
                        Change Image
                      </Button>
                      <p className="text-xs text-muted-foreground">JPG, PNG, or WebP. Max 5MB</p>
                    </div>
                  </div>
                </div>

                {/* Gallery */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Campaign Gallery</h4>
                    <Button variant="outline" size="sm" onClick={() => toast({
                      title: "Add Photos",
                      description: "Photo gallery functionality available here.",
                    })}>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Add Photos
                    </Button>
                  </div>
                   <div className="grid grid-cols-3 gap-4">
                     {[1, 2, 3].map((i) => (
                       <div key={i} className="relative group h-24 bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                         <Edit3 className="h-4 w-4 text-muted-foreground" />
                         <Button
                           variant="destructive"
                           size="sm"
                           className="absolute top-1 right-1 h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                           onClick={() => setDeleteItem({ type: 'photo', id: i })}
                         >
                           <Trash2 className="h-3 w-3" />
                         </Button>
                       </div>
                     ))}
                   </div>
                </div>

                {/* Campaign Updates */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Campaign Updates</h4>
                    <Button variant="outline" size="sm" onClick={() => toast({
                      title: "Add Update",
                      description: "Campaign update functionality available here.",
                    })}>
                      <Edit3 className="h-4 w-4 mr-2" />
                      Add Update
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { date: "2024-01-15", title: "Construction Phase Completed", content: "We've successfully completed the foundation work and are moving to the next phase." },
                      { date: "2024-01-10", title: "50% Funding Milestone Reached", content: "Thanks to our amazing supporters, we've reached 50% of our funding goal!" },
                      { date: "2024-01-05", title: "Project Officially Launched", content: "We're excited to officially launch this campaign and start making a difference." }
                     ].map((update, i) => (
                       <Card key={i} className="p-4">
                         <div className="flex items-start justify-between">
                           <div className="flex-1">
                             <div className="flex items-center gap-2 mb-2">
                               <Badge variant="outline">{update.date}</Badge>
                               <h5 className="font-medium">{update.title}</h5>
                             </div>
                             <p className="text-sm text-muted-foreground">{update.content}</p>
                           </div>
                           <div className="flex gap-1">
                             <Button variant="ghost" size="sm" onClick={() => toast({
                               title: "Edit Update",
                               description: "Update editing functionality available here.",
                             })}>
                               <Edit3 className="h-3 w-3" />
                             </Button>
                             <Button 
                               variant="ghost" 
                               size="sm" 
                               className="text-destructive hover:text-destructive"
                               onClick={() => setDeleteItem({ type: 'update', id: i })}
                             >
                               <Trash2 className="h-3 w-3" />
                             </Button>
                           </div>
                         </div>
                       </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Campaign Name</Label>
                    <Input
                      id="name"
                      value={editedCampaign.name}
                      onChange={(e) => setEditedCampaign({...editedCampaign, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={editedCampaign.description}
                      onChange={(e) => setEditedCampaign({...editedCampaign, description: e.target.value})}
                      className="h-24"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={editedCampaign.location}
                      onChange={(e) => setEditedCampaign({...editedCampaign, location: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select value={editedCampaign.category} onValueChange={(value) => setEditedCampaign({...editedCampaign, category: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                        <SelectItem value="Community">Community Development</SelectItem>
                        <SelectItem value="Emergency">Emergency Relief</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={editedCampaign.startDate}
                      onChange={(e) => setEditedCampaign({...editedCampaign, startDate: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={editedCampaign.endDate}
                      onChange={(e) => setEditedCampaign({...editedCampaign, endDate: e.target.value})}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="funding" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Funding Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="target">Target Amount ($)</Label>
                    <Input
                      id="target"
                      type="number"
                      value={editedCampaign.target}
                      onChange={(e) => setEditedCampaign({...editedCampaign, target: Number(e.target.value)})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Current Raised Amount</Label>
                    <Input
                      value={`$${editedCampaign.raised.toLocaleString()}`}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{progressPercentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>${editedCampaign.raised.toLocaleString()} raised</span>
                    <span>${editedCampaign.target.toLocaleString()} goal</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-2xl font-bold text-green-600">
                      <Target className="h-5 w-5" />
                      ${(editedCampaign.target - editedCampaign.raised).toLocaleString()}
                    </div>
                    <p className="text-sm text-muted-foreground">Remaining</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-2xl font-bold text-blue-600">
                      <Users className="h-5 w-5" />
                      47
                    </div>
                    <p className="text-sm text-muted-foreground">Donors</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-2xl font-bold text-purple-600">
                      <Calendar className="h-5 w-5" />
                      23
                    </div>
                    <p className="text-sm text-muted-foreground">Days Left</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Campaign Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Campaign Status</Label>
                  <Select value={editedCampaign.status} onValueChange={(value) => setEditedCampaign({...editedCampaign, status: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Paused">Paused</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 gap-4 p-4 border rounded-lg">
                  <h4 className="font-medium">Campaign Features</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Allow Anonymous Donations</p>
                        <p className="text-sm text-muted-foreground">Let donors contribute without revealing identity</p>
                      </div>
                      <Badge variant="outline">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Send Progress Updates</p>
                        <p className="text-sm text-muted-foreground">Notify donors about campaign milestones</p>
                      </div>
                      <Badge variant="outline">Enabled</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Public Campaign Page</p>
                        <p className="text-sm text-muted-foreground">Make campaign visible to public</p>
                      </div>
                      <Badge variant="outline">Enabled</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
         </div>

         <AlertDialog open={!!deleteItem} onOpenChange={() => setDeleteItem(null)}>
           <AlertDialogContent>
             <AlertDialogHeader>
               <AlertDialogTitle>Confirm {deleteItem?.type === 'photo' ? 'Photo' : 'Update'} Deletion</AlertDialogTitle>
               <AlertDialogDescription>
                 Are you sure you want to delete this {deleteItem?.type === 'photo' ? 'photo' : 'campaign update'}? This action cannot be undone.
               </AlertDialogDescription>
             </AlertDialogHeader>
             <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction onClick={handleDeleteItem} className="bg-destructive hover:bg-destructive/90">
                 Delete {deleteItem?.type === 'photo' ? 'Photo' : 'Update'}
               </AlertDialogAction>
             </AlertDialogFooter>
           </AlertDialogContent>
         </AlertDialog>
       </DialogContent>
     </Dialog>
   );
 };

export default EditCampaignModal;