import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import {
  Wind,
  Home,
  Car,
  MapPin,
  Bell,
  BarChart3,
  User,
  ChevronDown,
  Shield,
  LogOut,
  X,
  Navigation,
  AlertTriangle,
  Users,
  BarChart2,
  MapPinCheck,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import Logo from "../assets/logo.svg";

const navItems = [
  {
    icon: Home,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Car,
    label: "My Devices",
    href: "/devices",
  },
  {
    icon: Users,
    label: "Drivers",
    href: "/drivers",
  },
  {
    icon: Navigation,
    label: "Live Tracker",
    href: "/live-tracker",
  },
  {
    icon: MapPinCheck,
    label: "Route History",
    href: "/route-history",
  },
  {
    icon: Bell,
    label: "Event Alerts",
    href: "/event-alerts",
  },
  {
    icon: BarChart3,
    label: "Reports",
    href: "/reports",
  },
  {
    icon: MapPin,
    label: "Geofences",
    href: "/geofences",
  },
  {
    icon: BarChart2,
    label: "Transactions",
    href: "/transactions",
  },
  {
    icon: User,
    label: "Profile Settings",
    href: "/profile-settings",
  },
];

const AppSidebar = () => {
  const { state, setOpenMobile } = useSidebar();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isCollapsed = state === "collapsed" && !isMobile;

  const handleSignOut = () => {
    console.log("Signing out...");
    navigate("/login");
  };

  const handleMobileNavClick = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };

  return (
    <Sidebar
      className="bg-primary text-white border-r-0 [&[data-mobile=true]]:bg-white [&[data-mobile=true]]:text-gray-800"
      collapsible="icon"
    >
      <SidebarContent className="flex flex-col p-0 bg-primary [&[data-mobile=true]]:bg-white">
        <SidebarHeader className="p-4 border-b border-white/20 bg-primary [&[data-mobile=true]]:bg-white [&[data-mobile=true]]:border-gray-200">
          <div className="flex items-center justify-between">
            {/* <Link to="/dashboard" className="flex items-center space-x-2" onClick={handleMobileNavClick}>
              <Wind className={`text-white [&[data-mobile=true]]:text-white ${isCollapsed ? 'h-6 w-6' : 'h-7 w-7'}`} />
              {(!isCollapsed || isMobile) && <span className="text-xl font-bold text-white [&[data-mobile=true]]:text-white">eKaze</span>}
            </Link> */}
            <Link
              to="/dashboard"
              className="flex items-center space-x-2"
              onClick={handleMobileNavClick}
            >
              {/* <Wind
                className={`text-white [&[data-mobile=true]]:text-white ${
                  isCollapsed ? "h-6 w-6" : "h-7 w-7"
                }`}
              /> */}
              {(!isCollapsed || isMobile) && (
                <img src={Logo} className="w-[100px]" />
              )}
            </Link>
            {isMobile && (
              <button
                onClick={handleMobileNavClick}
                className="p-2 rounded-md hover:bg-white/20 text-white"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </SidebarHeader>
        <nav className="flex-grow mt-4 px-2 bg-primary [&[data-mobile=true]]:bg-white">
          <SidebarMenu>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className={`justify-start text-base hover:bg-white/20 data-[active=true]:bg-white/20 data-[active=true]:hover:bg-white/30 text-white [&[data-mobile=true]]:text-gray-800 [&[data-mobile=true]]:hover:bg-gray-100 [&[data-mobile=true]]:data-[active=true]:bg-gray-100 py-3 ${
                      isCollapsed ? "px-2 justify-center" : "px-4"
                    }`}
                    tooltip={
                      isCollapsed && !isMobile
                        ? {
                            children: item.label,
                            side: "right",
                            align: "center",
                          }
                        : undefined
                    }
                  >
                    <Link
                      to={item.href}
                      className={`flex items-center ${
                        isCollapsed
                          ? "justify-center py-3"
                          : "space-x-3 py-[22px]"
                      }`}
                      onClick={handleMobileNavClick}
                    >
                      <item.icon
                        className={isCollapsed ? "h-6 w-6" : "h-5 w-5"}
                      />
                      {(!isCollapsed || isMobile) && <span>{item.label}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </nav>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
