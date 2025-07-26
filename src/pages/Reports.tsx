import React, { useState } from "react";
import axiosInstance from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const reportTypeMap: Record<string, string> = {
  trip: "trips",
  stop: "stops",
  history: "history",
  overspeed: "overspeed",
  geofence: "geofence",
};

const Reports = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const [reportType, setReportType] = useState("");
  const [tableTitle, setTableTitle] = useState("Trips Report - January 2024");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [fromDate, setFromDate] = useState("2025-06-01");
  const [toDate, setToDate] = useState("2025-06-14");

  const handleReportTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setReportType(value);
    switch (value) {
      case "trips":
        setTableTitle("Trips Report - January 2024");
        break;
      case "stops":
        setTableTitle("Stops Report - January 2024");
        break;
      case "history":
        setTableTitle("History Report - January 2024");
        break;
      case "overspeed":
        setTableTitle("Overspeed Events - January 2024");
        break;
      case "geofence":
        setTableTitle("Geofence Triggers - January 2024");
        break;
      default:
        setTableTitle("Trips Report - January 2024");
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
    queryKey: ["industries"],
    queryFn: fetchDevices,
    staleTime: 5 * 60 * 1000,
  });

  const handleGenerateReport = async () => {
    const deviceId = selectedDevice.id;
    try {
      if (!reportType || !deviceId) {
        alert("Please select a report type and device.");
        return;
      }

      const typePath = reportTypeMap[reportType];
      const from = new Date(fromDate).toISOString();
      const to = new Date(toDate).toISOString();

      const url = `${apiURL}/reports/${typePath}?deviceId=${deviceId}&from=${from}&to=${to}`;
      const response = await axiosInstance.get(url, {
        responseType: "blob",
        headers: {
          Accept: "*/*",
        },
        withCredentials: true,
      });
      const file = response.data;
      const text = await file.text();
      console.log("Generated report:", file);
      console.log("Generated report text:", text);
      const fileBlob = new Blob([file], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const fileUrl = URL.createObjectURL(fileBlob);

      alert("Report generated successfully!");
      // setIsModalOpen(true);
      // setPreviewUrl(fileUrl);

      //Update state or UI with `data`
      const generatedReport = {
        type: typePath,
        device: selectedDevice.name,
        dateRange: `${from} - ${to}`,
        generated: new Date().toLocaleString(),
        status: "Success",
        statusColor: "bg-green-500",
      };
      // setGeneratedReports(generatedReport);
    } catch (error) {
      console.error("Error generating report:", error);
      alert("Failed to generate report. Please try again.");
    }
  };
  return (
    <div id="main-content" className="flex-1 flex flex-col">
      <div
        id="header"
        className="bg-white shadow-sm border-b border-gray-200 px-6 py-4"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">Reports</h1>
        </div>
      </div>

      <div id="reports-content" className="flex-1 p-6 overflow-auto">
        {/* Report Filters */}
        <div
          id="report-filters"
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Generate Report
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Report Type
              </label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trip">Trip Report</SelectItem>
                  <SelectItem value="stop">Stop Report</SelectItem>
                  <SelectItem value="history">History Report</SelectItem>
                  <SelectItem value="overspeed">Overspeed Report</SelectItem>
                  {/* <SelectItem value="geofence">Geofence Report</SelectItem> */}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Device
              </label>
              <Select
                onValueChange={(value) => {
                  const device = devices.find((d) => d.id === value);
                  setSelectedDevice(device);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select device" />
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
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                To Date
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleGenerateReport}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 flex items-center"
            >
              Generate Report
            </button>
          </div>
        </div>

        {/* Reports Table */}
        <div
          id="reports-table"
          className="bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-800">
                {tableTitle}
              </h4>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-primary text-white text-sm rounded-lg flex items-center">
                  PDF
                </button>
                <button className="px-3 py-1 bg-success text-white text-sm rounded-lg flex items-center">
                  Excel
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Device
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    End Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Distance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Max Speed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {/* Sample rows */}
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ABC-123
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2024-01-15 08:30
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    2024-01-15 12:45
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    4h 15m
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    156.2 km
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    89 km/h
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-50 bg-opacity-20 text-green-500">
                      Completed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 border-t border-gray-200 hidden">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">
                Showing 1 to 5 of 142 results
              </span>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 bg-primary text-white rounded">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                  3
                </button>
                <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
