import { useState, useEffect } from "react";
import {
  Plus,
  Filter,
  Search,
  Calendar,
  Gauge,
  Bell,
  Trash2,
  Edit,
  Mail,
  MessageSquare,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface Reminder {
  id: string;
  title: string;
  vehicle: string;
  type: "date" | "odometer";
  dueDate?: string;
  dueAt?: string;
  current?: string;
  alertBefore: string;
  status: "active" | "due-soon" | "overdue";
  notifications: ("web" | "email" | "sms")[];
}

const statusStyles = {
  active: "bg-green-100 text-green-800",
  "due-soon": "bg-yellow-100 text-yellow-800",
  overdue: "bg-red-100 text-red-800",
};

const typeStyles = {
  date: "bg-blue-100 text-blue-800",
  odometer: "bg-purple-100 text-purple-800",
};

const initialReminders: Reminder[] = [
  {
    id: "1",
    title: "Oil Change",
    vehicle: "Toyota Camry",
    type: "odometer",
    dueAt: "50000",
    current: "48500",
    alertBefore: "1000",
    status: "due-soon",
    notifications: ["email", "sms"],
  },
  {
    id: "2",
    title: "Tire Rotation",
    vehicle: "Honda Civic",
    type: "date",
    dueDate: "2023-12-15",
    alertBefore: "7",
    status: "active",
    notifications: ["email"],
  },
  {
    id: "3",
    title: "Brake Inspection",
    vehicle: "Ford F-150",
    type: "odometer",
    dueAt: "60000",
    current: "62500",
    alertBefore: "1000",
    status: "overdue",
    notifications: ["web", "email", "sms"],
  },
];

interface ReminderModalProps {
  isOpen: boolean;
  onClose: () => void;
  reminder: Reminder | null;
  onSave: (reminder: Reminder) => void;
}

const ReminderModal: React.FC<ReminderModalProps> = ({
  isOpen,
  onClose,
  reminder,
  onSave,
}) => {
  const isEditMode = !!reminder;
  const [formData, setFormData] = useState({
    id: reminder?.id,
    title: reminder?.title || "",
    vehicle: reminder?.vehicle || "",
    type: reminder?.type || "date",
    dueDate: reminder?.dueDate || "",
    dueAt: reminder?.dueAt || "",
    current: reminder?.current || "",
    alertBefore: reminder?.alertBefore || "7",
    notifications: reminder?.notifications || [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newReminder: Reminder = {
      id: formData.id || Date.now().toString(),
      title: formData.title,
      vehicle: formData.vehicle,
      type: formData.type,
      dueDate: formData.dueDate,
      dueAt: formData.dueAt,
      current: formData.current,
      alertBefore: formData.alertBefore,
      status: "active",
      notifications: formData.notifications,
    };

    onSave(newReminder);
    onClose();
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
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Service Name
              </Label>
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
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Select Vehicle
              </Label>
              <Select
                value={formData.vehicle}
                onValueChange={(value) => handleInputChange("vehicle", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a vehicle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Toyota Camry">Toyota Camry</SelectItem>
                  <SelectItem value="Honda Civic">Honda Civic</SelectItem>
                  <SelectItem value="Ford F-150">Ford F-150</SelectItem>
                  <SelectItem value="Tesla Model 3">Tesla Model 3</SelectItem>
                  <SelectItem value="BMW X5">BMW X5</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Reminder Type */}
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Reminder Type
              </Label>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="dateType"
                    name="reminderType"
                    value="date"
                    checked={formData.type === "date"}
                    onChange={() => handleInputChange("type", "date")}
                    className="text-primary focus:ring-primary"
                  />
                  <Label htmlFor="dateType" className="text-sm">
                    By Date
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="odometerType"
                    name="reminderType"
                    value="odometer"
                    checked={formData.type === "odometer"}
                    onChange={() => handleInputChange("type", "odometer")}
                    className="text-primary focus:ring-primary"
                  />
                  <Label htmlFor="odometerType" className="text-sm">
                    By Odometer
                  </Label>
                </div>
              </div>
            </div>

            {/* Date Options */}
            <div
              className={`space-y-4 ${
                formData.type !== "date" ? "hidden" : ""
              }`}
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date
                  </Label>
                  <Input
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) =>
                      handleInputChange("dueDate", e.target.value)
                    }
                    required={formData.type === "date"}
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Alert Days Before
                  </Label>
                  <Input
                    type="number"
                    placeholder="7"
                    value={formData.alertBefore}
                    onChange={(e) =>
                      handleInputChange("alertBefore", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
            </div>

            {/* Odometer Options */}
            <div
              className={`space-y-4 ${
                formData.type !== "odometer" ? "hidden" : ""
              }`}
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Odometer Interval (km)
                  </Label>
                  <Input
                    type="number"
                    placeholder="10000"
                    value={formData.dueAt}
                    onChange={(e) => handleInputChange("dueAt", e.target.value)}
                    required={formData.type === "odometer"}
                  />
                </div>
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Alert km Before
                  </Label>
                  <Input
                    type="number"
                    placeholder="500"
                    value={formData.current}
                    onChange={(e) =>
                      handleInputChange("current", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Notification Methods
              </Label>
              <div className="space-y-3">
                {[
                  {
                    id: "web",
                    label: "Web Notifications",
                    icon: <Bell className="h-4 w-4 text-primary" />,
                    enabled: true,
                  },
                  {
                    id: "email",
                    label: "Email Notifications",
                    icon: <Edit className="h-4 w-4 text-primary" />,
                    enabled: false,
                  },
                  {
                    id: "sms",
                    label: "SMS Notifications",
                    icon: <Calendar className="h-4 w-4 text-primary" />,
                    enabled: false,
                  },
                ].map((method) => (
                  <div
                    key={method.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      {method.icon}
                      <Label
                        htmlFor={`notif-${method.id}`}
                        className="text-sm font-medium"
                      >
                        {method.label}
                      </Label>
                    </div>
                    <Switch
                      id={`notif-${method.id}`}
                      defaultChecked={method.enabled}
                      className="data-[state=checked]:bg-primary"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-8">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditMode ? "Update Reminder" : "Create Reminder"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Reminders: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState<Reminder | null>(null);
  const [reminders, setReminders] = useState<Reminder[]>(initialReminders);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [reminderToDelete, setReminderToDelete] = useState<string | null>(null);

  // Modal handlers
  const openAddModal = () => {
    setEditingReminder(null);
    setIsModalOpen(true);
  };

  const openEditModal = (reminder: Reminder) => {
    setEditingReminder(reminder);
    setIsModalOpen(true);
  };

  const closeReminderModal = () => {
    setIsModalOpen(false);
    setEditingReminder(null);
  };

  // Handle saving a reminder (add or update)
  const handleSaveReminder = (reminderData: Reminder) => {
    if (editingReminder) {
      // Update existing reminder
      setReminders(
        reminders.map((r) =>
          r.id === editingReminder.id
            ? { ...reminderData, id: editingReminder.id }
            : r
        )
      );
    } else {
      // Add new reminder
      setReminders([
        ...reminders,
        { ...reminderData, id: Date.now().toString() },
      ]);
    }
    closeReminderModal();
  };

  // Handle deleting a reminder
  const handleDeleteReminder = (id: string) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  // Delete confirmation handlers
  const handleDeleteClick = (id: string) => {
    setReminderToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (reminderToDelete) {
      handleDeleteReminder(reminderToDelete);
      setDeleteConfirmOpen(false);
      setReminderToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmOpen(false);
    setReminderToDelete(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Delete Confirmation Dialog */}
      {deleteConfirmOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-medium mb-4">Delete Reminder</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this reminder? This action cannot
              be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <Button type="button" variant="outline" onClick={cancelDelete}>
                Cancel
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={confirmDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Reminder Modal */}
      <ReminderModal
        isOpen={isModalOpen}
        onClose={closeReminderModal}
        reminder={editingReminder}
        onSave={handleSaveReminder}
      />
      <div
        id="header"
        className="bg-white shadow-sm border-b border-gray-200 px-6 py-4"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">
            Service Reminders
          </h1>
          <div className="flex items-center space-x-4"></div>
        </div>
      </div>
      <main className="flex-1 p-6 overflow-auto">
        <div className="mx-auto">
          {/* Action Bar */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <Button
                className="flex items-center gap-2 whitespace-nowrap"
                onClick={openAddModal}
              >
                <Plus className="h-4 w-4" />
                Add New Reminder
              </Button>

              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <Select>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="All Vehicles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Vehicles</SelectItem>
                    <SelectItem value="abc123">
                      Ford Transit - ABC123
                    </SelectItem>
                    <SelectItem value="xyz789">Honda Civic - XYZ789</SelectItem>
                    <SelectItem value="def456">
                      Toyota Camry - DEF456
                    </SelectItem>
                    <SelectItem value="ghi789">
                      Nissan Altima - GHI789
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select>
                  <SelectTrigger className="w-full sm:w-[150px]">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="due-soon">Due Soon</SelectItem>
                    <SelectItem value="overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full md:w-auto">
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-success rounded-full"></div>
                  <span className="text-muted-foreground">Active: 6</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-warning rounded-full"></div>
                  <span className="text-muted-foreground">Due Soon: 3</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-destructive rounded-full"></div>
                  <span className="text-muted-foreground">Overdue: 3</span>
                </div>
              </div>

              <div className="hidden sm:block h-6 w-px bg-border"></div>

              <div className="text-sm font-medium text-muted-foreground">
                Total Reminders:{" "}
                <span className="text-primary font-semibold">12</span>
              </div>
            </div>
          </div>

          {/* Reminders Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {reminders.map((reminder) => (
              <Card
                key={reminder.id}
                className={`border-0 border-l-4 ${
                  reminder.status === "active"
                    ? "border-success"
                    : reminder.status === "due-soon"
                    ? "border-warning"
                    : "border-destructive"
                }`}
              >
                <CardHeader className="p-6 pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">
                        {reminder.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Vehicle: {reminder.vehicle}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditModal(reminder)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDeleteClick(reminder.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Type:</span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        reminder.type === "date"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {reminder.type === "date" ? "By Date" : "By Odometer"}
                    </span>
                  </div>

                  {reminder.dueDate && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Due Date:
                      </span>
                      <span className="text-sm font-medium">
                        {reminder.dueDate}
                      </span>
                    </div>
                  )}

                  {reminder.dueAt && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Due at:
                      </span>
                      <span className="text-sm font-medium">
                        {reminder.dueAt}
                      </span>
                    </div>
                  )}

                  {reminder.current && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        Current:
                      </span>
                      <span className="text-sm">{reminder.current}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Alert Before:
                    </span>
                    <span className="text-sm">{reminder.alertBefore}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Status:
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        statusStyles[reminder.status]
                      }`}
                    >
                      {reminder.status === "active"
                        ? "Active"
                        : reminder.status === "due-soon"
                        ? "Due Soon"
                        : "Overdue"}
                    </span>
                  </div>

                  <div className="pt-2">
                    <div className="flex gap-2">
                      {reminder.notifications.includes("web") && (
                        <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded flex items-center gap-1">
                          <Globe className="h-3 w-3" /> Web
                        </span>
                      )}
                      {reminder.notifications.includes("email") && (
                        <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded flex items-center gap-1">
                          <Mail className="h-3 w-3" /> Email
                        </span>
                      )}
                      {reminder.notifications.includes("sms") && (
                        <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" /> SMS
                        </span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Reminders;
