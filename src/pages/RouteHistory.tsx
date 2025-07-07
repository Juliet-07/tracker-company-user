
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Play, Pause, Square, Download, Route, Clock, Gauge, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

const RouteHistory = () => {
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState("All Vehicles");
  const [startDate, setStartDate] = useState("2024-06-01");
  const [endDate, setEndDate] = useState("2024-06-14");
  const [startTime, setStartTime] = useState("00:00");
  const [endTime, setEndTime] = useState("23:59");
  const [playbackSpeed, setPlaybackSpeed] = useState("1x");
  const [playbackProgress, setPlaybackProgress] = useState([45]);
  
  const [eventFilters, setEventFilters] = useState({
    allEvents: true,
    engineStartStop: false,
    overspeed: false,
    geofence: false
  });

  const handleEventFilterChange = (filterName: string, checked: boolean) => {
    setEventFilters(prev => ({
      ...prev,
      [filterName]: checked
    }));
  };

  const handleSearchHistory = () => {
    console.log('Searching history with current filters...');
  };

  const handlePlayRoute = () => {
    console.log('Playing route...');
  };

  const handlePauseRoute = () => {
    console.log('Pausing route...');
  };

  const handleStopRoute = () => {
    console.log('Stopping route...');
    setPlaybackProgress([0]);
  };

  const timelineEvents = [
    {
      id: 1,
      type: "Engine Started",
      time: "08:15:23",
      location: "Main Office Parking",
      details: "Speed: 0 km/h → 15 km/h",
      color: "bg-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-500",
      icon: Play
    },
    {
      id: 2,
      type: "Speed Alert",
      time: "10:32:45",
      location: "Exceeded speed limit on Highway A1",
      details: "Speed: 85 km/h (Limit: 70 km/h)",
      color: "bg-yellow-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-500",
      icon: Gauge
    },
    {
      id: 3,
      type: "Geofence Entry",
      time: "12:18:12",
      location: "Entered Customer Zone - Downtown",
      details: "Duration: 2h 45m",
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-500",
      icon: MapPin
    },
    {
      id: 4,
      type: "Vehicle Stopped",
      time: "15:03:28",
      location: "Client Meeting Point",
      details: "Stop duration: 45 minutes",
      color: "bg-gray-400",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-400",
      icon: Pause
    },
    {
      id: 5,
      type: "Engine Stopped",
      time: "17:45:10",
      location: "Main Office Parking",
      details: "Total distance: 127 km",
      color: "bg-red-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-500",
      icon: Square
    }
  ];

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
            <h1 className="text-2xl font-semibold text-gray-800">Route History</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
          {/* Filter Panel */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Search Filters</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle</label>
                <Select value={vehicle} onValueChange={setVehicle}>
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All Vehicles">All Vehicles</SelectItem>
                    <SelectItem value="Vehicle-001">Vehicle-001</SelectItem>
                    <SelectItem value="Vehicle-002">Vehicle-002</SelectItem>
                    <SelectItem value="Vehicle-003">Vehicle-003</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <div className="space-y-2">
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full"
                  />
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
                <div className="space-y-2">
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full"
                  />
                  <Input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center space-x-2">
                    <Checkbox
                      checked={eventFilters.allEvents}
                      onCheckedChange={(checked) => handleEventFilterChange('allEvents', checked as boolean)}
                    />
                    <span>All Events</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <Checkbox
                      checked={eventFilters.engineStartStop}
                      onCheckedChange={(checked) => handleEventFilterChange('engineStartStop', checked as boolean)}
                    />
                    <span>Engine Start/Stop</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <Checkbox
                      checked={eventFilters.overspeed}
                      onCheckedChange={(checked) => handleEventFilterChange('overspeed', checked as boolean)}
                    />
                    <span>Overspeed</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <Checkbox
                      checked={eventFilters.geofence}
                      onCheckedChange={(checked) => handleEventFilterChange('geofence', checked as boolean)}
                    />
                    <span>Geofence</span>
                  </label>
                </div>
              </div>
              
              <Button onClick={handleSearchHistory} className="w-full bg-primary text-white hover:bg-blue-600">
                <Search className="mr-2 h-4 w-4" />
                Search History
              </Button>
            </div>
          </div>

          {/* Map & Timeline Section */}
          <div className="lg:col-span-3 space-y-6">
            {/* Map Section */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">Route Replay</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Vehicle-001</span>
                  <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full">June 14, 2024</span>
                </div>
              </div>
              <div className="h-[400px] bg-gray-100 relative">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://storage.googleapis.com/uxpilot-auth.appspot.com/69dd6c34e8-639f19c961777e5520c1.png" 
                  alt="GPS tracking historical route replay map with vehicle path timeline, route markers and waypoints" 
                />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-white p-4 rounded-lg shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Route Playback</span>
                      <span className="text-xs text-gray-500">14:32:15 - June 14, 2024</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Button size="sm" onClick={handlePlayRoute} className="p-2 bg-primary text-white hover:bg-blue-600">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={handlePauseRoute} className="p-2">
                        <Pause className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={handleStopRoute} className="p-2">
                        <Square className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 mx-4">
                        <Slider
                          value={playbackProgress}
                          onValueChange={setPlaybackProgress}
                          max={100}
                          step={1}
                          className="w-full"
                        />
                      </div>
                      <Select value={playbackSpeed} onValueChange={setPlaybackSpeed}>
                        <SelectTrigger className="w-16">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1x">1x</SelectItem>
                          <SelectItem value="2x">2x</SelectItem>
                          <SelectItem value="5x">5x</SelectItem>
                          <SelectItem value="10x">10x</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline & Events */}
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Event Timeline</h3>
                <Button variant="ghost" className="text-primary text-sm hover:underline">
                  <Download className="mr-2 h-4 w-4" />
                  Export Data
                </Button>
              </div>
              <div className="p-4">
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {timelineEvents.map((event) => {
                    const IconComponent = event.icon;
                    return (
                      <div key={event.id} className={`flex items-start space-x-4 p-3 border-l-4 ${event.borderColor} ${event.bgColor} rounded-r-lg`}>
                        <div className={`w-10 h-10 ${event.color} rounded-full flex items-center justify-center text-white text-sm`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-800">{event.type}</span>
                            <span className="text-sm text-gray-500">{event.time}</span>
                          </div>
                          <p className="text-sm text-gray-600">{event.location}</p>
                          <p className="text-xs text-gray-500">{event.details}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Trip Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Distance</p>
                    <p className="text-xl font-bold text-gray-800">127 km</p>
                  </div>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Route className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Trip Duration</p>
                    <p className="text-xl font-bold text-gray-800">9h 30m</p>
                  </div>
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Max Speed</p>
                    <p className="text-xl font-bold text-gray-800">85 km/h</p>
                  </div>
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Gauge className="h-5 w-5 text-yellow-600" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Stops</p>
                    <p className="text-xl font-bold text-gray-800">5</p>
                  </div>
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-red-600" />
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

export default RouteHistory;
