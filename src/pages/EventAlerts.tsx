import { useState } from "react";
import axiosInstance from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  Gauge,
  MapPin,
  AlertTriangle,
  Car,
  Clock,
  Eye,
  Filter,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const eventTypeConfig = {
  overspeed: {
    icon: (className) => <Gauge className={`text-red-600 ${className}`} />,
    bg: "bg-red-100",
    label: "Overspeed Alert",
  },
  geofenceExit: {
    icon: (className) => <MapPin className={`text-yellow-600 ${className}`} />,
    bg: "bg-yellow-100",
    label: "Geofence Exit",
  },
  geofenceEnter: {
    icon: (className) => <MapPin className={`text-yellow-600 ${className}`} />,
    bg: "bg-yellow-100",
    label: "Geofence Entry",
  },
  deviceStopped: {
    icon: (className) => (
      <AlertTriangle className={`text-gray-600 ${className}`} />
    ),
    bg: "bg-gray-100",
    label: "Device Stopped",
  },
};

const EventAlerts = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const [deviceFilter, setDeviceFilter] = useState("All Devices");

  const fetchDevices = async () => {
    const res = await axiosInstance.get(`${apiURL}/devices`, {
      withCredentials: true,
    });
    console.log(res.data, "response");
    return res.data;
  };

  // const fetchDeviceEvents = async (deviceId) => {
  //   if (!deviceId || deviceId === "All Devices") return [];
  //   const res = await axiosInstance.get(`${apiURL}/events/${deviceId}`, {
  //     withCredentials: true,
  //   });
  //   console.log(res.data, "response from events");
  //   return res.data;
  // };
  const fetchDeviceEvent = async (deviceId) => {
    if (!deviceId || deviceId === "All Devices") return null;

    // 1. Fetch the event (single object)
    const eventRes = await axiosInstance.get(`${apiURL}/events/${deviceId}`, {
      withCredentials: true,
    });

    const event = eventRes.data;
    if (!event || !event.positionId) return event;

    // 2. Fetch position for the event
    const positionsRes = await axiosInstance.get(
      `${apiURL}/positions?deviceId=${event.deviceId}&from=2025-08-01T00:00:03.218Z&to=2025-08-05T23:37:03.218Z&id=${event.positionId}`,
      { withCredentials: true }
    );

    const matchedPosition = positionsRes.data.find(
      (pos) => pos.id === event.positionId
    );

    return {
      ...event,
      position: matchedPosition || null,
    };
  };

  const {
    data: devices = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["industries"],
    queryFn: fetchDevices,
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: event,
    isLoading: isEventLoading,
    isError: isEventError,
  } = useQuery({
    queryKey: ["deviceEvent", deviceFilter],
    queryFn: () => fetchDeviceEvent(deviceFilter),
    enabled: deviceFilter !== "All Devices",
  });

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              Event Alerts
            </h1>
          </div>
        </div>
      </header>

      {/* Events Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">
                All Devices
              </label>
              <Select
                value={deviceFilter}
                onValueChange={(val) => {
                  setDeviceFilter(val);
                }}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Devices">All Devices</SelectItem>
                  {devices.map((device) => (
                    <SelectItem key={device.id} value={device.id}>
                      {device.name || device.identifier}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200 bg-white rounded-xl">
          {isEventLoading ? (
            <p className="p-4 text-gray-500">Loading event...</p>
          ) : isEventError ? (
            <p className="p-4 text-red-500">Failed to load event</p>
          ) : !event ? (
            <p className="p-4 text-gray-500">No event available</p>
          ) : (
            (() => {
              const config = eventTypeConfig[event.type] || {
                icon: (className) => (
                  <AlertTriangle className={`text-gray-600 ${className}`} />
                ),
                bg: "bg-red-500",
                label: event.type,
              };

              return (
                <div className="p-4 hover:bg-gray-50">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`w-10 h-10 ${config.bg} rounded-full flex items-center justify-center flex-shrink-0`}
                    >
                      {config.icon("w-5 h-5")}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-800">
                          {config.label}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {new Date(event.eventTime).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {event.position?.address
                          ? `Location: ${event.position.address}`
                          : `Event for Device ${event.deviceId}`}
                      </p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span>
                          <Car className="w-3 h-3 mr-1 inline" />
                          Device {event.deviceId}
                        </span>
                        {event.position && (
                          <span>
                            <MapPin className="w-3 h-3 mr-1 inline" />
                            {event.position.address || "Unknown Location"}
                          </span>
                        )}
                        <span>
                          <Clock className="w-3 h-3 mr-1 inline" />
                          {new Date(event.eventTime).toLocaleTimeString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()
          )}
        </div>
      </main>
    </div>
  );
};

export default EventAlerts;
