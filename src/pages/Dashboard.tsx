import { useEffect, useRef, useState } from "react";
import axiosInstance from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Car, Wifi, Route, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

// Declare Leaflet types for TypeScript
declare global {
  interface Window {
    L: any;
  }
}

const Dashboard = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Load Leaflet CSS and JS
    const loadLeaflet = async () => {
      // Add Leaflet CSS
      if (!document.querySelector('link[href*="leaflet"]')) {
        const leafletCSS = document.createElement("link");
        leafletCSS.rel = "stylesheet";
        leafletCSS.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        leafletCSS.integrity =
          "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
        leafletCSS.crossOrigin = "";
        document.head.appendChild(leafletCSS);
      }

      // Add Leaflet JS
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
        // Initialize map centered on New York
        mapInstanceRef.current = window.L.map(mapRef.current).setView(
          [40.7128, -74.006],
          11
        );

        // Add tile layer
        window.L.tileLayer(
          "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          {
            attribution: "© OpenStreetMap contributors",
          }
        ).addTo(mapInstanceRef.current);

        // Add markers for vehicles
        devices.forEach((vehicle) => {
          const getMarkerColor = (status: string) => {
            switch (status) {
              case "online":
                return "#22c55e";
              case "idle":
                return "#eab308";
              case "offline":
                return "#6b7280";
              default:
                return "#6b7280";
            }
          };

          const customIcon = window.L.divIcon({
            className: "custom-marker",
            html: `<div style="background-color: ${getMarkerColor(
              vehicle.status
            )}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
              <div style="color: white; font-size: 10px; font-weight: bold;">${
                vehicle.id
              }</div>
            </div>`,
            iconSize: [26, 26],
            iconAnchor: [13, 13],
          });

          const popupContent = `
            <div style="padding: 8px;">
              <h4 style="margin: 0 0 8px 0; font-weight: bold;">${vehicle.name}</h4>
              <p style="margin: 0; font-size: 12px;"><strong>Status:</strong> ${vehicle.status}</p>
              <p style="margin: 0; font-size: 12px;"><strong>Speed:</strong> ${vehicle.speed} km/h</p>
              <p style="margin: 0; font-size: 12px;"><strong>Battery:</strong> ${vehicle.battery}%</p>
            </div>
          `;

          window.L.marker([vehicle.lat, vehicle.lng], { icon: customIcon })
            .addTo(mapInstanceRef.current)
            .bindPopup(popupContent);
        });

        // Invalidate size after a short delay to ensure proper rendering
        setTimeout(() => {
          if (mapInstanceRef.current) {
            mapInstanceRef.current.invalidateSize();
          }
        }, 100);
      }
    };

    initializeMap();

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

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
      {/* Dashboard Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  Total Vehicles
                </p>
                <p className="text-3xl font-bold text-gray-800 mt-1">
                  {devices.length}
                </p>
              </div>
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center">
                <Car className="text-blue-600 text-2xl h-7 w-7" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Online Now</p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {
                    devices.filter((device) => device.status === "online")
                      .length
                  }
                </p>
              </div>
              <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center">
                <Wifi className="text-green-600 text-2xl h-7 w-7" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  Active Alerts
                </p>
                <p className="text-3xl font-bold text-red-600 mt-1">0</p>
              </div>
              <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center">
                <span
                  className="text-red-600 text-2xl h-7 w-7 flex items-center justify-center"
                  aria-label="Alert"
                  role="img"
                >
                  ⚠️
                </span>
              </div>
            </div>
          </div>

          {/* <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Distance Today</p>
                <p className="text-3xl font-bold text-gray-800 mt-1">1,247</p>
                <p className="text-xs text-gray-500 mt-1">km traveled</p>
              </div>
              <div className="w-14 h-14 bg-yellow-50 rounded-xl flex items-center justify-center">
                <Route className="text-yellow-600 text-2xl h-7 w-7" />
              </div>
            </div>
          </div> */}
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
                <div ref={mapRef} className="w-full h-full z-0"></div>
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
                          devices.filter((device) => device.status === "offline")
                            .length
                        }{" "}
                        vehicles
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="font-medium">Alerts: 3 active</span>
                    </div>
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
