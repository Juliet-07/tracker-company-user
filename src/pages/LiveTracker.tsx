import { useEffect, useRef, useState } from "react";
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
  Download,
  Settings,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";

// Declare Leaflet types for TypeScript
declare global {
  interface Window {
    L: any;
  }
}

interface Vehicle {
  id: string;
  lat: number;
  lng: number;
  status: "moving" | "idle" | "offline";
  speed: number;
  driver: string;
  location: string;
}

const LiveTracker = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<{ [key: string]: any }>({});
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: "TRK-001",
      lat: 37.7849,
      lng: -122.4094,
      status: "moving",
      speed: 65,
      driver: "John Smith",
      location: "Highway 101, Mile 45",
    },
    {
      id: "TRK-002",
      lat: 37.7649,
      lng: -122.4294,
      status: "idle",
      speed: 0,
      driver: "Mike Johnson",
      location: "Warehouse District A",
    },
    {
      id: "TRK-003",
      lat: 37.7949,
      lng: -122.3994,
      status: "moving",
      speed: 42,
      driver: "Sarah Wilson",
      location: "Downtown Core, 5th Ave",
    },
    {
      id: "TRK-004",
      lat: 37.7549,
      lng: -122.4494,
      status: "offline",
      speed: 0,
      driver: "David Brown",
      location: "Last: Service Center",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "moving":
        return "#22c55e";
      case "idle":
        return "#f59e0b";
      case "offline":
        return "#6b7280";
      default:
        return "#6b7280";
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

  const createVehicleIcon = (status: string) => {
    if (!window.L) return null;

    const color = getStatusColor(status);
    return window.L.divIcon({
      html: `<div style="background-color: ${color}; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 4px rgba(0,0,0,0.3); border: 2px solid white;"><div style="color: white; font-size: 10px;">🚗</div></div>`,
      className: "custom-vehicle-marker",
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  };

  const addVehicleToMap = (vehicle: Vehicle) => {
    if (!mapInstanceRef.current || !window.L) return;

    const icon = createVehicleIcon(vehicle.status);
    if (!icon) return;

    const marker = window.L.marker([vehicle.lat, vehicle.lng], { icon }).addTo(
      mapInstanceRef.current
    );

    const popupContent = `
      <div style="padding: 12px; min-width: 200px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
          <h4 style="font-weight: 600; color: #374151; margin: 0;">${
            vehicle.id
          }</h4>
          <span style="padding: 4px 8px; font-size: 12px; border-radius: 12px; color: white; background-color: ${getStatusColor(
            vehicle.status
          )};">${vehicle.status}</span>
        </div>
        <div style="font-size: 14px; color: #6b7280;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Speed:</span>
            <span style="font-weight: 500;">${vehicle.speed} km/h</span>
          </div>
          <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
            <span>Driver:</span>
            <span style="font-weight: 500;">${vehicle.driver}</span>
          </div>
          <div style="margin-top: 8px; font-size: 12px; color: #9ca3af;">
            📍 ${vehicle.location}
          </div>
        </div>
      </div>
    `;

    marker.bindPopup(popupContent);
    markersRef.current[vehicle.id] = marker;
  };

  const updateVehiclePositions = () => {
    setVehicles((prevVehicles) =>
      prevVehicles.map((vehicle) => {
        if (vehicle.status === "moving") {
          const newLat = vehicle.lat + (Math.random() - 0.5) * 0.001;
          const newLng = vehicle.lng + (Math.random() - 0.5) * 0.001;
          const newSpeed = Math.max(
            30,
            Math.min(80, vehicle.speed + (Math.random() - 0.5) * 10)
          );

          // Update marker position
          if (markersRef.current[vehicle.id]) {
            markersRef.current[vehicle.id].setLatLng([newLat, newLng]);
          }

          return {
            ...vehicle,
            lat: newLat,
            lng: newLng,
            speed: Math.round(newSpeed),
          };
        }
        return vehicle;
      })
    );
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      // Reset filter and show all vehicles
      setFilter("all");
      vehicles.forEach((vehicle) => {
        if (markersRef.current[vehicle.id]) {
          markersRef.current[vehicle.id].addTo(mapInstanceRef.current);
        }
      });
    }, 1500);
  };

  const handleFilterChange = (value: string) => {
    setFilter(value);

    vehicles.forEach((vehicle) => {
      const marker = markersRef.current[vehicle.id];
      if (!marker) return;

      switch (value) {
        case "online":
          if (vehicle.status === "offline") {
            mapInstanceRef.current.removeLayer(marker);
          } else {
            marker.addTo(mapInstanceRef.current);
          }
          break;
        case "moving":
          if (vehicle.status !== "moving") {
            mapInstanceRef.current.removeLayer(marker);
          } else {
            marker.addTo(mapInstanceRef.current);
          }
          break;
        case "idle":
          if (vehicle.status !== "idle") {
            mapInstanceRef.current.removeLayer(marker);
          } else {
            marker.addTo(mapInstanceRef.current);
          }
          break;
        default:
          marker.addTo(mapInstanceRef.current);
      }
    });
  };

  const handleVehicleClick = (vehicleId: string) => {
    setSelectedVehicle(vehicleId);
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    if (vehicle && mapInstanceRef.current && markersRef.current[vehicleId]) {
      mapInstanceRef.current.setView([vehicle.lat, vehicle.lng], 15);
      markersRef.current[vehicleId].openPopup();
    }
  };

  useEffect(() => {
    const loadLeaflet = async () => {
      if (!document.querySelector('link[href*="leaflet"]')) {
        const leafletCSS = document.createElement("link");
        leafletCSS.rel = "stylesheet";
        leafletCSS.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        leafletCSS.integrity =
          "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
        leafletCSS.crossOrigin = "";
        document.head.appendChild(leafletCSS);
      }

      if (!window.L) {
        return new Promise((resolve) => {
          const leafletJS = document.createElement("script");
          leafletJS.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
          leafletJS.integrity =
            "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=";
          leafletJS.crossOrigin = "";
          leafletJS.onload = resolve;
          document.head.appendChild(leafletJS);
        });
      }
    };

    const initializeMap = async () => {
      await loadLeaflet();

      if (mapRef.current && window.L && !mapInstanceRef.current) {
        mapInstanceRef.current = window.L.map(mapRef.current).setView(
          [37.7749, -122.4194],
          10
        );

        window.L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            attribution: "© OpenStreetMap contributors",
          }
        ).addTo(mapInstanceRef.current);

        vehicles.forEach(addVehicleToMap);

        setTimeout(() => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize();
          }
        }, 100);
      }
    };

    initializeMap();

    // Start real-time updates
    const interval = setInterval(updateVehiclePositions, 5000);

    return () => {
      clearInterval(interval);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const movingCount = vehicles.filter((v) => v.status === "moving").length;
  const idleCount = vehicles.filter((v) => v.status === "idle").length;
  const offlineCount = vehicles.filter((v) => v.status === "offline").length;
  const avgSpeed =
    Math.round(
      vehicles
        .filter((v) => v.status === "moving")
        .reduce((sum, v) => sum + v.speed, 0) / movingCount
    ) || 0;

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
              <Select value={filter} onValueChange={handleFilterChange}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Assigned Vehicles</SelectItem>
                  <SelectItem value="online">Online Only</SelectItem>
                  <SelectItem value="moving">Moving Only</SelectItem>
                  <SelectItem value="idle">Idle Vehicles</SelectItem>
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
                <div className="flex items-center space-x-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Vehicle Locations
                  </h3>
                  {/* <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">
                        Moving ({movingCount})
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-gray-600">Idle ({idleCount})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      <span className="text-gray-600">
                        Offline ({offlineCount})
                      </span>
                    </div>
                  </div> */}
                </div>
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
                <div ref={mapRef} className="w-full h-full z-0"></div>

                {/* Map overlay controls with proper z-index */}
                <div className="absolute top-4 right-4 space-y-2 z-[1000]">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-10 h-10 p-0 bg-white shadow-md hover:bg-gray-50"
                    onClick={() => mapInstanceRef.current?.zoomIn()}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-10 h-10 p-0 bg-white shadow-md hover:bg-gray-50"
                    onClick={() => mapInstanceRef.current?.zoomOut()}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-10 h-10 p-0 bg-white shadow-md hover:bg-gray-50"
                    onClick={() =>
                      mapInstanceRef.current?.setView([37.7749, -122.4194], 10)
                    }
                  >
                    <Crosshair className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle List & Details */}
          <div className="space-y-4">
            {/* Vehicle List */}
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
                {devices.map((vehicle) => (
                  <div
                    key={vehicle.id}
                    onClick={() => handleVehicleClick(vehicle.id)}
                    className={`p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                      selectedVehicle === vehicle.id
                        ? "bg-blue-50 border-blue-500"
                        : ""
                    }`}
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

                {/* <Button
                  variant="ghost"
                  className="w-full justify-start bg-gray-50 hover:bg-gray-100"
                >
                  <Download className="mr-3 h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">
                    Export Tracking Data
                  </span>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start bg-gray-50 hover:bg-gray-100"
                >
                  <Settings className="mr-3 h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Tracking Settings</span>
                </Button> */}
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
                  {vehicles.length}
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
