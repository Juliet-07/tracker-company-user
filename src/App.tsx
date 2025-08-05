import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Devices from "./pages/Devices/Devices";
import DeviceDetails from "./pages/Devices/DeviceDetails";
import Drivers from "./pages/Drivers";
import LiveTracker from "./pages/LiveTracker";
import RouteHistory from "./pages/RouteHistory";
import EventAlerts from "./pages/EventAlerts";
import Reports from "./pages/Reports";
import Transactions from "./pages/Transactions/index";
import ProfileSettings from "./pages/ProfileSettings";
import AppLayout from "./components/AppLayout";
import NotFound from "./pages/NotFound";
import Geofences from "./pages/Geofences";
import Reminders from "./pages/Reminders";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/devices" element={<Devices />} />
            <Route path="/devices/:id" element={<DeviceDetails />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/live-tracker" element={<LiveTracker />} />
            <Route path="/route-history" element={<RouteHistory />} />
            <Route path="/event-alerts" element={<EventAlerts />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/geofences" element={<Geofences />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/reminders" element={<Reminders />} />
            <Route path="/profile-settings" element={<ProfileSettings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
