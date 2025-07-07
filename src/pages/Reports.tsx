
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const MagnifyingGlassIcon = () => (
  <svg className="svg-inline--fa fa-magnifying-glass" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magnifying-glass" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg>
);
const DownloadIcon = () => (
  <svg className="svg-inline--fa fa-download" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="download" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H346.5l-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352H64zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"></path></svg>
);
const RotateIcon = () => (
  <svg className="svg-inline--fa fa-arrows-rotate" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrows-rotate" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"></path></svg>
);
const FileExcelIcon = () => (
  <svg className="svg-inline--fa fa-file-excel" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="file-excel" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM155.7 250.2L192 302.1l36.3-51.9c7.6-10.9 22.6-13.5 33.4-5.9s13.5 22.6 5.9 33.4L221.3 344l46.4 66.2c7.6 10.9 5 25.8-5.9 33.4s-25.8 5-33.4-5.9L192 385.8l-36.3 51.9c-7.6 10.9-22.6 13.5-33.4 5.9s-13.5-22.6-5.9-33.4L162.7 344l-46.4-66.2c-7.6-10.9-5-25.8 5.9-33.4s25.8-5 33.4 5.9z"></path></svg>
);

const Reports = () => {
  const [reportType, setReportType] = useState("trips");
  const [tableTitle, setTableTitle] = useState("Trips Report - January 2024");
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
    const ctx = chartRef.current.getContext("2d");
    chartInstanceRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Jan 10", "Jan 11", "Jan 12", "Jan 13", "Jan 14", "Jan 15", "Jan 16"],
        datasets: [
          {
            label: "Trips",
            data: [8, 12, 6, 15, 10, 14, 9],
            backgroundColor: "#5b73e8",
            borderRadius: 4,
          },
          {
            label: "Violations",
            data: [2, 1, 0, 3, 1, 2, 1],
            backgroundColor: "#f46a6a",
            borderRadius: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
    // Cleanup
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, []);

  const handleReportTypeChange = (e) => {
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

  return (
    <div id="main-content" className="flex-1 flex flex-col">
      <div id="header" className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">Reports</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 flex items-center">
              <span className="mr-2"><DownloadIcon /></span>
              Export Report
            </button>
          </div>
        </div>
      </div>

      <div id="reports-content" className="flex-1 p-6 overflow-auto">
        <div id="report-filters" className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Generate Report</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select id="reportType" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent" value={reportType} onChange={handleReportTypeChange}>
                <option value="trips">Trips Report</option>
                <option value="stops">Stops Report</option>
                <option value="history">History Report</option>
                <option value="overspeed">Overspeed Events</option>
                <option value="geofence">Geofence Triggers</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Device</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent">
                <option value="all">All Devices</option>
                <option value="abc123">ABC-123</option>
                <option value="xyz789">XYZ-789</option>
                <option value="def456">DEF-456</option>
                <option value="ghi321">GHI-321</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
              <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent" defaultValue="2024-01-01" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
              <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent" defaultValue="2024-01-31" />
            </div>
          </div>
          <div className="flex justify-end space-x-3">
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center">
              <span className="mr-2"><RotateIcon /></span>
              Reset
            </button>
            <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90 flex items-center">
              <span className="mr-2"><MagnifyingGlassIcon /></span>
              Generate Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div id="quick-stats" className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Trips</span>
                  <span className="text-lg font-bold text-primary">142</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Distance</span>
                  <span className="text-lg font-bold text-success">2,845 km</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Speed Violations</span>
                  <span className="text-lg font-bold text-danger">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Geofence Events</span>
                  <span className="text-lg font-bold text-warning">67</span>
                </div>
              </div>
            </div>
          </div>

          <div id="report-chart" className="lg:col-span-3 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h4 className="text-lg font-semibold text-gray-800">Daily Activity Overview</h4>
            </div>
            <div className="p-4">
              <div className="h-[300px]">
                <canvas id="reportsChart" ref={chartRef} width="1618" height="600" style={{ display: "block", boxSizing: "border-box", height: "300px", width: "809px" }} />
              </div>
            </div>
          </div>
        </div>

        <div id="reports-table" className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-800">{tableTitle}</h4>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-primary text-white text-sm rounded-lg flex items-center">
                  <span className="mr-1"><DownloadIcon /></span>
                  PDF
                </button>
                <button className="px-3 py-1 bg-success text-white text-sm rounded-lg flex items-center">
                  <span className="mr-1"><FileExcelIcon /></span>
                  Excel
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">End Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max Speed</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">ABC-123</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-01-15 08:30</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-01-15 12:45</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4h 15m</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">156.2 km</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">89 km/h</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-50 bg-opacity-20 text-green-500">Completed</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">XYZ-789</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-01-15 09:15</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-01-15 11:30</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2h 15m</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">78.5 km</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">95 km/h</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-50 bg-opacity-20 text-yellow-500">Overspeed</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">DEF-456</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-01-15 14:00</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-01-15 16:20</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2h 20m</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">92.1 km</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">72 km/h</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-50 bg-opacity-20 text-green-500">Completed</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">GHI-321</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-01-15 07:45</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-01-15 10:15</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2h 30m</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">134.7 km</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">88 km/h</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-50 bg-opacity-20 text-green-500">Completed</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">JKL-654</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2024-01-15 13:30</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">--</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-50 bg-opacity-20 text-red-500">Interrupted</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-700">Showing 1 to 5 of 142 results</span>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">Previous</button>
                <button className="px-3 py-1 bg-primary text-white rounded">1</button>
                <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">2</button>
                <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">3</button>
                <button className="px-3 py-1 border border-gray-300 text-gray-700 rounded hover:bg-gray-50">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;

                
