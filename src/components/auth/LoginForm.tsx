import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Eye, EyeOff, Heart, Users } from "lucide-react";
import LogoFallback from "@/components/ui/logo-fallback";

interface LoginFormProps {
  onLogin: (email: string, role: string) => void;
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Demo users for different roles
  const demoUsers = {
    "superadmin@gmail.com": { role: "Super Admin", password: "Super@123" },
    "admin@mission.org": { role: "Admin", password: "admin123" },
    "creator@mission.org": { role: "Project Creator", password: "creator123" },
    "funds@mission.org": { role: "Fund Manager", password: "funds123" },
    "donor@agency.org": { role: "Donor Agency", password: "donor123" },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user = demoUsers[email as keyof typeof demoUsers];
      
      if (user && user.password === password) {
        toast({
          title: "Welcome back!",
          description: `Logged in as ${user.role}`,
        });
        onLogin(email, user.role);
      } else {
        toast({
          title: "Invalid credentials",
          description: "Please check your email and password",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-mission-gold/10 p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Logo and Branding */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <LogoFallback className="h-20 w-20" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Mission Portal</h1>
            <p className="text-muted-foreground flex items-center justify-center gap-2 mt-2">
              <Users className="h-4 w-4" />
              Building Hope, Changing Lives
            </p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="border-0 shadow-large bg-card/80 backdrop-blur-sm">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Sign in to your account to continue your mission work
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 bg-gradient-to-r from-primary to-primary-glow hover:shadow-medium transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm font-medium text-muted-foreground mb-2">Demo Credentials:</p>
              <div className="space-y-1 text-xs text-muted-foreground">
                <p><strong>Super Admin:</strong> superadmin@gmail.com / Super@123</p>
                <p><strong>Admin:</strong> admin@mission.org / admin123</p>
                <p><strong>Project Creator:</strong> creator@mission.org / creator123</p>
                <p><strong>Fund Manager:</strong> funds@mission.org / funds123</p>
                <p><strong>Donor Agency:</strong> donor@agency.org / donor123</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginForm;