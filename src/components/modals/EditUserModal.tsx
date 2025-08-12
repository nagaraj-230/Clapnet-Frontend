import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Shield, Activity, Settings, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    id: number;
    name: string;
    email: string;
    role: string;
    status: string;
    lastLogin: string;
    projects: number;
    avatar: string;
  };
}

const EditUserModal = ({ isOpen, onClose, user }: EditUserModalProps) => {
  const [editedUser, setEditedUser] = useState(user);
  const [activeTab, setActiveTab] = useState("profile");
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "User Updated",
      description: `${editedUser.name}'s profile has been successfully updated.`,
    });
    onClose();
  };

  const activities = [
    { date: "2024-01-15", action: "Logged in", details: "From Kenya office" },
    { date: "2024-01-14", action: "Created project", details: "Hope Primary School" },
    { date: "2024-01-13", action: "Updated profile", details: "Changed contact info" },
    { date: "2024-01-12", action: "Downloaded report", details: "Project funding report" },
  ];

  const permissions = [
    { module: "User Management", read: true, write: true, delete: false },
    { module: "Project Management", read: true, write: true, delete: true },
    { module: "Fund Management", read: true, write: false, delete: false },
    { module: "Reports", read: true, write: false, delete: false },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Edit User Profile
          </DialogTitle>
          <DialogDescription>
            Manage user information, roles, and permissions
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={editedUser.avatar} />
                    <AvatarFallback>{editedUser.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">Change Photo</Button>
                    <p className="text-sm text-muted-foreground">JPG, PNG. Max 2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={editedUser.name}
                      onChange={(e) => setEditedUser({...editedUser, name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editedUser.email}
                      onChange={(e) => setEditedUser({...editedUser, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select value={editedUser.role} onValueChange={(value) => setEditedUser({...editedUser, role: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Super Admin">Super Admin</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Project Creator">Project Creator</SelectItem>
                        <SelectItem value="Fund Manager">Fund Manager</SelectItem>
                        <SelectItem value="Donor Agency">Donor Agency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={editedUser.status} onValueChange={(value) => setEditedUser({...editedUser, status: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                        <SelectItem value="Suspended">Suspended</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Brief description about the user..."
                    className="h-20"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="permissions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Role Permissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {permissions.map((perm, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <span className="font-medium">{perm.module}</span>
                      <div className="flex gap-2">
                        <Badge variant={perm.read ? "default" : "secondary"}>
                          Read: {perm.read ? "Yes" : "No"}
                        </Badge>
                        <Badge variant={perm.write ? "default" : "secondary"}>
                          Write: {perm.write ? "Yes" : "No"}
                        </Badge>
                        <Badge variant={perm.delete ? "default" : "secondary"}>
                          Delete: {perm.delete ? "Yes" : "No"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{activity.action}</h4>
                          <span className="text-sm text-muted-foreground">{activity.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{activity.details}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">Add extra security to your account</p>
                  </div>
                  <Button variant="outline" size="sm">Enable</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Reset Password</h4>
                    <p className="text-sm text-muted-foreground">Send password reset email</p>
                  </div>
                  <Button variant="outline" size="sm">Send Reset</Button>
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
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;