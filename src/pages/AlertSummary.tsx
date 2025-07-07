
import { useState } from "react";
import { AlertTriangle, Info, CheckCircle, Battery, Car, Gauge, MapPin, Shield, Clock, Route, Ruler, User, Bell, Download, Settings, Wifi } from "lucide-react";

const AlertSummary = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold text-gray-800">Alert Summary Panel</h1>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Alert Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical Alerts</p>
                <p className="text-3xl font-bold text-red-600">5</p>
                <p className="text-xs text-gray-500 mt-1">Last 24 hours</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="text-red-600 text-xl w-6 h-6" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Warning Alerts</p>
                <p className="text-3xl font-bold text-yellow-600">12</p>
                <p className="text-xs text-gray-500 mt-1">Last 24 hours</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="text-yellow-600 text-xl w-6 h-6" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-primary">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Info Alerts</p>
                <p className="text-3xl font-bold text-primary">8</p>
                <p className="text-xs text-gray-500 mt-1">Last 24 hours</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Info className="text-primary text-xl w-6 h-6" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Resolved</p>
                <p className="text-3xl font-bold text-green-600">23</p>
                <p className="text-xs text-gray-500 mt-1">Last 24 hours</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="text-green-600 text-xl w-6 h-6" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Alerts Panel */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">Recent Alerts & Notifications</h2>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleFilterClick("All")}
                    className={`px-3 py-1 rounded-md text-sm ${activeFilter === "All" ? "bg-primary text-white" : "bg-gray-100 text-gray-600"}`}
                  >
                    All
                  </button>
                  <button 
                    onClick={() => handleFilterClick("Critical")}
                    className={`px-3 py-1 rounded-md text-sm ${activeFilter === "Critical" ? "bg-primary text-white" : "bg-gray-100 text-gray-600"}`}
                  >
                    Critical
                  </button>
                  <button 
                    onClick={() => handleFilterClick("Today")}
                    className={`px-3 py-1 rounded-md text-sm ${activeFilter === "Today" ? "bg-primary text-white" : "bg-gray-100 text-gray-600"}`}
                  >
                    Today
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-6 space-y-4 max-h-[500px] overflow-y-auto">
              <div className="flex items-start space-x-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="text-white text-sm w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-800">Critical Speed Violation</h4>
                    <span className="text-xs text-gray-500">2 min ago</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Vehicle-001 exceeded speed limit by 35 km/h on Highway Route 15</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span><Car className="w-3 h-3 mr-1 inline" />Vehicle-001</span>
                    <span><Gauge className="w-3 h-3 mr-1 inline" />95 km/h</span>
                    <span><MapPin className="w-3 h-3 mr-1 inline" />Highway Route 15</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Battery className="text-white text-sm w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-800">Critical Battery Level</h4>
                    <span className="text-xs text-gray-500">5 min ago</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Vehicle-003 battery level critically low at 8%</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span><Car className="w-3 h-3 mr-1 inline" />Vehicle-003</span>
                    <span><Battery className="w-3 h-3 mr-1 inline" />8%</span>
                    <span><MapPin className="w-3 h-3 mr-1 inline" />Industrial Zone</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-white text-sm w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-800">Geofence Violation</h4>
                    <span className="text-xs text-gray-500">12 min ago</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Vehicle-002 exited authorized zone without permission</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span><Car className="w-3 h-3 mr-1 inline" />Vehicle-002</span>
                    <span><Shield className="w-3 h-3 mr-1 inline" />Zone-A</span>
                    <span><Clock className="w-3 h-3 mr-1 inline" />12:45 PM</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="w-10 h-10 bg-yellow-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="text-white text-sm w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-800">Extended Idle Time</h4>
                    <span className="text-xs text-gray-500">25 min ago</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Vehicle-004 has been idle for over 2 hours at current location</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span><Car className="w-3 h-3 mr-1 inline" />Vehicle-004</span>
                    <span><Clock className="w-3 h-3 mr-1 inline" />2h 15m</span>
                    <span><MapPin className="w-3 h-3 mr-1 inline" />Parking Lot C</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Info className="text-white text-sm w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-800">Route Deviation</h4>
                    <span className="text-xs text-gray-500">35 min ago</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Vehicle-005 deviated from planned route by 2.5 km</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span><Car className="w-3 h-3 mr-1 inline" />Vehicle-005</span>
                    <span><Route className="w-3 h-3 mr-1 inline" />Route-B</span>
                    <span><Ruler className="w-3 h-3 mr-1 inline" />2.5 km</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="text-white text-sm w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-800">Alert Resolved</h4>
                    <span className="text-xs text-gray-500">1 hour ago</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">Vehicle-001 speed violation alert has been acknowledged and resolved</p>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                    <span><Car className="w-3 h-3 mr-1 inline" />Vehicle-001</span>
                    <span><User className="w-3 h-3 mr-1 inline" />Admin User</span>
                    <span><CheckCircle className="w-3 h-3 mr-1 inline" />Resolved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alert Categories & Quick Actions */}
          <div className="space-y-6">
            {/* Alert Categories */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Alert Categories</h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <Gauge className="text-red-600 w-4 h-4" />
                    <span className="text-sm font-medium">Speed Violations</span>
                  </div>
                  <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs">3</span>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <MapPin className="text-yellow-600 w-4 h-4" />
                    <span className="text-sm font-medium">Geofence Alerts</span>
                  </div>
                  <span className="bg-yellow-600 text-white px-2 py-1 rounded-full text-xs">5</span>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <Battery className="text-red-600 w-4 h-4" />
                    <span className="text-sm font-medium">Battery Alerts</span>
                  </div>
                  <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs">2</span>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <Wifi className="text-gray-400 w-4 h-4" />
                    <span className="text-sm font-medium">Connection Issues</span>
                  </div>
                  <span className="bg-gray-400 text-white px-2 py-1 rounded-full text-xs">1</span>
                </div>
                
                <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <Clock className="text-yellow-600 w-4 h-4" />
                    <span className="text-sm font-medium">Idle Time</span>
                  </div>
                  <span className="bg-yellow-600 text-white px-2 py-1 rounded-full text-xs">4</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Quick Actions</h3>
              </div>
              <div className="p-4 space-y-3">
                <button className="w-full flex items-center justify-center space-x-2 p-3 bg-primary text-white rounded-lg hover:bg-blue-600 transition-colors">
                  <Bell className="w-4 h-4" />
                  <span>Mark All as Read</span>
                </button>
                
                <button className="w-full flex items-center justify-center space-x-2 p-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Download className="w-4 h-4" />
                  <span>Export Alert Report</span>
                </button>
                
                <button className="w-full flex items-center justify-center space-x-2 p-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  <Settings className="w-4 h-4" />
                  <span>Alert Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AlertSummary;
