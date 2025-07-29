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
import { Button } from "@/components/ui/button";
import * as XLSX from "xlsx";

const reportTypeMap: Record<string, string> = {
  trip: "trips",
  stop: "stops",
  summary: "summary",
  fuel: "fuel",
  // geofence: "geofence",
};

const Reports = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const [reportType, setReportType] = useState("");
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [generatedReports, setGeneratedReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

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
      alert("Report generated successfully!");
      const blob = response.data;
      // Download in Excel
      const downloadUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `route-history-${deviceId}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(downloadUrl);

      const arrayBuffer = await blob.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });

      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];

      const jsonData = XLSX.utils.sheet_to_json(worksheet, { range: 7 });
      setGeneratedReports(jsonData);
      console.log(jsonData, "checking the data");
      console.log(Object.keys(jsonData[0]));
    } catch (error) {
      console.error("Error generating report:", error);
      alert("Failed to generate report. Please try again.");
    }
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = generatedReports.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(generatedReports.length / rowsPerPage);
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
                  <SelectItem value="summary">Summary Report</SelectItem>
                  <SelectItem value="fuel">Fuel Report</SelectItem>
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
        {generatedReports.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-center my-4">
            <p className="text-gray-500">No report generated.</p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-x-auto sm:rounded-lg my-10">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                {reportTypeMap[reportType]?.replace(/^\w/, (c) =>
                  c.toUpperCase()
                )}{" "}
                Report &mdash;{" "}
                <span className="text-gray-600">
                  {generatedReports.length} records
                </span>
              </h3>

              <div className="w-full overflow-x-auto">
                <table className="min-w-full text-sm md:text-base divide-y divide-gray-200 overflow-x-auto">
                  <thead className="bg-gray-50">
                    <tr>
                      {Object.keys(generatedReports[0])
                        // .filter((key) => !excludedFields.includes(key))
                        .map((key) => (
                          <th
                            key={key}
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {key}
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentRows.map((row, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        {Object.entries(row)
                          // .filter(([key]) => !excludedFields.includes(key))
                          .map(([_, value], cellIndex) => (
                            <td
                              key={cellIndex}
                              className="px-4 md:px-6 py-2 md:py-4 whitespace-nowrap text-gray-900"
                            >
                              {value?.toString().slice(0, 60) || "-"}
                            </td>
                          ))}
                      </tr>
                    ))}
                  </tbody>
                  <div className="md:w-[300px] mt-6 flex justify-center items-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                    >
                      Prev
                    </Button>

                    <span className="text-sm text-gray-700">
                      Page {currentPage} of {totalPages}
                    </span>

                    <Button
                      variant="outline"
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;
