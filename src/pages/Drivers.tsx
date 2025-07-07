import React, { useState } from "react";
import {
  Plus,
  Grip,
  List as ListIcon,
  Eye,
  ExternalLink,
  Clock,
} from "lucide-react";
import AddDriverModal from "../components/AddDriverModal.tsx";

const driversData = [
  {
    id: "D001",
    name: "John Smith",
    status: "Active",
    statusClass: "bg-green-100 text-green-500",
    avatar:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
    vehicle: "Vehicle-001",
    license: "DL123456",
    experience: "5 years",
    phone: "+1234567890",
    shift: "8:00 AM - 6:00 PM",
    shiftLabel: "Shift",
    opacity: "",
  },
  {
    id: "D002",
    name: "Maria Garcia",
    status: "On Break",
    statusClass: "bg-yellow-100 text-yellow-500",
    avatar:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg",
    vehicle: "Vehicle-002",
    license: "DL789012",
    experience: "8 years",
    phone: "+1234567891",
    shift: "9:00 AM - 7:00 PM",
    shiftLabel: "Shift",
    opacity: "",
  },
  {
    id: "D003",
    name: "David Wilson",
    status: "Active",
    statusClass: "bg-green-100 text-green-500",
    avatar:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
    vehicle: "Vehicle-004",
    license: "DL345678",
    experience: "3 years",
    phone: "+1234567892",
    shift: "7:00 AM - 5:00 PM",
    shiftLabel: "Shift",
    opacity: "",
  },
  {
    id: "D004",
    name: "Robert Chen",
    status: "Off Duty",
    statusClass: "bg-gray-100 text-gray-600",
    avatar:
      "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg",
    vehicle: "Unassigned",
    license: "DL901234",
    experience: "6 years",
    phone: "+1234567893",
    shift: "Tomorrow 8:00 AM",
    shiftLabel: "Next Shift",
    opacity: "opacity-75",
  },
];

const vehicleOptions = ["Vehicle-001", "Vehicle-002", "Vehicle-003"];

const Drivers: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");

  const openModal = () => setShowAddModal(true);
  const closeModal = () => setShowAddModal(false);

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Drivers Management
            </h1>
            <div className="flex items-center space-x-2 text-xs text-gray-600">
              <span className="px-4 py-1 bg-green-100 text-green-500 rounded-full font-semibold text-xs">
                12 Active
              </span>
              <span className="px-4 py-1 bg-yellow-100 text-yellow-500 rounded-full font-semibold text-xs ml-3">
                3 On Break
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              id="add-driver-btn"
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex flex-row items-center"
              onClick={openModal}
            >
              <Plus className="mr-2 h-4 w-4" />
              <span>Add Driver</span>
            </button>
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                id="grid-view-btn"
                className={`px-3 py-2 rounded-md text-sm font-medium flex flex-row items-center ${
                  view === "grid"
                    ? "bg-white text-primary shadow-sm"
                    : "text-gray-600 hover:bg-white hover:shadow-sm transition-all"
                }`}
                onClick={() => setView("grid")}
              >
                <Grip className="mr-2 h-4 w-4" />
                <span>Grid</span>
              </button>
              <button
                id="list-view-btn"
                className={`px-3 py-2 rounded-md text-sm font-medium flex flex-row items-center ${
                  view === "list"
                    ? "bg-white text-primary shadow-sm"
                    : "text-gray-600 hover:bg-white hover:shadow-sm transition-all"
                }`}
                onClick={() => setView("list")}
              >
                <ListIcon className="mr-2 h-4 w-4" />
                <span>List</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Filter Bar */}
        <div
          id="filter-bar"
          className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">
                  Status:
                </label>
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>All Drivers</option>
                  <option>Active</option>
                  <option>On Break</option>
                  <option>Off Duty</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">
                  Vehicle:
                </label>
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>All Vehicles</option>
                  <option>Assigned</option>
                  <option>Unassigned</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                <i className="mr-2 fa fa-filter" />
                Apply Filters
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                <i className="mr-2 fa fa-download" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Grid View */}
        <div
          id="grid-view"
          className={
            view === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "hidden"
          }
        >
          {driversData.map((driver, idx) => (
            <div
              key={driver.id}
              id={`driver-card-${idx + 1}`}
              className={`bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow ${driver.opacity}`}
            >
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={driver.avatar}
                    alt="Driver"
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{driver.name}</h3>
                    <p className="text-sm text-gray-500">
                      Driver ID: {driver.id}
                    </p>
                    <span
                      className={`inline-flex items-center px-4 py-1 rounded-full font-semibold text-xs mt-1 ${
                        driver.status === "Active"
                          ? "bg-green-100 text-green-500"
                          : driver.status === "On Break"
                          ? "bg-yellow-100 text-yellow-500"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {(driver.status === "Active" ||
                        driver.status === "On Break") && (
                        <span
                          className={`w-2 h-2 rounded-full mr-2 ${
                            driver.status === "Active"
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          }`}
                        />
                      )}
                      {driver.status}
                    </span>
                  </div>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Vehicle</span>
                    <span
                      className={`font-semibold ${
                        driver.vehicle === "Unassigned"
                          ? "text-gray-400"
                          : "text-gray-800"
                      }`}
                    >
                      {driver.vehicle}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">License</span>
                    <span className="font-semibold text-gray-800">
                      {driver.license}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Experience</span>
                    <span className="font-semibold text-gray-800">
                      {driver.experience}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Phone</span>
                    <span className="font-semibold text-gray-800">
                      {driver.phone}
                    </span>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-4">
                  <div className="flex items-center text-xs text-gray-500 mb-3">
                    <Clock className="mr-2 h-4 w-4 text-gray-400" />
                    <span>
                      {driver.shiftLabel}: {driver.shift}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-primary text-white rounded-lg text-xs font-medium hover:bg-blue-600 transition-colors flex items-center justify-center">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </button>
                    <button className="px-3 py-2 border border-gray-200 rounded-lg text-xs font-medium flex items-center justify-center hover:bg-gray-50 transition-colors">
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* List View */}
        <div id="list-view" className={view === "list" ? "" : "hidden"}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700">
                <div className="col-span-3">Driver</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Vehicle</div>
                <div className="col-span-2">License</div>
                <div className="col-span-2">Shift</div>
                <div className="col-span-1 text-center font-semibold text-gray-800">
                  Actions
                </div>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {driversData.map((driver, idx) => (
                <div
                  key={driver.id}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    <div className="col-span-3 flex items-center space-x-3">
                      <img
                        src={driver.avatar}
                        alt="Driver"
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <p className="font-semibold text-gray-800">
                          {driver.name}
                        </p>
                        <p className="text-sm text-gray-500">{driver.id}</p>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <span
                        className={`inline-flex items-center px-2 py-1 ${driver.statusClass} text-xs rounded-full font-medium`}
                      >
                        {driver.status !== "Off Duty" && (
                          <div
                            className={`w-2 h-2 ${
                              driver.statusClass.split(" ")[0]
                            } rounded-full mr-2`}
                          ></div>
                        )}
                        {driver.status}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <p
                        className={`font-semibold ${
                          driver.vehicle === "Unassigned"
                            ? "text-gray-400"
                            : "text-gray-800"
                        }`}
                      >
                        {driver.vehicle}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="font-semibold text-gray-800">
                        {driver.license}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm text-gray-600">{driver.shift}</p>
                    </div>
                    <div className="col-span-1">
                      <div className="flex items-center justify-center gap-x-4">
                        <button
                          type="button"
                          className="bg-transparent p-0 m-0 focus:outline-none"
                        >
                          <Eye className="h-5 w-5 text-primary" />
                        </button>
                        <button
                          type="button"
                          className="bg-transparent p-0 m-0 focus:outline-none"
                        >
                          <ExternalLink className="h-5 w-5 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Add Driver Modal */}
      <AddDriverModal
        open={showAddModal}
        onClose={closeModal}
        vehicles={vehicleOptions}
      />
    </div>
  );
};

export default Drivers;
