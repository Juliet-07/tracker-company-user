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
import FuelReport from "./pages/Reports/FuelReport";
import EventsReport from "./pages/Reports/Events";
import SummaryReport from "./pages/Reports/Summary";
import Reports from "./pages/Reports/index";
import Transactions from "./pages/Transactions/index";
import ProfileSettings from "./pages/ProfileSettings";
import AppLayout from "./components/AppLayout";
import NotFound from "./pages/NotFound";
import Geofences from "./pages/Geofences";
import Reminders from "./pages/Reminders/index";

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
            <Route path="/reports" element={<Reports />} />
            <Route path="/fuel-report" element={<FuelReport />} />
            <Route path="/reports/events" element={<EventsReport />} />
            <Route path="/reports/summary" element={<SummaryReport />} />
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
