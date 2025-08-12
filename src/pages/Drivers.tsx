import React, { useState } from "react";
import axiosInstance from "@/api/axios.ts";
import { useQuery } from "@tanstack/react-query";
import { Plus, Grip, List as ListIcon, User } from "lucide-react";
import AddDriverModal from "../components/AddDriverModal.tsx";

const Drivers: React.FC = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const [showAddModal, setShowAddModal] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");

  const openModal = () => setShowAddModal(true);
  const closeModal = () => setShowAddModal(false);

  const fetchDrivers = async () => {
    const res = await axiosInstance.get(`${apiURL}/drivers`, {
      withCredentials: true,
    });
    console.log(res.data, "response");
    return res.data;
  };

  const {
    data: drivers = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["drivers"],
    queryFn: fetchDrivers,
    staleTime: 5 * 60 * 1000,
  });
  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-800">
              Drivers Management
            </h1>
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
        {/* Grid View */}
        <div
          id="grid-view"
          className={
            view === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              : "hidden"
          }
        >
          {drivers.map((driver, idx) => (
            <div
              key={driver.id}
              id={`driver-card-${idx + 1}`}
              className={`bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow ${driver.opacity}`}
            >
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-14 h-14 rounded-full border-2 border-primary flex items-center justify-center">
                    <User className="w-12" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{driver?.name}</h3>
                    <p className="text-sm text-gray-500">
                      Driver ID: {driver?.uniqueId}
                    </p>
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
                      {driver.assignedVehicleId}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">License</span>
                    <span className="font-semibold text-gray-800">
                      {driver.licenseNo}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Phone</span>
                    <span className="font-semibold text-gray-800">
                      {driver.phone}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* List View */}
        <div id="list-view" className={view === "list" ? "" : "hidden"}>
          <div className="w-full overflow-auto overflow-x-auto">
            <div className="min-w-[640px] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700">
                  <div className="col-span-3">Driver</div>
                  <div className="col-span-2">Phone</div>
                  <div className="col-span-2">License No.</div>
                  <div className="col-span-2">Vehicle</div>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {drivers.map((driver, idx) => (
                  <div
                    key={driver.id}
                    className="px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="grid grid-cols-12 gap-4 items-center">
                      <div className="col-span-3 flex items-center space-x-3">
                        <div className="w-14 h-14 rounded-full border-2 border-primary flex items-center justify-center">
                          <User className="w-12" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">
                            {driver?.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {driver?.uniqueId}
                          </p>
                        </div>
                      </div>
                      <div className="col-span-2">
                        <p className="font-semibold text-gray-800">
                          {driver?.phone}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="font-semibold text-gray-800">
                          {driver?.licenseNo}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p
                          className={`font-semibold ${
                            driver.vehicle === "Unassigned"
                              ? "text-gray-400"
                              : "text-gray-800"
                          }`}
                        >
                          {driver.assignedVehicleId}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Add Driver Modal */}
      <AddDriverModal open={showAddModal} onClose={closeModal} />
    </div>
  );
};

export default Drivers;
