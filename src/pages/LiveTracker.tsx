import { useState } from "react";
import axiosInstance from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  RefreshCw,
  Plus,
  Minus,
  Crosshair,
  Expand,
  Layers,
  MapPin,
  Car,
  Play,
  Pause,
  AlertTriangle,
  Gauge,
  Route,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const mapContainerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = { lat: -1.9706, lng: 30.1044 };

const LiveTracker = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchDevices = async () => {
    const res = await axiosInstance.get(`${apiURL}/devices`, {
      withCredentials: true,
    });
    console.log(res.data, "devices");
    return res.data;
  };

  const {
    data: devices = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["devices"],
    queryFn: fetchDevices,
    staleTime: 5 * 60 * 1000,
  });

  const fetchPositions = async (devices) => {
    if (!devices.length) return {};

    const deviceIds = devices.map((d) => d.id).join(",");
    const res = await axiosInstance.get(
      `${apiURL}/positions?deviceId=${deviceIds}&from=2025-08-01T00:00:00.000Z&to=2025-08-05T23:59:59.999Z`,
      { withCredentials: true }
    );

    return res.data.reduce((acc, pos) => {
      acc[pos.deviceId] = {
        lat: pos.latitude,
        lng: pos.longitude,
        speed: pos.speed,
      };
      return acc;
    }, {});
  };

  const { data: positions = {} } = useQuery({
    queryKey: ["positions", devices],
    queryFn: () => fetchPositions(devices),
    enabled: devices.length > 0,
  });

  const filteredDevices = devices.filter((device) => {
    if (filter === "all") return true;
    return device.status === filter;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

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

  const movingCount = devices.filter((v) => v.status === "online").length;
  const idleCount = devices.filter((v) => v.status === "idle").length;
  const offlineCount = devices.filter((v) => v.status === "offline").length;

  const avgSpeed =
    Math.round(
      devices
        .filter((v) => v.status === "moving")
        .reduce((sum, v) => sum + v.speed, 0) / (movingCount || 1)
    ) || 0;

  return (
    <div className="flex-1 flex flex-col bg-slate-200">
      <main className="flex-1 p-6 overflow-auto">
        {/* Map Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-semibold text-gray-800">
                Live Tracking Controls
              </h2>
              <div className="flex items-center space-x-2">
                <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm text-gray-600">Live Updates</span>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Assigned Vehicles</SelectItem>
                  <SelectItem value="moving">Moving Only</SelectItem>
                  <SelectItem value="idle">Idle Vehicles</SelectItem>
                  <SelectItem value="offline">Offline Vehicles</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <RefreshCw
                  className={`mr-2 h-4 w-4 ${
                    isRefreshing ? "animate-spin" : ""
                  }`}
                />
                {isRefreshing ? "Refreshing..." : "Refresh"}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-[700px]">
          {/* Map Section */}
          <div className="xl:col-span-3">
            <div className="bg-white rounded-lg shadow-sm h-full overflow-hidden">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Vehicle Locations
                </h3>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Expand className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Layers className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="relative h-full">
                <LoadScript googleMapsApiKey={googleMapsApiKey}>
                  <GoogleMap
                    mapContainerStyle={mapContainerStyle}
                    center={defaultCenter}
                    zoom={10}
                  >
                    {filteredDevices.map((device) => {
                      const pos = positions[device.id];
                      if (!pos || !pos.lat || !pos.lng) return null;

                      return (
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
                      );
                    })}

                    {selectedVehicle &&
                      (() => {
                        const selectedDevice = devices.find(
                          (d) => d.id === selectedVehicle
                        );

                        const pos = positions[selectedDevice?.id || ""];

                        if (!selectedDevice || !pos) return null;

                        return (
                          <InfoWindow
                            position={{
                              lat: Number(pos.lat),
                              lng: Number(pos.lng),
                            }}
                            onCloseClick={() => setSelectedVehicle(null)}
                          >
                            <div>
                              <h4 className="font-semibold">
                                {selectedDevice.name}
                              </h4>
                              <p>Speed: {pos.speed} km/h</p>
                              <p>Status: {selectedDevice.status}</p>
                            </div>
                          </InfoWindow>
                        );
                      })()}
                  </GoogleMap>
                </LoadScript>
              </div>
            </div>
          </div>

          {/* Vehicle List */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg shadow-sm h-[400px]">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">
                  Assigned Devices
                </h3>
                <p className="text-sm text-gray-600">
                  {devices.length} device(s) assigned to you
                </p>
              </div>
              <div className="p-2 space-y-2 h-[320px] overflow-y-auto">
                {filteredDevices.map((device) => {
                  const pos = positions[device.id] || {};
                  return (
                    <div
                      key={device.id}
                      onClick={() => setSelectedVehicle(device.id)}
                      className={`p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                        selectedVehicle === device.id
                          ? "bg-blue-50 border-blue-500"
                          : ""
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-800">
                          {device.name}
                        </span>
                        <span
                          className={`px-2 py-1 text-white text-xs rounded-full capitalize ${
                            device.status === "online"
                              ? "bg-green-500"
                              : device.status === "idle"
                              ? "bg-yellow-500"
                              : "bg-gray-400"
                          }`}
                        >
                          {device.status}
                        </span>
                      </div>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div className="flex justify-between">
                          <span>Speed:</span>
                          <span className="font-medium">{pos.speed} km/h</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          <MapPin className="inline h-3 w-3 mr-1" />
                          {pos.lat && pos.lng
                            ? `${pos.lat.toFixed(4)}, ${pos.lng.toFixed(4)}`
                            : "N/A"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h4 className="text-md font-semibold text-gray-800 mb-3">
                Quick Actions
              </h4>
              <div className="space-y-2">
                <Link to="/route-history">
                  <Button
                    variant="ghost"
                    className="w-full justify-start bg-gray-50 hover:bg-gray-100"
                  >
                    <Route className="mr-3 h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">
                      View Route History
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Assigned</p>
                <p className="text-xl font-bold text-gray-800">
                  {devices.length}
                </p>
              </div>
              <Car className="text-blue-600 text-lg h-5 w-5" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Moving</p>
                <p className="text-xl font-bold text-green-600">
                  {movingCount}
                </p>
              </div>
              <Play className="text-green-600 text-lg h-5 w-5" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Idle</p>
                <p className="text-xl font-bold text-yellow-600">{idleCount}</p>
              </div>
              <Pause className="text-yellow-600 text-lg h-5 w-5" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Offline</p>
                <p className="text-xl font-bold text-red-600">{offlineCount}</p>
              </div>
              <AlertTriangle className="text-red-600 text-lg h-5 w-5" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Speed</p>
                <p className="text-xl font-bold text-gray-800">{avgSpeed}</p>
                <p className="text-xs text-gray-500">km/h</p>
              </div>
              <Gauge className="text-blue-600 text-lg h-5 w-5" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LiveTracker;
