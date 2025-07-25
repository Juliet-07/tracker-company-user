import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  Microchip,
  Wifi,
  WifiOff,
  Wrench,
  Info,
  X,
  Filter,
  Eye,
  Edit,
  Trash,
  Car,
  Truck,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axios";

const Devices = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [showAlert, setShowAlert] = useState(true);

  const sampleDevices = [
    {
      id: 1,
      name: "Vehicle-001",
      model: "Toyota Camry",
      type: "car",
      status: "Online",
      speed: "45 km/h",
      battery: 85,
      batteryColor: "bg-green-500",
      lastUpdate: "2 min ago",
      location: "Downtown Area, City Center",
      statusColor: "bg-green-500",
      iconBg: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      id: 2,
      name: "Vehicle-002",
      model: "Ford Transit",
      type: "truck",
      status: "Idle",
      speed: "0 km/h",
      battery: 65,
      batteryColor: "bg-yellow-500",
      lastUpdate: "5 min ago",
      location: "Parking Lot B, Main Street",
      statusColor: "bg-yellow-500",
      iconBg: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
    {
      id: 3,
      name: "Vehicle-003",
      model: "Honda Civic",
      type: "car",
      status: "Offline",
      speed: "-- km/h",
      battery: 15,
      batteryColor: "bg-red-500",
      lastUpdate: "2 hours ago",
      location: "Last seen: Industrial Zone",
      statusColor: "bg-gray-400",
      iconBg: "bg-gray-100",
      iconColor: "text-gray-400",
    },
    {
      id: 4,
      name: "Vehicle-004",
      model: "Yamaha R15",
      type: "motorcycle",
      status: "Online",
      speed: "32 km/h",
      battery: 72,
      batteryColor: "bg-green-500",
      lastUpdate: "1 min ago",
      location: "Highway 101, North Bound",
      statusColor: "bg-green-500",
      iconBg: "bg-green-50",
      iconColor: "text-green-600",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "truck":
        return <Truck className="h-6 w-6" />;
      case "motorcycle":
        return <span className="text-xl">🏍️</span>;
      default:
        return <Car className="h-6 w-6" />;
    }
  };

  const getBatteryWidth = (battery: number) => {
    return `${battery}%`;
  };

  const handleTrackDevice = (device: any) => {
    setSelectedDevice(device);
    setIsTrackingModalOpen(true);
  };

  const handleViewDevice = (deviceId: number) => {
    navigate(`/devices/${deviceId}`);
  };

  const fetchDevices = async () => {
    const res = await axiosInstance.get(`${apiURL}/devices`, {
      withCredentials: true,
    });
    console.log(res.data, "response");
    return res.data;
  };

  const {
    data: devices = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["devices"],
    queryFn: fetchDevices,
    staleTime: 5 * 60 * 1000,
  });
  return (
    <div className="flex-1 flex flex-col">
      {/* {showAlert && (
        <Alert className="bg-blue-50 border-blue-200 mx-6 mt-6 text-blue-700">
          <Info className="h-4 w-4 text-blue-500" />
          <AlertDescription className="flex items-center justify-between w-full">
            <span>This is demo user some features are disabled.</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAlert(false)}
              className="text-blue-500 hover:text-blue-700 p-0 h-auto"
            >
              <X className="h-4 w-4" />
            </Button>
          </AlertDescription>
        </Alert>
      )} */}

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-800">My Devices</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full font-medium">
                8 Online
              </span>
              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-medium">
                2 Offline
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">
                  Status:
                </label>
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Devices</SelectItem>
                    <SelectItem value="online">Online</SelectItem>
                    <SelectItem value="offline">Offline</SelectItem>
                    <SelectItem value="idle">Idle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">
                  Type:
                </label>
                <Select defaultValue="all">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="car">Car</SelectItem>
                    <SelectItem value="truck">Truck</SelectItem>
                    <SelectItem value="motorcycle">Motorcycle</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Filter className="mr-2 h-4 w-4" />
                Apply Filters
              </Button>
              <Button variant="outline" size="icon">
                <span className="text-lg">⊞</span>
              </Button>
              <Button variant="outline" size="icon">
                <span className="text-lg">☰</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Device Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sampleDevices.map((device) => (
            <div
              key={device.id}
              className={`bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer ${
                device.status === "Offline" ? "opacity-75" : ""
              }`}
              onClick={() => handleViewDevice(device.id)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-12 h-12 ${device.iconBg} rounded-xl flex items-center justify-center`}
                    >
                      <div className={device.iconColor}>
                        {getIcon(device.type)}
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">{device.name}</h3>
                      <p className="text-xs text-gray-500">{device.model}</p>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 ${device.statusColor} text-white text-xs rounded-full font-medium flex items-center`}
                  >
                    {device.status === "Online" && (
                      <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                    )}
                    {device.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Speed</span>
                    <span
                      className={`font-semibold ${
                        device.status === "Offline"
                          ? "text-gray-400"
                          : "text-gray-800"
                      }`}
                    >
                      {device.speed}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Battery</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full">
                        <div
                          className={`h-2 ${device.batteryColor} rounded-full`}
                          style={{ width: getBatteryWidth(device.battery) }}
                        ></div>
                      </div>
                      <span
                        className={`font-semibold text-xs ${
                          device.battery > 60
                            ? "text-green-600"
                            : device.battery > 30
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {device.battery}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Last Update</span>
                    <span
                      className={`font-semibold ${
                        device.status === "Offline"
                          ? "text-gray-400"
                          : "text-gray-800"
                      }`}
                    >
                      {device.lastUpdate}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="mr-2">📍</span>
                    <span className="truncate">{device.location}</span>
                  </div>
                </div>

                <div className="mt-4 flex space-x-2">
                  <Button
                    className={`flex-1 text-xs ${
                      device.status === "Offline"
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                    disabled={device.status === "Offline"}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTrackDevice(device);
                    }}
                  >
                    <Eye className="mr-1 h-3 w-3" />
                    {device.status === "Offline" ? "Offline" : "Track"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="px-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <span className="text-lg">⚙️</span>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Tracking Details Modal */}
      <Dialog open={isTrackingModalOpen} onOpenChange={setIsTrackingModalOpen}>
        <DialogContent className="w-full max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <div
                className={`w-8 h-8 ${selectedDevice?.iconBg} rounded-lg flex items-center justify-center`}
              >
                <div className={selectedDevice?.iconColor}>
                  {selectedDevice && getIcon(selectedDevice.type)}
                </div>
              </div>
              <span>Tracking Details - {selectedDevice?.name}</span>
            </DialogTitle>
          </DialogHeader>

          {selectedDevice && (
            <div className="space-y-6">
              {/* Device Status Overview */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Current Status
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Status</p>
                    <span
                      className={`inline-block px-3 py-1 ${selectedDevice.statusColor} text-white text-xs rounded-full font-medium mt-1`}
                    >
                      {selectedDevice.status}
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Speed</p>
                    <p className="font-semibold text-gray-800 mt-1">
                      {selectedDevice.speed}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Battery</p>
                    <div className="flex items-center justify-center mt-1">
                      <div className="w-12 h-2 bg-gray-200 rounded-full mr-2">
                        <div
                          className={`h-2 ${selectedDevice.batteryColor} rounded-full`}
                          style={{
                            width: getBatteryWidth(selectedDevice.battery),
                          }}
                        ></div>
                      </div>
                      <span className="text-xs font-semibold">
                        {selectedDevice.battery}%
                      </span>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Last Update</p>
                    <p className="font-semibold text-gray-800 mt-1">
                      {selectedDevice.lastUpdate}
                    </p>
                  </div>
                </div>
              </div>

              {/* Location Details */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="mr-2">📍</span>
                  Current Location
                </h3>
                <p className="text-gray-700">{selectedDevice.location}</p>
                <div className="mt-3 flex space-x-2">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                    View on Map
                  </Button>
                  <Button size="sm" variant="outline">
                    Get Directions
                  </Button>
                </div>
              </div>

              {/* Vehicle Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Vehicle Info
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Model:</span>
                      <span className="font-medium">
                        {selectedDevice.model}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium capitalize">
                        {selectedDevice.type}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Device ID:</span>
                      <span className="font-medium">{selectedDevice.name}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white border rounded-lg p-4">
                  <h3 className="font-semibold text-gray-800 mb-3">
                    Quick Actions
                  </h3>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                    >
                      <span className="mr-2">🔔</span>
                      Send Alert
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                    >
                      <span className="mr-2">📊</span>
                      View Reports
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-start"
                    >
                      <span className="mr-2">🛣️</span>
                      Route History
                    </Button>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white border rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">
                  Recent Activity
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Engine started</span>
                    </div>
                    <span className="text-gray-500">2 min ago</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>Speed limit exceeded (52 km/h)</span>
                    </div>
                    <span className="text-gray-500">15 min ago</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span>Entered parking zone</span>
                    </div>
                    <span className="text-gray-500">1 hour ago</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Keep existing modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="w-full max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Device</DialogTitle>
          </DialogHeader>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Device Name
              </label>
              <Input
                type="text"
                placeholder="Enter device name"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                IMEI Number
              </label>
              <Input
                type="text"
                placeholder="Enter IMEI number"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Plate
              </label>
              <Input
                type="text"
                placeholder="Enter vehicle plate"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assign Geofence
              </label>
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select geofence (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="office">Office Area</SelectItem>
                  <SelectItem value="warehouse">Warehouse Zone</SelectItem>
                  <SelectItem value="service">Service Area</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notifications
              </label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="speed" />
                  <label htmlFor="speed" className="text-sm text-gray-700">
                    Speed alerts
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="geofence" />
                  <label htmlFor="geofence" className="text-sm text-gray-700">
                    Geofence alerts
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="maintenance" />
                  <label
                    htmlFor="maintenance"
                    className="text-sm text-gray-700"
                  >
                    Maintenance alerts
                  </label>
                </div>
              </div>
            </div>
            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                Add Device
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Devices;
