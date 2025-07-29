import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/api/axios";

const getBatteryColor = (battery: number) => {
  if (battery > 60) return "bg-green-500";
  if (battery > 30) return "bg-yellow-500";
  return "bg-red-500";
};

interface DeviceLiveInfoProps {
  deviceId: number;
  positionId: number;
}

type DeviceAttributes = {
  batteryLevel?: number;
  charge?: boolean;
  ignition?: boolean;
};

type DeviceLiveData = {
  speed: number;
  attributes: DeviceAttributes;
  latitude: number;
  longitude: number;
};

export default function DeviceLiveInfo({
  deviceId,
  positionId,
}: DeviceLiveInfoProps) {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;

  const fetchLiveData = async (): Promise<DeviceLiveData> => {
    const res = await axiosInstance.get(
      `${apiURL}/positions?deviceId=${deviceId}&from=2025-07-01T00:00:03.218Z&to=2025-07-26T23:37:03.218Z&id=${positionId}`,
      { withCredentials: true }
    );
    // console.log(res.data, "live data");

    const matched = res.data.find(
      (item: any) => item.deviceId === deviceId && item.id === positionId
    );

    if (!matched) {
      throw new Error(
        `No matching position found for device ${deviceId} and position ${positionId}`
      );
    }
    // console.log(matched, "Matched");
    return matched;
  };

  const { data, isLoading, isError } = useQuery<DeviceLiveData>({
    queryKey: ["device-live", deviceId, positionId],
    queryFn: fetchLiveData,
  });

  if (isLoading) return <p className="text-sm text-gray-400">Loading...</p>;
  if (isError || !data) return <p className="text-sm text-red-400">Error</p>;

  const { speed, latitude, longitude, attributes } = data;
  const battery = data.attributes?.batteryLevel ?? 0;
  // console.log(battery, "battery level");
  const batteryColor = getBatteryColor(battery);

  return (
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-600">Speed:</span>
        <span className="font-semibold text-gray-800">{speed} km/h</span>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Battery:</span>
        <div className="flex items-center space-x-2">
          <div className="w-16 h-2 bg-gray-200 rounded-full">
            <div
              className={`h-2 ${batteryColor} rounded-full`}
              style={{ width: `${battery}%` }}
            ></div>
          </div>
          <span className={`font-semibold text-xs text-gray-800`}>
            {battery}%
          </span>
        </div>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Location:</span>
        <span className="text-gray-700">
          {latitude !== undefined && longitude !== undefined
            ? `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`
            : "N/A"}
        </span>
      </div>
    </div>
  );
}
