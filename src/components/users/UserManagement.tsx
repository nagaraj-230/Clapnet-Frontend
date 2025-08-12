import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, UserPlus, Search, Filter, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useToast } from "@/components/ui/use-toast";
import EditUserModal from "@/components/modals/EditUserModal";

interface UserManagementProps {
  userRole: string;
}

const UserManagement = ({ userRole }: UserManagementProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [editingUser, setEditingUser] = useState<any>(null);
  const [userToDeactivate, setUserToDeactivate] = useState<any>(null);
  const { toast } = useToast();

  const users = [
    {
      id: 1,
      name: "John Smith",
      email: "john@mission.org",
      role: "Project Creator",
      status: "Active",
      lastLogin: "2024-01-15",
      projects: 3,
      avatar: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Mary Johnson",
      email: "mary@funds.org",
      role: "Fund Manager",
      status: "Active",
      lastLogin: "2024-01-14",
      projects: 7,
      avatar: "/placeholder.svg"
    },
    {
      id: 3,
      name: "David Wilson",
      email: "david@donor.org",
      role: "Donor Agency",
      status: "Inactive",
      lastLogin: "2024-01-10",
      projects: 0,
      avatar: "/placeholder.svg"
    },
    {
      id: 4,
      name: "Sarah Brown",
      email: "sarah@admin.org",
      role: "Admin",
      status: "Active",
      lastLogin: "2024-01-15",
      projects: 12,
      avatar: "/placeholder.svg"
    }
  ];

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Super Admin": return "bg-destructive text-destructive-foreground";
      case "Admin": return "bg-primary text-primary-foreground";
      case "Project Creator": return "bg-secondary text-secondary-foreground";
      case "Fund Manager": return "bg-accent text-accent-foreground";
      case "Donor Agency": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusColor = (status: string) => {
    return status === "Active" 
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleDeactivateUser = () => {
    if (userToDeactivate) {
      toast({
        title: "User Deactivated",
        description: `${userToDeactivate.name} has been deactivated successfully.`,
      });
      setUserToDeactivate(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">User Management</h2>
          <p className="text-muted-foreground">Manage users and their roles in the mission system</p>
        </div>
        {(userRole === "Super Admin" || userRole === "Admin") && (
          <Button className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Add New User
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">{users.filter(u => u.status === "Active").length}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-green-500"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Project Creators</p>
                <p className="text-2xl font-bold">{users.filter(u => u.role === "Project Creator").length}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-secondary-foreground"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Fund Managers</p>
                <p className="text-2xl font-bold">{users.filter(u => u.role === "Fund Manager").length}</p>
              </div>
              <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-accent-foreground"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Users List</CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users..."
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
                  <DropdownMenuItem onClick={() => setFilterRole("all")}>All Roles</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterRole("Admin")}>Admin</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterRole("Project Creator")}>Project Creator</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterRole("Fund Manager")}>Fund Manager</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterRole("Donor Agency")}>Donor Agency</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-semibold">{user.name}</h4>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                  <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                  <div className="text-right text-sm text-muted-foreground hidden sm:block">
                    <p>{user.projects} projects</p>
                    <p>Last: {user.lastLogin}</p>
                  </div>
                  {(userRole === "Super Admin" || userRole === "Admin") && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setEditingUser(user)}>Edit User</DropdownMenuItem>
                        <DropdownMenuItem>Reset Password</DropdownMenuItem>
                        <DropdownMenuItem>View Projects</DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => setUserToDeactivate(user)}
                        >
                          Deactivate
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {editingUser && (
        <EditUserModal
          isOpen={!!editingUser}
          onClose={() => setEditingUser(null)}
          user={editingUser}
        />
      )}

      <AlertDialog open={!!userToDeactivate} onOpenChange={() => setUserToDeactivate(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm User Deactivation</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to deactivate {userToDeactivate?.name}? This action will prevent them from accessing the system. You can reactivate them later if needed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeactivateUser} className="bg-destructive hover:bg-destructive/90">
              Deactivate User
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserManagement;