
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MapPin, Play, Download, Settings, Clock, Route, Battery, Fuel, Thermometer, Gauge } from "lucide-react";

const DeviceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock device data - in real app this would come from API based on id
  const device = {
    id: id || "1",
    name: "Vehicle-001",
    license: "ABC-123",
    status: "Online",
    lastUpdate: "2 minutes ago",
    speed: 45,
    battery: 85,
    fuel: 67,
    engineTemp: 78,
    location: {
      address: "Downtown Business District",
      street: "123 Main Street, City Center",
      coordinates: "40.7128, -74.0060",
      arrivedTime: "14:32",
      distance: "12.5 km"
    },
    tripSummary: {
      totalDistance: 156.7,
      driveTime: "4h 23m",
      avgSpeed: 36
    },
    driver: {
      name: "John Anderson",
      id: "D001",
      license: "DL123456789",
      phone: "+1 234 567 8900",
      shift: "Day Shift",
      avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
    },
    events: [
      { type: "success", title: "Engine Started", time: "14:30 - Downtown Parking" },
      { type: "warning", title: "Speed Alert", time: "14:15 - Highway Section" },
      { type: "primary", title: "Route Started", time: "08:00 - Depot Location" },
      { type: "gray", title: "Maintenance Due", time: "In 2 days" }
    ]
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case "success": return "bg-green-500";
      case "warning": return "bg-yellow-500";
      case "primary": return "bg-blue-500";
      default: return "bg-gray-400";
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="text-gray-600 hover:text-blue-600"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-semibold text-gray-800">Vehicle Details</h1>
          </div>
        </div>
      </header>

      {/* Vehicle Details Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Vehicle Header Info */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-50 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-2xl">🚗</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{device.name}</h2>
                <p className="text-gray-600">License: {device.license}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="px-3 py-1 bg-green-500 text-white text-sm rounded-full">
                    {device.status}
                  </span>
                  <span className="text-sm text-gray-500">Last updated: {device.lastUpdate}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <MapPin className="mr-2 h-4 w-4" />
                Track Live
              </Button>
              <Button variant="outline">
                <Clock className="mr-2 h-4 w-4" />
                View History
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Status Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Current Status Card */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Current Status</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Gauge className="text-blue-600 h-6 w-6" />
                    </div>
                    <p className="text-sm text-gray-600">Speed</p>
                    <p className="text-2xl font-bold text-gray-800">{device.speed}</p>
                    <p className="text-xs text-gray-500">km/h</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Battery className="text-green-600 h-6 w-6" />
                    </div>
                    <p className="text-sm text-gray-600">Battery</p>
                    <p className="text-2xl font-bold text-green-600">{device.battery}%</p>
                    <p className="text-xs text-gray-500">Good</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Fuel className="text-yellow-600 h-6 w-6" />
                    </div>
                    <p className="text-sm text-gray-600">Fuel</p>
                    <p className="text-2xl font-bold text-yellow-600">{device.fuel}%</p>
                    <p className="text-xs text-gray-500">Normal</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Thermometer className="text-blue-600 h-6 w-6" />
                    </div>
                    <p className="text-sm text-gray-600">Engine</p>
                    <p className="text-2xl font-bold text-gray-800">{device.engineTemp}°C</p>
                    <p className="text-xs text-gray-500">Normal</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Location & Route */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Current Location</h3>
                <Button variant="link" className="text-blue-600 hover:text-blue-700">
                  View on Map
                </Button>
              </div>
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                    <MapPin className="text-green-600 h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{device.location.address}</p>
                    <p className="text-sm text-gray-600">{device.location.street}</p>
                    <p className="text-xs text-gray-500 mt-1">Coordinates: {device.location.coordinates}</p>
                    <div className="flex items-center space-x-4 mt-3 text-sm">
                      <span className="flex items-center text-gray-600">
                        <Clock className="mr-1 h-3 w-3" />
                        Arrived: {device.location.arrivedTime}
                      </span>
                      <span className="flex items-center text-gray-600">
                        <Route className="mr-1 h-3 w-3" />
                        Distance: {device.location.distance}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Trip Summary */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Today's Trip Summary</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Total Distance</p>
                    <p className="text-2xl font-bold text-gray-800">{device.tripSummary.totalDistance}</p>
                    <p className="text-xs text-gray-500">km</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Drive Time</p>
                    <p className="text-2xl font-bold text-gray-800">{device.tripSummary.driveTime}</p>
                    <p className="text-xs text-gray-500">active</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Avg Speed</p>
                    <p className="text-2xl font-bold text-gray-800">{device.tripSummary.avgSpeed}</p>
                    <p className="text-xs text-gray-500">km/h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            {/* Driver Info */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Driver Information</h3>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src={device.driver.avatar} 
                    alt="Driver" 
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{device.driver.name}</p>
                    <p className="text-sm text-gray-600">Driver ID: {device.driver.id}</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">License:</span>
                    <span className="font-medium">{device.driver.license}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-medium">{device.driver.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shift:</span>
                    <span className="font-medium text-green-600">{device.driver.shift}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Events */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Recent Events</h3>
              </div>
              <div className="p-6 space-y-4 max-h-80 overflow-y-auto">
                {device.events.map((event, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 ${getEventColor(event.type)} rounded-full mt-2`}></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{event.title}</p>
                      <p className="text-xs text-gray-500">{event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
              </div>
              <div className="p-6 space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Play className="mr-2 h-4 w-4" />
                  Start Tracking
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Export Report
                </Button>
                <Button variant="outline" className="w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeviceDetails;
