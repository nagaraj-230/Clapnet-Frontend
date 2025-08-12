import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Download, Printer, Share2, Receipt, Heart, Calendar, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import LogoFallback from "@/components/ui/logo-fallback";

interface DonationReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  donation: {
    id: number;
    project: string;
    amount: number;
    date: string;
    status: string;
    method: string;
    receipt: string;
    impact: string;
  };
}

const DonationReceiptModal = ({ isOpen, onClose, donation }: DonationReceiptModalProps) => {
  const { toast } = useToast();

  const handleDownload = () => {
    toast({
      title: "Receipt Downloaded",
      description: "Your donation receipt has been downloaded as PDF.",
    });
  };

  const handlePrint = () => {
    window.print();
    toast({
      title: "Receipt Printed",
      description: "Your donation receipt is being printed.",
    });
  };

  const handleShare = () => {
    toast({
      title: "Receipt Shared",
      description: "Receipt link has been copied to clipboard.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5" />
            Donation Receipt
          </DialogTitle>
          <DialogDescription>
            Official receipt for your donation to {donation.project}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Receipt Header */}
          <Card className="border-2 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <LogoFallback className="h-12 w-12" />
                  <div>
                    <h3 className="text-xl font-bold">Mission Portal</h3>
                    <p className="text-muted-foreground">Building Hope, Changing Lives</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-green-100 text-green-800 text-lg px-3 py-1">
                    RECEIPT
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-1">#{donation.receipt}</p>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Donation Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Donation Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Project:</span>
                      <span className="font-medium">{donation.project}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Amount:</span>
                      <span className="font-bold text-green-600 text-lg">${donation.amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span className="font-medium">{donation.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Method:</span>
                      <span className="font-medium">{donation.method}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge className="bg-green-100 text-green-800">{donation.status}</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Organization Details</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p>Mission Portal Foundation</p>
                    <p>123 Hope Street</p>
                    <p>Nairobi, Kenya 00100</p>
                    <p>Tax ID: 501(c)(3) - 12-3456789</p>
                    <p>Email: donations@missionportal.org</p>
                    <p>Phone: +254-700-123-456</p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Impact Statement */}
              <div>
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  Your Impact
                </h4>
                <div className="bg-primary/5 p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    {donation.impact}
                  </p>
                  <p className="text-sm font-medium">
                    Thank you for making a difference in the lives of those in need. Your generosity helps us continue our mission of building hope and changing lives around the world.
                  </p>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Tax Information */}
              <div>
                <h4 className="font-semibold mb-3">Tax Deductible Information</h4>
                <div className="bg-muted/50 p-4 rounded-lg text-sm">
                  <p className="mb-2">
                    <strong>This receipt serves as official documentation for tax purposes.</strong>
                  </p>
                  <p className="text-muted-foreground">
                    Mission Portal Foundation is a registered 501(c)(3) non-profit organization. 
                    Your donation is tax-deductible to the full extent allowed by law. No goods 
                    or services were provided in exchange for this contribution. Please consult 
                    your tax advisor for specific deduction information.
                  </p>
                </div>
              </div>

              {/* Transaction Details */}
              <div className="mt-6 pt-4 border-t">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Date</p>
                      <p className="text-sm font-medium">{donation.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <CreditCard className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Method</p>
                      <p className="text-sm font-medium">{donation.method}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Receipt className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">Receipt</p>
                      <p className="text-sm font-medium">{donation.receipt}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    <div>
                      <p className="text-xs text-muted-foreground">Thank You!</p>
                      <p className="text-sm font-medium">🙏</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button onClick={handleDownload} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button variant="outline" onClick={handlePrint} className="flex items-center gap-2">
              <Printer className="h-4 w-4" />
              Print Receipt
            </Button>
            <Button variant="outline" onClick={handleShare} className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Share Receipt
            </Button>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground border-t pt-4">
            <p>Generated on {new Date().toLocaleDateString()} | Mission Portal Foundation</p>
            <p>For questions about this receipt, please contact us at receipts@missionportal.org</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonationReceiptModal;