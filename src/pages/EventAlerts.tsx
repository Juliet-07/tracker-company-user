
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Gauge, MapPin, AlertTriangle, Car, Clock, Eye, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EventAlerts = () => {
  const [eventTypeFilter, setEventTypeFilter] = useState("All Events");
  const [deviceFilter, setDeviceFilter] = useState("All Devices");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold text-gray-800">Event Alerts</h1>
          </div>
        </div>
      </header>

      {/* Events Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Filter Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Event Type:</label>
              <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Events">All Events</SelectItem>
                  <SelectItem value="Overspeed">Overspeed</SelectItem>
                  <SelectItem value="Geofence Breach">Geofence Breach</SelectItem>
                  <SelectItem value="Low Battery">Low Battery</SelectItem>
                  <SelectItem value="Device Offline">Device Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Device:</label>
              <Select value={deviceFilter} onValueChange={setDeviceFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Devices">All Devices</SelectItem>
                  <SelectItem value="Vehicle-001">Vehicle-001</SelectItem>
                  <SelectItem value="Vehicle-002">Vehicle-002</SelectItem>
                  <SelectItem value="Vehicle-003">Vehicle-003</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">Date Range:</label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-auto"
              />
              <span className="text-gray-500">to</span>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-auto"
              />
            </div>
            <Button className="px-4 py-2 bg-primary text-white rounded-md text-sm hover:bg-blue-600 transition-colors">
              <Filter className="w-4 h-4 mr-2" />
              Apply Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Event Summary Cards */}
          <div className="lg:col-span-4 grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Events Today</p>
                  <p className="text-2xl font-bold text-gray-800">23</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Calendar className="text-gray-600 w-6 h-6" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Overspeed Events</p>
                  <p className="text-2xl font-bold text-red-600">12</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <Gauge className="text-red-600 w-6 h-6" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Geofence Breaches</p>
                  <p className="text-2xl font-bold text-yellow-600">8</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <MapPin className="text-yellow-600 w-6 h-6" />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Device Issues</p>
                  <p className="text-2xl font-bold text-gray-600">3</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="text-gray-600 w-6 h-6" />
                </div>
              </div>
            </div>
          </div>

          {/* Events List */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Recent Events</h3>
                <button className="text-primary text-sm hover:underline">Export Events</button>
              </div>
              <div className="divide-y divide-gray-200">
                <div className="p-4 hover:bg-gray-50">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Gauge className="text-red-600 w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-800">Overspeed Alert</h4>
                        <span className="text-xs text-gray-500">2 min ago</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Vehicle-001 exceeded speed limit (75 km/h in 60 km/h zone)</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span><Car className="w-3 h-3 mr-1 inline" />Vehicle-001</span>
                        <span><MapPin className="w-3 h-3 mr-1 inline" />Highway A1, Exit 15</span>
                        <span><Clock className="w-3 h-3 mr-1 inline" />14:32:15</span>
                      </div>
                    </div>
                    <button className="text-primary hover:bg-blue-50 p-2 rounded-lg">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-4 hover:bg-gray-50">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-yellow-600 w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-800">Geofence Exit</h4>
                        <span className="text-xs text-gray-500">8 min ago</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Vehicle-002 exited authorized zone "Downtown Area"</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span><Car className="w-3 h-3 mr-1 inline" />Vehicle-002</span>
                        <span><MapPin className="w-3 h-3 mr-1 inline" />Downtown Area Border</span>
                        <span><Clock className="w-3 h-3 mr-1 inline" />14:26:42</span>
                      </div>
                    </div>
                    <button className="text-primary hover:bg-blue-50 p-2 rounded-lg">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-4 hover:bg-gray-50">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Gauge className="text-red-600 w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-800">Overspeed Alert</h4>
                        <span className="text-xs text-gray-500">15 min ago</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Vehicle-003 exceeded speed limit (85 km/h in 50 km/h zone)</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span><Car className="w-3 h-3 mr-1 inline" />Vehicle-003</span>
                        <span><MapPin className="w-3 h-3 mr-1 inline" />City Center, Main St</span>
                        <span><Clock className="w-3 h-3 mr-1 inline" />14:19:23</span>
                      </div>
                    </div>
                    <button className="text-primary hover:bg-blue-50 p-2 rounded-lg">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-4 hover:bg-gray-50">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="text-gray-600 w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-800">Low Battery Warning</h4>
                        <span className="text-xs text-gray-500">22 min ago</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Vehicle-004 battery level dropped to 18%</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span><Car className="w-3 h-3 mr-1 inline" />Vehicle-004</span>
                        <span><MapPin className="w-3 h-3 mr-1 inline" />Parking Lot C</span>
                        <span><Clock className="w-3 h-3 mr-1 inline" />14:12:08</span>
                      </div>
                    </div>
                    <button className="text-primary hover:bg-blue-50 p-2 rounded-lg">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-4 hover:bg-gray-50">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="text-yellow-600 w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-gray-800">Geofence Entry</h4>
                        <span className="text-xs text-gray-500">35 min ago</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Vehicle-001 entered restricted zone "Industrial Area"</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span><Car className="w-3 h-3 mr-1 inline" />Vehicle-001</span>
                        <span><MapPin className="w-3 h-3 mr-1 inline" />Industrial Zone Gate</span>
                        <span><Clock className="w-3 h-3 mr-1 inline" />13:59:47</span>
                      </div>
                    </div>
                    <button className="text-primary hover:bg-blue-50 p-2 rounded-lg">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200 text-center">
                <button className="text-primary hover:underline text-sm">Load More Events</button>
              </div>
            </div>
          </div>

          {/* Device Summary Panel */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Event Summary by Device</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-800">Vehicle-001</span>
                    <span className="px-2 py-1 bg-red-600 text-white text-xs rounded-full">High Risk</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Overspeed Events:</span>
                      <span className="font-medium text-red-600">5</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Geofence Breaches:</span>
                      <span className="font-medium text-yellow-600">2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Event:</span>
                      <span className="font-medium text-gray-800">2 min ago</span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-800">Vehicle-002</span>
                    <span className="px-2 py-1 bg-yellow-600 text-white text-xs rounded-full">Medium Risk</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Overspeed Events:</span>
                      <span className="font-medium text-red-600">2</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Geofence Breaches:</span>
                      <span className="font-medium text-yellow-600">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Event:</span>
                      <span className="font-medium text-gray-800">8 min ago</span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-medium text-gray-800">Vehicle-003</span>
                    <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full">Low Risk</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Overspeed Events:</span>
                      <span className="font-medium text-red-600">1</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Geofence Breaches:</span>
                      <span className="font-medium text-yellow-600">0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Event:</span>
                      <span className="font-medium text-gray-800">15 min ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventAlerts;
