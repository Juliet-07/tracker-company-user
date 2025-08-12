import { useEffect, useRef, useState } from "react";
import axiosInstance from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Car, Wifi, Route, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

// Declare Leaflet types for TypeScript
declare global {
  interface Window {
    L: any;
  }
}

const Dashboard = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  const mapContainerStyle = { width: "100%", height: "100%" };
  const defaultCenter = { lat: -1.9706, lng: 30.1044 };

  const getMarkerIcon = (status: string) => {
    switch (status) {
      case "online":
        return "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
      case "idle":
        return "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png";
      case "offline":
        return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
      default:
        return "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
    }
  };

  const getStatusBgClass = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "idle":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };
  const miniChartData = [
    { value: 45 },
    { value: 62 },
    { value: 58 },
    { value: 75 },
    { value: 68 },
    { value: 82 },
    { value: 78 },
  ];

  const chartConfig = {
    km: {
      label: "Kilometers",
      color: "hsl(var(--primary))",
    },
    day: {
      label: "Day Driven",
      color: "hsl(var(--success))",
    },
    night: {
      label: "Night Driven",
      color: "hsl(var(--primary))",
    },
    value: {
      label: "Value",
      color: "hsl(var(--primary))",
    },
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

  const totalDevices = devices.length;

  const onlineDevices = devices.filter((d) => d.status === "online").length;
  const offlineDevices = devices.filter((d) => d.status === "offline").length;
  const idleDevices = devices.filter((d) => d.status === "idle").length;

  const getPercentage = (count: number) =>
    totalDevices > 0 ? Math.round((count / totalDevices) * 100) : 0;

  const onlinePercent = getPercentage(onlineDevices);
  const offlinePercent = getPercentage(offlineDevices);
  const idlePercent = getPercentage(idleDevices);

  return (
    <div className="flex-1 flex flex-col bg-slate-200">
      {/* Dashboard Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Vehicles */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">All Devices</p>
                <div className="flex items-center">
                  <Car className="text-gray-400 mr-2 h-5 w-5" />
                  <span className="text-3xl font-bold text-gray-800">
                    {totalDevices}
                  </span>
                </div>
              </div>
              <div className="w-16 h-12">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <BarChart data={miniChartData}>
                    <Bar dataKey="value" fill="var(--color-value)" />
                  </BarChart>
                </ChartContainer>
              </div>
            </div>
            <div className="mt-4 bg-gray-100 p-3 rounded">
              <p className="text-sm font-medium text-gray-700">Total Devices</p>
            </div>
          </div>

          {/* Running Vehicles */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Currently</p>
                <div className="flex items-center">
                  <Car className="text-gray-400 mr-2 h-5 w-5" />
                  <span className="text-3xl font-bold text-gray-800">
                    {onlineDevices}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 bg-green-500 text-white p-3 rounded text-center">
              <p className="text-sm font-medium">{onlinePercent}% Active</p>
            </div>
          </div>

          {/* Idle Vehicles */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Currently</p>
                <div className="flex items-center">
                  <Car className="text-gray-400 mr-2 h-5 w-5" />
                  <span className="text-3xl font-bold text-gray-800">
                    {idleDevices}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 bg-yellow-500 text-white p-3 rounded text-center">
              <p className="text-sm font-medium">{idlePercent}% Idle</p>
            </div>
          </div>

          {/* Stopped Vehicles */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Currently</p>
                <div className="flex items-center">
                  <Car className="text-gray-400 mr-2 h-5 w-5" />
                  <span className="text-3xl font-bold text-gray-800">
                    {offlineDevices}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 bg-red-500 text-white p-3 rounded text-center">
              <p className="text-sm font-medium">{offlinePercent}% Stop</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm h-[650px] overflow-hidden border border-gray-100">
              <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    Live Vehicle Tracking
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Real-time monitoring of your fleet
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-sm">
                    All Vehicles
                  </Button>
                  <Button
                    variant="outline"
                    className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                  >
                    Active Only
                  </Button>
                </div>
              </div>
              <div className="h-full bg-gray-50 relative">
                <LoadScript googleMapsApiKey={googleMapsApiKey}>
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={defaultCenter}
                    zoom={10}
                  >
                    {devices.map((device) => (
                      <Marker
                        key={device.id}
                        position={{
                          lat: Number(device.lat),
                          lng: Number(device.lng),
                        }}
                        icon={{
                          url: getMarkerIcon(device.status),
                          scaledSize: new window.google.maps.Size(40, 40),
                        }}
                        onClick={() => setSelectedVehicle(device.id)}
                      />
                    ))}

                    {selectedVehicle &&
                      (() => {
                        const selectedDevice = devices.find(
                          (d) => d.id === selectedVehicle
                        );
                        if (!selectedDevice) return null;
                        return (
                          <InfoWindow
                            position={{
                              lat: Number(selectedDevice.lat),
                              lng: Number(selectedDevice.lng),
                            }}
                            onCloseClick={() => setSelectedVehicle(null)}
                          >
                            <div>
                              <h4 className="font-semibold">
                                {selectedDevice.name}
                              </h4>
                              <p>Status: {selectedDevice.status}</p>
                              <p>Speed: {selectedDevice.speed} km/h</p>
                            </div>
                          </InfoWindow>
                        );
                      })()}
                  </GoogleMap>
                </LoadScript>

                <div className="absolute top-4 left-4 bg-white p-4 rounded-xl shadow-lg border border-gray-100 z-10">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-medium">
                        Online:{" "}
                        {
                          devices.filter((device) => device.status === "online")
                            .length
                        }{" "}
                        vehicles
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      <span className="font-medium">
                        Offline:{" "}
                        {
                          devices.filter(
                            (device) => device.status === "offline"
                          ).length
                        }{" "}
                        vehicles
                      </span>
                    </div>
                    {/* <div className="flex items-center space-x-3 text-sm">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="font-medium">Alerts: 3 active</span>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-6">
            {/* Device Cards */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">
                    Vehicle Status
                  </h3>
                  <p className="text-sm text-gray-600">
                    Live device monitoring
                  </p>
                </div>
                <Link
                  to="/devices"
                  className="text-blue-600 text-sm hover:underline font-medium"
                >
                  View All
                </Link>
              </div>
              <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                {devices.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    // className={`p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                    //   selectedVehicle === vehicle.id
                    //     ? "bg-blue-50 border-blue-500"
                    //     : ""
                    // }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-800">
                        {vehicle.name}
                      </span>
                      <span
                        className={`px-2 py-1 ${getStatusBgClass(
                          vehicle.status
                        )} text-white text-xs rounded-full capitalize`}
                      >
                        {vehicle.status}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <div className="flex justify-between">
                        <span>Speed:</span>
                        <span className="font-medium">
                          {vehicle.speed} km/h
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Driver:</span>
                        <span className="font-medium">{vehicle.driver}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        <MapPin className="inline h-3 w-3 mr-1" />
                        {vehicle.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Event Alerts */}
            {/* <div className="bg-white rounded-xl shadow-sm border border-gray-100">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Recent Alerts
                </h3>
                <button className="text-blue-600 text-sm hover:underline">
                  View All
                </button>
              </div>
              <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
                <div className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg">
                  <span
                    className="text-red-500 mt-1 h-4 w-4 text-lg"
                    aria-label="Alert"
                    role="img"
                  >
                    ⚠️
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      Overspeed Alert
                    </p>
                    <p className="text-xs text-gray-600">
                      Vehicle-001 exceeded 60 km/h
                    </p>
                    <p className="text-xs text-gray-500 mt-1">2 minutes ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="text-yellow-500 mt-1">📍</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      Geofence Exit
                    </p>
                    <p className="text-xs text-gray-600">
                      Vehicle-002 left authorized zone
                    </p>
                    <p className="text-xs text-gray-500 mt-1">15 minutes ago</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-red-500 mt-1">🔋</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      Low Battery
                    </p>
                    <p className="text-xs text-gray-600">
                      Vehicle-003 battery below 20%
                    </p>
                    <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
