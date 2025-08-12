import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, BarChart3, Calendar, Filter, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DownloadReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportType?: "fund" | "donation" | "project" | "general";
}

const DownloadReportModal = ({ isOpen, onClose, reportType = "general" }: DownloadReportModalProps) => {
  const [reportFormat, setReportFormat] = useState("pdf");
  const [dateRange, setDateRange] = useState("last30");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [selectedColumns, setSelectedColumns] = useState([
    "date", "amount", "project", "status"
  ]);
  const { toast } = useToast();

  const reportOptions = {
    fund: {
      title: "Fund Management Report",
      columns: ["campaign", "target", "raised", "donors", "status", "startDate", "endDate"],
      description: "Comprehensive funding campaign analysis"
    },
    donation: {
      title: "Donations Report", 
      columns: ["date", "amount", "project", "donor", "method", "status", "receipt"],
      description: "Detailed donation transaction history"
    },
    project: {
      title: "Project Report",
      columns: ["name", "status", "funding", "completion", "location", "creator", "startDate"],
      description: "Project progress and status overview"
    },
    general: {
      title: "General Report",
      columns: ["date", "type", "amount", "description", "status"],
      description: "Overall platform activity summary"
    }
  };

  const currentReport = reportOptions[reportType];

  const handleDownload = () => {
    toast({
      title: "Report Generated",
      description: `Your ${currentReport.title.toLowerCase()} has been generated and downloaded as ${reportFormat.toUpperCase()}.`,
    });
    onClose();
  };

  const handleColumnToggle = (column: string) => {
    setSelectedColumns(prev => 
      prev.includes(column) 
        ? prev.filter(c => c !== column)
        : [...prev, column]
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            {currentReport.title}
          </DialogTitle>
          <DialogDescription>
            {currentReport.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Report Format */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4" />
                Report Format
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={reportFormat} onValueChange={setReportFormat}>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="pdf" id="pdf" />
                    <Label htmlFor="pdf" className="cursor-pointer">
                      <div>
                        <p className="font-medium">PDF</p>
                        <p className="text-xs text-muted-foreground">Formatted document</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="excel" id="excel" />
                    <Label htmlFor="excel" className="cursor-pointer">
                      <div>
                        <p className="font-medium">Excel</p>
                        <p className="text-xs text-muted-foreground">Spreadsheet format</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg">
                    <RadioGroupItem value="csv" id="csv" />
                    <Label htmlFor="csv" className="cursor-pointer">
                      <div>
                        <p className="font-medium">CSV</p>
                        <p className="text-xs text-muted-foreground">Raw data</p>
                      </div>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Date Range */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="h-4 w-4" />
                Date Range
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="last7">Last 7 days</SelectItem>
                  <SelectItem value="last30">Last 30 days</SelectItem>
                  <SelectItem value="last90">Last 90 days</SelectItem>
                  <SelectItem value="last365">Last year</SelectItem>
                  <SelectItem value="custom">Custom range</SelectItem>
                </SelectContent>
              </Select>

              {dateRange === "custom" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={customStartDate}
                      onChange={(e) => setCustomStartDate(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={customEndDate}
                      onChange={(e) => setCustomEndDate(e.target.value)}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Column Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Filter className="h-4 w-4" />
                Data Columns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                {currentReport.columns.map((column) => (
                  <div key={column} className="flex items-center space-x-2">
                    <Checkbox
                      id={column}
                      checked={selectedColumns.includes(column)}
                      onCheckedChange={() => handleColumnToggle(column)}
                    />
                    <Label htmlFor={column} className="capitalize cursor-pointer">
                      {column.replace(/([A-Z])/g, ' $1').trim()}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Selected columns ({selectedColumns.length}):</p>
                <div className="flex flex-wrap gap-1">
                  {selectedColumns.map((column) => (
                    <Badge key={column} variant="secondary" className="text-xs">
                      {column.replace(/([A-Z])/g, ' $1').trim()}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BarChart3 className="h-4 w-4" />
                Report Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-primary/5 rounded-lg">
                  <p className="text-2xl font-bold">1,247</p>
                  <p className="text-sm text-muted-foreground">Total Records</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold">~2.5MB</p>
                  <p className="text-sm text-muted-foreground">Estimated Size</p>
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
          <Button onClick={handleDownload} disabled={selectedColumns.length === 0}>
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DownloadReportModal;