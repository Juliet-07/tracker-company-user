import { useState } from "react";
import { X, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import axiosInstance from "@/api/axios";
import { useQuery } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AddDriverModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: any) => void;
  vehicles?: string[];
}

const defaultVehicles = ["Vehicle-001", "Vehicle-002", "Vehicle-003"];

export const AddDriverModal: React.FC<AddDriverModalProps> = ({
  open,
  onClose,
  onSubmit,
  vehicles = defaultVehicles,
}) => {
  const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;
  const { handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const initialValue = {
    id: "",
    attributes: {},
    name: "",
    uniqueId: "",
    licenseNo: "",
    phone: "",
    companyId: 0,
    assignedVehicleId: 0,
  };
  const [formData, setFormData] = useState(initialValue);

  const {
    id,
    attributes,
    name,
    uniqueId,
    licenseNo,
    phone,
    companyId,
    assignedVehicleId,
  } = formData;

  const fetchDevices = async () => {
    const res = await axiosInstance.get(`${apiURL}/devices`, {
      withCredentials: true,
    });
    console.log(res.data, "response");
    return res.data;
  };

  const {
    data: devices = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["devices"],
    queryFn: fetchDevices,
    staleTime: 5 * 60 * 1000,
  });

  // Handle basic input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddDriver = async () => {
    try {
      setLoading(true);
      const url = `${apiURL}/drivers`;

      const response = await axiosInstance.post(url, formData, {
        withCredentials: true,
      });

      console.log(response, "response from adding driver");

      toast.success("Driver Successfully Added");
      setFormData(initialValue);
    } catch (err: any) {
      const message = err?.response?.data?.message || "Something went wrong";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <>
      <ToastContainer />
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
          <div className="px-6 py-2 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">
                Add New Driver
              </h2>
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={onClose}
                aria-label="Close"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
          </div>
          <form
            className="p-6 space-y-4"
            onSubmit={handleSubmit(handleAddDriver)}
          >
            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter full name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Driver ID
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="52147898996114"
                  name="uniqueId"
                  value={uniqueId}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  License Number
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="DL123456"
                  name="licenseNo"
                  value={licenseNo}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="+1234567890"
                  name="phone"
                  value={phone}
                  onChange={handleChange}
                />
              </div>
              {/* <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="driver@example.com"
              />
            </div> */}

              {/* <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Experience (Years)
              </label>
              <input
                type="number"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="5"
              />
            </div> */}
              <div>
                <Label htmlFor="devices" className="mb-2 block">
                  Assign Device <span className="text-red-500">*</span>
                </Label>
                <Select
                  required
                  value={
                    assignedVehicleId ? String(assignedVehicleId) : undefined
                  }
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      assignedVehicleId: Number(value),
                    }))
                  }
                >
                  <SelectTrigger id="devices">
                    <SelectValue placeholder="Choose a device to assign to driver" />
                  </SelectTrigger>
                  <SelectContent>
                    {devices.map((device: any) => (
                      <SelectItem key={device.id} value={String(device.id)}>
                        {device.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status
              </label>
              <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>Active</option>
                <option>On Break</option>
                <option>Off Duty</option>
              </select>
            </div> */}
            </div>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Shift Start
              </label>
              <input
                type="time"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Shift End
              </label>
              <input
                type="time"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div> */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center"
              >
                <Plus className="mr-2 h-5 w-5" />
                {loading ? "Submitting" : "Add Driver"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddDriverModal;
