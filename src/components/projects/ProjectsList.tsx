import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Building, 
  GraduationCap, 
  Home, 
  MapPin, 
  Calendar,
  DollarSign,
  Users,
  Search,
  Filter,
  Plus,
  Heart,
  Eye
} from "lucide-react";
import ProjectDetailsModal from "@/components/modals/ProjectDetailsModal";
import AnalysisModal from "@/components/modals/AnalysisModal";
import CreateProjectModal from "@/components/modals/CreateProjectModal";

interface ProjectsListProps {
  userRole: string;
  onCreateProject?: () => void;
}

const ProjectsList = ({ userRole, onCreateProject }: ProjectsListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showCreateProject, setShowCreateProject] = useState(false);

  // Mock projects data
  const projects = [
    {
      id: 1,
      name: "St. Mary's Primary School",
      type: "School",
      location: "Nairobi, Kenya",
      status: "Active",
      progress: 75,
      budget: 85000,
      allocated: 63750,
      raised: 58000,
      beneficiaries: 350,
      startDate: "2024-01-15",
      endDate: "2024-08-15",
      description: "Building a modern primary school to serve the growing community.",
      creator: "John Doe",
    },
    {
      id: 2,
      name: "Hope Medical Center",
      type: "Hospital",
      location: "Dar es Salaam, Tanzania",
      status: "Planning",
      progress: 25,
      budget: 120000,
      allocated: 30000,
      raised: 15000,
      beneficiaries: 2000,
      startDate: "2024-03-01",
      endDate: "2024-12-01",
      description: "Establishing a medical center to provide healthcare services.",
      creator: "Dr. Sarah Wilson",
    },
    {
      id: 3,
      name: "Little Angels Orphanage",
      type: "Orphanage",
      location: "Kampala, Uganda",
      status: "Active",
      progress: 90,
      budget: 65000,
      allocated: 58500,
      raised: 62000,
      beneficiaries: 50,
      startDate: "2023-09-01",
      endDate: "2024-06-01",
      description: "Expanding facilities to accommodate more children in need.",
      creator: "Mary Johnson",
    },
    {
      id: 4,
      name: "Community Water Well",
      type: "Infrastructure",
      location: "Rural Ghana",
      status: "Completed",
      progress: 100,
      budget: 25000,
      allocated: 25000,
      raised: 25000,
      beneficiaries: 1200,
      startDate: "2023-11-01",
      endDate: "2024-02-01",
      description: "Providing clean water access to rural communities.",
      creator: "David Brown",
    },
    {
      id: 5,
      name: "Girls Education Center",
      type: "School",
      location: "Addis Ababa, Ethiopia",
      status: "Funding",
      progress: 10,
      budget: 95000,
      allocated: 9500,
      raised: 5000,
      beneficiaries: 200,
      startDate: "2024-06-01",
      endDate: "2025-01-01",
      description: "Creating educational opportunities for girls in underserved areas.",
      creator: "Lisa Chen",
    },
  ];

  const getProjectIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "school":
        return GraduationCap;
      case "hospital":
        return Building;
      case "orphanage":
        return Home;
      default:
        return Building;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-success text-success-foreground";
      case "planning":
        return "bg-mission-blue text-white";
      case "completed":
        return "bg-mission-gold text-white";
      case "funding":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || project.status.toLowerCase() === filterStatus;
    const matchesType = filterType === "all" || project.type.toLowerCase() === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const canCreateProjects = ["Super Admin", "Admin", "Project Creator"].includes(userRole);
  const canViewDetails = true;
  const canDonate = userRole === "Donor Agency";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground">
            {userRole === "Donor Agency" 
              ? "Discover and support meaningful mission projects"
              : "Manage and track mission projects"
            }
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowAnalysis(true)}>
            <Eye className="h-4 w-4 mr-2" />
            View Analysis
          </Button>
          {canCreateProjects && (
            <Button 
              onClick={() => setShowCreateProject(true)}
              className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-medium transition-all duration-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Project
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <Card className="border-0 shadow-medium">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search projects or locations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-40">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="funding">Funding</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="school">Schools</SelectItem>
                <SelectItem value="hospital">Hospitals</SelectItem>
                <SelectItem value="orphanage">Orphanages</SelectItem>
                <SelectItem value="infrastructure">Infrastructure</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredProjects.map((project) => {
          const ProjectIcon = getProjectIcon(project.type);
          const progressPercentage = Math.round((project.raised / project.budget) * 100);
          
          return (
            <Card key={project.id} className="border-0 shadow-medium hover:shadow-large transition-all duration-300 overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <ProjectIcon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-foreground">
                        {project.name}
                      </CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{project.location}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {project.description}
                </p>

                {/* Progress */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-foreground">Funding Progress</span>
                    <span className="text-sm text-muted-foreground">{progressPercentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-mission-gold" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        ${project.raised.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        of ${project.budget.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-mission-blue" />
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {project.beneficiaries.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground">beneficiaries</p>
                    </div>
                  </div>
                </div>

                {/* Timeline */}
                <div className="flex items-center space-x-2 text-xs text-muted-foreground pt-2 border-t border-border/50">
                  <Calendar className="h-3 w-3" />
                  <span>{new Date(project.startDate).toLocaleDateString()}</span>
                  <span>-</span>
                  <span>{new Date(project.endDate).toLocaleDateString()}</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  {canViewDetails && (
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => setSelectedProject(project)}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  )}
                  {canDonate && project.status !== "Completed" && (
                    <Button size="sm" className="flex-1 bg-gradient-to-r from-success to-mission-green hover:shadow-medium">
                      <Heart className="h-4 w-4 mr-2" />
                      Donate
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <Card className="border-0 shadow-medium">
          <CardContent className="p-12 text-center">
            <Building className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No projects found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or filters.
            </p>
            {canCreateProjects && (
              <Button onClick={() => setShowCreateProject(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Create First Project
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {selectedProject && (
        <ProjectDetailsModal
          isOpen={!!selectedProject}
          onClose={() => setSelectedProject(null)}
          project={selectedProject}
        />
      )}

      <AnalysisModal
        isOpen={showAnalysis}
        onClose={() => setShowAnalysis(false)}
        userRole={userRole}
      />

      <CreateProjectModal
        isOpen={showCreateProject}
        onClose={() => setShowCreateProject(false)}
        userRole={userRole}
      />
    </div>
  );
};

export default ProjectsList;