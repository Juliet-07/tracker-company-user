import { useState } from "react";
import axiosInstance from "@/api/axios.ts";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Edit, Mail, MessageSquare, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReminderModal from "./AddReminder";

const statusStyles = {
  active: "bg-green-100 text-green-800",
  "due-soon": "bg-yellow-100 text-yellow-800",
  overdue: "bg-red-100 text-red-800",
};

const Reminders: React.FC = () => {
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [reminderToDelete, setReminderToDelete] = useState(null);

  // Fetch devices
  const fetchDevices = async () => {
    const res = await axiosInstance.get(`/devices`, { withCredentials: true });
    return res.data;
  };

  const { data: devices = [] } = useQuery({
    queryKey: ["devices"],
    queryFn: fetchDevices,
    staleTime: 5 * 60 * 1000,
  });

  // Fetch reminders
  const fetchReminders = async () => {
    const res = await axiosInstance.get("/reminders?all=true", { withCredentials: true });
    return res.data;
  };

  const {
    data: reminders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["reminders"],
    queryFn: fetchReminders,
    staleTime: 5 * 60 * 1000,
  });

  // Mutation: Delete reminder
  // const deleteMutation = useMutation(
  //   (id: number) =>
  //     axiosInstance.delete(`/reminder/${id}`, { withCredentials: true }),
  //   {
  //     onSuccess: () => {
  //       queryClient.invalidateQueries(["reminders"]);
  //       setDeleteConfirmOpen(false);
  //       setReminderToDelete(null);
  //     },
  //   }
  // );

  // Handle open add modal
  const openAddModal = () => {
    setEditingReminder(null);
    setIsModalOpen(true);
  };

  // Handle open edit modal
  const openEditModal = (reminder) => {
    setEditingReminder(reminder);
    setIsModalOpen(true);
  };

  // Handle close modal
  const closeReminderModal = () => {
    setIsModalOpen(false);
    setEditingReminder(null);
  };

  // Handle delete confirmation
  const handleDeleteClick = (id) => {
    setReminderToDelete(id);
    setDeleteConfirmOpen(true);
  };

  // const confirmDelete = () => {
  //   if (reminderToDelete) {
  //     deleteMutation.mutate(reminderToDelete);
  //   }
  // };

  const cancelDelete = () => {
    setDeleteConfirmOpen(false);
    setReminderToDelete(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Delete Confirmation Dialog */}
      {/* {deleteConfirmOpen && (
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
                disabled={deleteMutation.isLoading}
              >
                {deleteMutation.isLoading ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )} */}

      {/* Reminder Modal */}
      <ReminderModal
        isOpen={isModalOpen}
        onClose={closeReminderModal}
        reminder={editingReminder}
        devices={devices}
      />

      <div
        id="header"
        className="bg-white shadow-sm border-b border-gray-200 px-6 py-4"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">
            Service Reminders
          </h1>
          <Button
            className="flex items-center gap-2 whitespace-nowrap"
            onClick={openAddModal}
          >
            <Plus className="h-4 w-4" />
            Add New Reminder
          </Button>
        </div>
      </div>

      <main className="flex-1 p-6 overflow-auto">
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
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
                      {reminder.description}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      Vehicle: {reminder.vehicleId}{" "}
                      {/* Adjust this if you have vehicle name */}
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
                        : "bg-purple-100 text-purple-800"
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
                      {new Date(reminder.dueDate).toLocaleDateString()}
                    </span>
                  </div>
                )}

                {reminder.dueMileage && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Due at:
                    </span>
                    <span className="text-sm font-medium">
                      {reminder.dueMileage}
                    </span>
                  </div>
                )}

                {reminder.mileageAlertBefore && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Alert km Before:
                    </span>
                    <span className="text-sm">
                      {reminder.mileageAlertBefore}
                    </span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Alert Before:
                  </span>
                  <span className="text-sm">{reminder.alertBefore}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      statusStyles[reminder.status] || ""
                    }`}
                  >
                    {reminder.status === "active"
                      ? "Active"
                      : reminder.status === "due-soon"
                      ? "Due Soon"
                      : "Overdue"}
                  </span>
                </div>

                <div className="pt-2 flex gap-2">
                  {reminder.notifyWeb && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded flex items-center gap-1">
                      <Globe className="h-3 w-3" /> Web
                    </span>
                  )}
                  {reminder.notifyEmail && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded flex items-center gap-1">
                      <Mail className="h-3 w-3" /> Email
                    </span>
                  )}
                  {reminder.notifySms && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded flex items-center gap-1">
                      <MessageSquare className="h-3 w-3" /> SMS
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Reminders;
