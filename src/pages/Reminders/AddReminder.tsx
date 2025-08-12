import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/api/axios.ts";
import { Calendar, Bell, Trash2, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface Device {
  id: number;
  name: string;
}

interface Reminder {
  id?: number;
  type: string;
  vehicleId: number;
  vehicleIds: number[];
  description: string;
  dueDate?: string;
  dueMileage?: number;
  alertBefore?: number;
  mileageAlertBefore?: number;
  notifyWeb: boolean;
  notifyEmail: boolean;
  notifySms: boolean;
  completed: boolean;
  completedDate?: string;
  companyId: number | null;
}

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  reminder: Reminder | null;
  devices: Device[];
}

const ReminderModal: React.FC<ReminderModalProps> = ({
  isOpen,
  onClose,
  reminder,
  devices,
}) => {
  const isEditMode = !!reminder;
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    vehicleId: reminder?.vehicleId || 0,
    type: reminder?.type || "date",
    title: reminder?.description || "",
    dueDate: reminder?.dueDate || "",
    dueAt: reminder?.dueMileage?.toString() || "",
    current: reminder?.mileageAlertBefore?.toString() || "",
    alertBefore: reminder?.alertBefore?.toString() || "7",
    notifyWeb: reminder?.notifyWeb ?? true,
    notifyEmail: reminder?.notifyEmail ?? false,
    notifySms: reminder?.notifySms ?? false,
  });

  const createReminder = async (payload: Reminder) => {
    const res = await axiosInstance.post("/reminders", payload, {
      withCredentials: true,
    });
    return res.data;
  };

  const updateReminder = async (payload: Reminder) => {
    const res = await axiosInstance.put(`/reminder/${payload.id}`, payload, {
      withCredentials: true,
    });
    return res.data;
  };

  const mutation = useMutation({
    mutationFn: (payload: Reminder) =>
      isEditMode ? updateReminder(payload) : createReminder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["reminders"]);
      onClose();
    },
  });

  const handleSubmit = () => {
    const payload: Reminder = {
      id: reminder?.id,
      vehicleId: Number(formData.vehicleId),
      vehicleIds: [Number(formData.vehicleId)], // single selection for now
      type: formData.type,
      description: formData.title,
      dueDate:
        formData.type === "date" && formData.dueDate
          ? new Date(formData.dueDate).toISOString()
          : undefined,
      dueMileage:
        formData.type === "odometer" ? Number(formData.dueAt) : undefined,
      alertBefore: Number(formData.alertBefore),
      mileageAlertBefore:
        formData.type === "odometer" ? Number(formData.current) : undefined,
      notifyWeb: formData.notifyWeb,
      notifyEmail: formData.notifyEmail,
      notifySms: formData.notifySms,
      completed: false,
      companyId: null,
    };
    console.log(payload, "checking if this works");
    // mutation.mutate(payload);
  };

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">
              {isEditMode ? "Edit Reminder" : "Add New Reminder"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Service Name */}
            <div>
              <Label>Service Name</Label>
              <Input
                type="text"
                placeholder="e.g., Oil Change, Tire Rotation"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
              />
            </div>

            {/* Vehicle Selection */}
            <div>
              <Label>Select Vehicle</Label>
              <Select
                value={formData.vehicleId ? String(formData.vehicleId) : ""}
                onValueChange={(value) =>
                  handleInputChange("vehicleId", Number(value))
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a vehicle" />
                </SelectTrigger>
                <SelectContent>
                  {devices.map((device) => (
                    <SelectItem key={device.id} value={String(device.id)}>
                      {device.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Reminder Type */}
            <div>
              <Label>Reminder Type</Label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="reminderType"
                    value="date"
                    checked={formData.type === "date"}
                    onChange={() => handleInputChange("type", "date")}
                  />
                  <span>By Date</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="reminderType"
                    value="odometer"
                    checked={formData.type === "odometer"}
                    onChange={() => handleInputChange("type", "odometer")}
                  />
                  <span>By Odometer</span>
                </label>
              </div>
            </div>

            {/* Date Options */}
            {formData.type === "date" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Due Date</Label>
                  <Input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) =>
                      handleInputChange("dueDate", e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <Label>Alert Days Before</Label>
                  <Input
                    type="number"
                    value={formData.alertBefore}
                    onChange={(e) =>
                      handleInputChange("alertBefore", e.target.value)
                    }
                  />
                </div>
              </div>
            )}

            {/* Odometer Options */}
            {formData.type === "odometer" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Odometer Interval (km)</Label>
                  <Input
                    type="number"
                    value={formData.dueAt}
                    onChange={(e) => handleInputChange("dueAt", e.target.value)}
                  />
                </div>
                <div>
                  <Label>Alert km Before</Label>
                  <Input
                    type="number"
                    value={formData.current}
                    onChange={(e) =>
                      handleInputChange("current", e.target.value)
                    }
                  />
                </div>
              </div>
            )}

            {/* Notification Preferences */}
            <div>
              <Label>Notification Methods</Label>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Bell className="h-4 w-4 text-primary" />
                    <span>Web Notifications</span>
                  </span>
                  <Switch
                    checked={formData.notifyWeb}
                    onCheckedChange={(checked) =>
                      handleInputChange("notifyWeb", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Edit className="h-4 w-4 text-primary" />
                    <span>Email Notifications</span>
                  </span>
                  <Switch
                    checked={formData.notifyEmail}
                    onCheckedChange={(checked) =>
                      handleInputChange("notifyEmail", checked)
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>SMS Notifications</span>
                  </span>
                  <Switch
                    checked={formData.notifySms}
                    onCheckedChange={(checked) =>
                      handleInputChange("notifySms", checked)
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-8">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isLoading}>
              {mutation.isLoading
                ? "Saving..."
                : isEditMode
                ? "Update Reminder"
                : "Create Reminder"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReminderModal;
