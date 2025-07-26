import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Bell,
  LogOut,
  Home,
  MapPin,
  Car,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  History,
  FileText,
} from "lucide-react";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Logo from "../assets/logo_black.jpg";

const Header = () => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const { state } = useSidebar();
  const navigate = useNavigate();
  const isSidebarCollapsed = state === "collapsed";

  const user = {
    user_metadata: {
      full_name: "User",
    },
  };
  const primaryRole = "Fleet Owner";
  const userRoles = ["Fleet Owner", "Driver"];

  // User-focused notifications data
  const notifications1 = [
    {
      id: 1,
      type: "alert",
      title: "Speed Limit Exceeded",
      message:
        "Your vehicle TRK-001 exceeded speed limit on Highway 15 at 2:45 PM",
      time: "5 min ago",
      unread: true,
    },
    {
      id: 2,
      type: "warning",
      title: "Low Battery Alert",
      message:
        "Vehicle TRK-003 battery level is below 15% - charging recommended",
      time: "12 min ago",
      unread: true,
    },
    {
      id: 3,
      type: "success",
      title: "Route Completed",
      message:
        "Vehicle TRK-002 successfully completed delivery route to Downtown",
      time: "1 hour ago",
      unread: false,
    },
    {
      id: 4,
      type: "info",
      title: "Maintenance Reminder",
      message: "Vehicle TRK-001 is due for scheduled maintenance in 3 days",
      time: "2 hours ago",
      unread: false,
    },
    {
      id: 5,
      type: "alert",
      title: "Geofence Exit",
      message: "Vehicle TRK-004 has left the authorized delivery zone",
      time: "3 hours ago",
      unread: false,
    },
  ];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "alert":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return <Bell className="h-4 w-4 text-blue-500" />;
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    const names = name.split(" ");
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const handleSignOut = () => {
    console.log("Signing out...");
    navigate("/");
  };

  const handleMarkAllAsRead = () => {
    console.log("Marking all notifications as read");
  };

  const handleClearAll = () => {
    console.log("Clearing all notifications");
  };

  const fetchAllData = async () => {
    const [devicesRes, driversRes, notificationsRes] = await Promise.all([
      axiosInstance.get(`${apiURL}/devices`, { withCredentials: true }),
      axiosInstance.get(`${apiURL}/drivers`, { withCredentials: true }),
      axiosInstance.get(`${apiURL}/notifications`, { withCredentials: true }),
    ]);
    return {
      devices: devicesRes.data,
      drivers: driversRes.data,
      notifications: notificationsRes.data,
    };
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["all-data"],
    queryFn: fetchAllData,
    staleTime: 5 * 60 * 1000,
  });
  const devices = data?.devices ?? [];
  const drivers = data?.drivers ?? [];
  const notifications = data?.notifications ?? [];

  const unreadCount = notifications.filter((n) => n.unread).length;
  return (
    <header className="bg-white text-gray-800 px-4 md:px-6 py-3 border-b sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="hover:bg-gray-100" />

          {isSidebarCollapsed && (
            <Link to="/dashboard" className="flex items-center space-x-2">
              <img src={Logo} className="w-[100px]" />
            </Link>
          )}
        </div>

        <div className="flex items-center space-x-2 md:space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-gray-100"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-xs rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-96 p-0 rounded-lg">
              <div className="p-4 border-b flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">
                  Notifications
                </h3>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-7 px-2"
                    onClick={handleMarkAllAsRead}
                  >
                    Mark all read
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs h-7 px-2 text-red-500 hover:text-red-600"
                    onClick={handleClearAll}
                  >
                    Clear all
                  </Button>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <DropdownMenuItem
                    key={notification.id}
                    className="px-4 py-3 cursor-pointer hover:bg-gray-50 border-b last:border-b-0"
                  >
                    <div className="flex items-start gap-3 w-full">
                      <div className="p-2 bg-gray-50 rounded-lg flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4
                            className={`text-sm font-medium ${
                              notification.unread
                                ? "text-gray-900"
                                : "text-gray-600"
                            }`}
                          >
                            {notification.title}
                          </h4>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                          )}
                        </div>
                        <p
                          className={`text-xs mt-1 ${
                            notification.unread
                              ? "text-gray-700"
                              : "text-gray-500"
                          }`}
                        >
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>

              {/* <div className="p-3 border-t">
                <Button
                  variant="ghost"
                  className="w-full text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                >
                  View all notifications
                </Button>
              </div> */}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-2 cursor-pointer">
                <Avatar className="h-9 w-9 bg-[#52897d] cursor-pointer">
                  <AvatarFallback className="text-sm font-medium text-white bg-[#52897d]">
                    {getInitials(user?.user_metadata?.full_name)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 p-0 rounded-lg">
              <div className="p-4 flex items-center gap-4 border-b">
                <Avatar className="h-14 w-14 bg-amber-500">
                  <AvatarFallback className="text-xl font-medium text-white bg-[#52897d]">
                    {getInitials(user?.user_metadata?.full_name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {user?.user_metadata?.full_name || "User"}
                  </h3>
                  {/* <p className="text-[#52897d] font-medium">{primaryRole}</p>
                  {userRoles.length > 1 && (
                    <p className="text-xs text-gray-500">
                      +{userRoles.length - 1} more role
                      {userRoles.length > 2 ? "s" : ""}
                    </p>
                  )} */}
                  <p className="text-sm text-gray-500">
                    {devices?.length} vehicles • {drivers?.length} drivers
                  </p>
                </div>
              </div>

              <DropdownMenuItem
                asChild
                className="px-4 py-3 cursor-pointer hover:bg-gray-50"
              >
                <Link to="/dashboard">
                  <div className="flex items-center gap-3 text-base">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Home className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">
                        My Dashboard
                      </div>
                      <div className="text-xs text-gray-500">
                        View fleet overview & status
                      </div>
                    </div>
                  </div>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                asChild
                className="px-4 py-3 cursor-pointer hover:bg-gray-50"
              >
                <Link to="/devices">
                  <div className="flex items-center gap-3 text-base">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <Car className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">
                        My Vehicles
                      </div>
                      <div className="text-xs text-gray-500">
                        Manage your vehicle fleet
                      </div>
                    </div>
                  </div>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                asChild
                className="px-4 py-3 cursor-pointer hover:bg-gray-50"
              >
                <Link to="/live-tracker">
                  <div className="flex items-center gap-3 text-base">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <MapPin className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">
                        Live Tracking
                      </div>
                      <div className="text-xs text-gray-500">
                        Track vehicles in real-time
                      </div>
                    </div>
                  </div>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                asChild
                className="px-4 py-3 cursor-pointer hover:bg-gray-50"
              >
                <Link to="/route-history">
                  <div className="flex items-center gap-3 text-base">
                    <div className="p-2 bg-orange-50 rounded-lg">
                      <History className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">
                        Trip History
                      </div>
                      <div className="text-xs text-gray-500">
                        View past routes & journeys
                      </div>
                    </div>
                  </div>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                asChild
                className="px-4 py-3 cursor-pointer hover:bg-gray-50"
              >
                <Link to="/reports">
                  <div className="flex items-center gap-3 text-base">
                    <div className="p-2 bg-amber-50 rounded-lg">
                      <FileText className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">
                        My Reports
                      </div>
                      <div className="text-xs text-gray-500">
                        Vehicle performance reports
                      </div>
                    </div>
                  </div>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem
                asChild
                className="px-4 py-3 cursor-pointer hover:bg-gray-50"
              >
                <Link to="/event-alerts">
                  <div className="flex items-center gap-3 text-base">
                    <div className="p-2 bg-pink-50 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-pink-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">
                        Alerts & Events
                      </div>
                      <div className="text-xs text-gray-500">
                        Vehicle alerts & incidents
                      </div>
                    </div>
                  </div>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                asChild
                className="px-4 py-3 cursor-pointer hover:bg-gray-50"
              >
                <Link to="/profile-settings">
                  <div className="flex items-center gap-3 text-base">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <User className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">
                        Profile Settings
                      </div>
                      <div className="text-xs text-gray-500">
                        Update account preferences
                      </div>
                    </div>
                  </div>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              {/* <div className="relative">
                <div
                  className="px-4 py-3 cursor-pointer hover:bg-gray-50 flex items-center justify-between"
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                >
                  <div className="flex items-center gap-2 text-base">
                    <Globe size={18} />
                    <span className="text-gray-800">Language</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    {currentLanguage}
                  </div>
                </div>
                {isLanguageOpen && (
                  <div className="p-2">
                    {languages.map((lang) => (
                      <DropdownMenuItem
                        key={lang}
                        className={`text-sm ${
                          lang === currentLanguage
                            ? "font-medium bg-accent"
                            : ""
                        }`}
                        onClick={() => handleLanguageSelect(lang)}
                      >
                        {lang}
                      </DropdownMenuItem>
                    ))}
                  </div>
                )}
              </div> */}

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="px-4 py-3 cursor-pointer text-red-500 hover:!text-red-500 hover:!bg-red-50"
                onClick={handleSignOut}
              >
                <div className="flex items-center gap-3 text-base w-full">
                  <LogOut size={16} />
                  <span>Logout</span>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
export default Header;
