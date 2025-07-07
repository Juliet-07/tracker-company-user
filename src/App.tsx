
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Devices from "./pages/Devices";
import DeviceDetails from "./pages/DeviceDetails";
import LiveTracker from "./pages/LiveTracker";
import RouteHistory from "./pages/RouteHistory";
import EventAlerts from "./pages/EventAlerts";
import AlertSummary from "./pages/AlertSummary";
import Reports from "./pages/Reports";
import ProfileSettings from "./pages/ProfileSettings";
import AppLayout from "./components/AppLayout";
import NotFound from "./pages/NotFound";

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
            <Route path="/live-tracker" element={<LiveTracker />} />
            <Route path="/route-history" element={<RouteHistory />} />
            <Route path="/event-alerts" element={<EventAlerts />} />
            <Route path="/alert-summary" element={<AlertSummary />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/profile-settings" element={<ProfileSettings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
