import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import * as XLSX from "xlsx";

const RouteHistory = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [fromDate, setFromDate] = useState("2025-07-01");
  const [toDate, setToDate] = useState("2025-07-01");
  const [routeData, setRouteData] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

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
    queryKey: ["industries"],
    queryFn: fetchDevices,
    staleTime: 5 * 60 * 1000,
  });

  const handleGenerateRouteHistory = async () => {
    const deviceId = selectedDevice?.id;
    if (!deviceId) {
      alert("Please select a device");
      return;
    }

    const from = new Date(fromDate).toISOString();
    const to = new Date(toDate).toISOString();

    setIsGenerating(true);

    try {
      const url = `${apiURL}/reports/route?deviceId=${deviceId}&from=${from}&to=${to}`;
      const response = await axiosInstance.get(url, {
        responseType: "blob",
        withCredentials: true,
      });

      // Download the file
      const blob = response.data;
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `route-history-${deviceId}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);

      // Parse Excel data for table display
      const arrayBuffer = await blob.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      // Convert to JSON - this will give you an array of objects
      const jsonData = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        defval: "",
      });

      const dataStartRow = 7;
      const headers = jsonData[dataStartRow] || [];
      const dataRows = jsonData.slice(dataStartRow + 1);

      // Convert to array of objects with proper headers
      const processedData = dataRows
        .filter((row) => row.some((cell) => cell !== ""))
        .map((row) => {
          const rowObject = {};
          headers.forEach((header, index) => {
            if (header) {
              let value = row[index] || "";

              // Handle attributes column if it contains JSON
              if (
                header.toLowerCase().includes("attributes") &&
                typeof value === "string"
              ) {
                try {
                  value = JSON.parse(value);
                } catch (e) {
                  // Keep as string if not valid JSON
                }
              }

              rowObject[header] = value;
            }
          });
          return rowObject;
        });

      console.log("Processed data:", processedData);
      setRouteData(processedData);
    } catch (error) {
      console.error("Error generating route history:", error);
      alert("Failed to generate history. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Function to render cell content (handles objects/arrays)
  const renderCellContent = (value) => {
    if (typeof value === "object" && value !== null) {
      return <pre className="text-xs">{JSON.stringify(value, null, 2)}</pre>;
    }
    return value?.toString() || "";
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
              className="p-2 text-gray-600 hover:text-primary"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-semibold text-gray-800">
              Route History
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-auto bg-slate-200">
        {/* Filter Panel */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Search Filters
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Devices
              </label>
              <Select
                onValueChange={(value) => {
                  const device = devices.find((d) => d.id === value);
                  setSelectedDevice(device);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a device" />
                </SelectTrigger>
                <SelectContent>
                  {devices.map((device) => (
                    <SelectItem key={device.id} value={device.id}>
                      {device.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                From Date
              </label>
              <Input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To Date
              </label>
              <Input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="hidden md:block self-end">
              <Button
                onClick={handleGenerateRouteHistory}
                disabled={isGenerating}
                className="bg-primary text-white hover:bg-blue-600 disabled:opacity-50"
              >
                <Search className="mr-2 h-4 w-4" />
                {isGenerating ? "Generating..." : "Search Route History"}
              </Button>
            </div>
            <div className="block md:hidden self-end">
              <Button
                onClick={handleGenerateRouteHistory}
                disabled={isGenerating}
                className="bg-primary text-white hover:bg-blue-600 disabled:opacity-50"
              >
                <Search className="mr-2 h-4 w-4" />
                {isGenerating ? "Generating..." : "Search History"}
              </Button>
            </div>
          </div>
        </div>

        {/* History table */}
        {routeData.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow p-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">
              Route History Table ({routeData.length} records)
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border border-gray-300">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    {routeData[0] &&
                      Object.keys(routeData[0]).map((key) => (
                        <th
                          key={key}
                          className="border border-gray-300 px-4 py-2 font-semibold"
                        >
                          {key}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {routeData.map((row, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      {Object.values(row).map((value, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="border border-gray-300 px-4 py-2 text-sm"
                        >
                          {renderCellContent(value)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Loading state */}
        {isGenerating && (
          <div className="mt-6 bg-white rounded-lg shadow p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-600">Generating route history...</p>
          </div>
        )}

        {/* No data state */}
        {!isGenerating && routeData.length === 0 && (
          <div className="mt-6 bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-600">
              No route history data available. Generate a report to see results.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default RouteHistory;
