
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Route, 
  Pause, 
  AlertTriangle, 
  Download, 
  Eye, 
  Plus,
  ChartBar,
  Bell,
  Clock,
  FileText
} from "lucide-react";

const Reports = () => {
  const [selectedReportType, setSelectedReportType] = useState("trip");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const reportTypes = [
    { id: "trip", label: "Trip Report", icon: Route },
    { id: "stop", label: "Stop Report", icon: Pause },
    { id: "event", label: "Event Report", icon: AlertTriangle }
  ];

  const recentReports = [
    {
      name: "Weekly Trip Summary",
      type: "Trip Report",
      vehicle: "All Vehicles",
      dateRange: "Dec 4-10, 2024",
      status: "Ready",
      statusColor: "bg-success"
    },
    {
      name: "Vehicle-001 Events",
      type: "Event Report", 
      vehicle: "Vehicle-001",
      dateRange: "Dec 1-7, 2024",
      status: "Processing",
      statusColor: "bg-warning"
    },
    {
      name: "Monthly Stop Analysis",
      type: "Stop Report",
      vehicle: "Vehicle-002", 
      dateRange: "Nov 1-30, 2024",
      status: "Ready",
      statusColor: "bg-success"
    }
  ];

  const gettingStartedItems = [
    {
      icon: Route,
      title: "Generate a Trip Report",
      description: "Track vehicle movements, distances, and routes over time",
      buttonText: "Create Trip Report",
      buttonIcon: Plus
    },
    {
      icon: Pause,
      title: "Generate a Stop Report", 
      description: "Analyze vehicle stops, idle times, and parking locations",
      buttonText: "Create Stop Report",
      buttonIcon: ChartBar
    },
    {
      icon: AlertTriangle,
      title: "Generate an Event Report",
      description: "Review alerts, violations, and security events", 
      buttonText: "View Event Reports",
      buttonIcon: Bell
    },
    {
      icon: Download,
      title: "Download and Export Reports",
      description: "Export reports in PDF, Excel, or CSV formats",
      buttonText: "Export Options",
      buttonIcon: Download
    }
  ];

  return (
    <div className="flex-1 flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold text-gray-800">Reports Dashboard</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 overflow-auto">
        {/* Quick Generate Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Quick Generate</h2>
            <div className="text-sm text-gray-600">Generate up to 5 reports this month</div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Report Type Selection */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                {reportTypes.map((type) => (
                  <Button
                    key={type.id}
                    onClick={() => setSelectedReportType(type.id)}
                    variant={selectedReportType === type.id ? "default" : "secondary"}
                    size="sm"
                    className="text-sm font-medium"
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
              
              <div className="space-y-3">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">Select Vehicle</Label>
                  <Select value={selectedVehicle} onValueChange={setSelectedVehicle}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Vehicles" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Vehicles</SelectItem>
                      <SelectItem value="vehicle-001">Vehicle-001</SelectItem>
                      <SelectItem value="vehicle-002">Vehicle-002</SelectItem>
                      <SelectItem value="vehicle-003">Vehicle-003</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-1">From Date</Label>
                    <Input
                      type="date"
                      value={fromDate}
                      onChange={(e) => setFromDate(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-1">To Date</Label>
                    <Input
                      type="date"
                      value={toDate}
                      onChange={(e) => setToDate(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <Button className="w-full bg-primary text-white hover:bg-blue-600">
                  Generate Report
                </Button>
              </div>
            </div>
            
            {/* Report Preview */}
            <div className="lg:col-span-2 bg-gray-50 rounded-lg p-4">
              <div className="text-center py-12">
                <FileText className="text-gray-400 text-4xl mb-4 mx-auto" size={64} />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Report Preview</h3>
                <p className="text-sm text-gray-500">Select report parameters and click generate to preview your report</p>
              </div>
            </div>
          </div>
        </div>

        {/* Getting Started Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Getting started with Reports</h2>
            <div className="text-sm text-gray-600">0% completed</div>
          </div>
          
          <div className="space-y-4">
            {gettingStartedItems.map((item, index) => {
              const IconComponent = item.icon;
              const ButtonIconComponent = item.buttonIcon;
              return (
                <div key={index} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mt-1">
                    <IconComponent className="text-gray-600" size={16} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800 mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                    <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-primary hover:text-white">
                      <ButtonIconComponent className="mr-2" size={16} />
                      {item.buttonText}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Reports */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-800">Recent Reports</h2>
            <Button variant="link" className="text-primary hover:underline text-sm p-0">
              View All Reports
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-xs font-medium text-gray-500 uppercase">Report Name</TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase">Type</TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase">Vehicle</TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase">Date Range</TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase">Status</TableHead>
                  <TableHead className="text-xs font-medium text-gray-500 uppercase">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentReports.map((report, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium text-gray-800">{report.name}</TableCell>
                    <TableCell className="text-gray-600">{report.type}</TableCell>
                    <TableCell className="text-gray-600">{report.vehicle}</TableCell>
                    <TableCell className="text-gray-600">{report.dateRange}</TableCell>
                    <TableCell>
                      <Badge className={`${report.statusColor} text-white text-xs`}>
                        {report.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        {report.status === "Ready" ? (
                          <>
                            <Button variant="ghost" size="sm" className="text-primary hover:underline p-0">
                              <Eye className="mr-1" size={16} />
                              View
                            </Button>
                            <Button variant="ghost" size="sm" className="text-primary hover:underline p-0">
                              <Download className="mr-1" size={16} />
                              Download
                            </Button>
                          </>
                        ) : (
                          <Button variant="ghost" size="sm" className="text-gray-400 cursor-not-allowed p-0" disabled>
                            <Clock className="mr-1" size={16} />
                            Pending
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
