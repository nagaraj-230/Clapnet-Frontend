import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Lock, Eye, EyeOff, Save, X, Shield, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChangePasswordModal = ({ isOpen, onClose }: ChangePasswordModalProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();

  // Password strength calculation
  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    strength = Object.values(checks).filter(Boolean).length;
    return { strength: (strength / 5) * 100, checks };
  };

  const { strength, checks } = calculatePasswordStrength(newPassword);

  const getStrengthColor = () => {
    if (strength < 40) return "bg-red-500";
    if (strength < 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = () => {
    if (strength < 40) return "Weak";
    if (strength < 80) return "Medium";
    return "Strong";
  };

  const handleSave = () => {
    if (!currentPassword) {
      toast({
        title: "Current Password Required",
        description: "Please enter your current password.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "New password and confirmation don't match.",
        variant: "destructive",
      });
      return;
    }

    if (strength < 60) {
      toast({
        title: "Password Too Weak",
        description: "Please choose a stronger password.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Password Changed",
      description: "Your password has been successfully updated.",
    });
    
    // Reset form
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Change Password
          </DialogTitle>
          <DialogDescription>
            Update your account password for enhanced security
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Password */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter your current password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* New Password */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="h-4 w-4" />
                New Password
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter your new password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {newPassword && (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Password Strength</span>
                      <span className={`font-medium ${strength < 40 ? 'text-red-600' : strength < 80 ? 'text-yellow-600' : 'text-green-600'}`}>
                        {getStrengthText()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor()}`}
                        style={{ width: `${strength}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Password Requirements:</p>
                    <div className="grid grid-cols-1 gap-1 text-xs">
                      <div className={`flex items-center gap-2 ${checks.length ? 'text-green-600' : 'text-gray-500'}`}>
                        {checks.length ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                        At least 8 characters
                      </div>
                      <div className={`flex items-center gap-2 ${checks.lowercase ? 'text-green-600' : 'text-gray-500'}`}>
                        {checks.lowercase ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                        One lowercase letter
                      </div>
                      <div className={`flex items-center gap-2 ${checks.uppercase ? 'text-green-600' : 'text-gray-500'}`}>
                        {checks.uppercase ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                        One uppercase letter
                      </div>
                      <div className={`flex items-center gap-2 ${checks.numbers ? 'text-green-600' : 'text-gray-500'}`}>
                        {checks.numbers ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                        One number
                      </div>
                      <div className={`flex items-center gap-2 ${checks.special ? 'text-green-600' : 'text-gray-500'}`}>
                        {checks.special ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                        One special character
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your new password"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                {confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-sm text-red-600">Passwords don't match</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Security Tips */}
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              For better security, avoid using personal information and consider using a password manager.
            </AlertDescription>
          </Alert>
        </div>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Change Password
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordModal;