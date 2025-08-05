import React from "react";
import { Plus, X } from "lucide-react";

interface IncomeModalProps {
  incomeData: {
    id: number;
    driverId: number;
    amount: number;
    method: string;
    date: string;
    reference: string;
    companyId: number;
  };
  setIncomeData: React.Dispatch<
    React.SetStateAction<{
      driverId: number;
      amount: number;
      date: string;
    }>
  >;
  onClose: () => void;
  onSave: () => void;
  drivers: any[];
}

const IncomeModal: React.FC<IncomeModalProps> = ({
  incomeData,
  setIncomeData,
  onClose,
  onSave,
  drivers,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold text-gray-800">Add New Income</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="text-xl h-6 w-6" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Driver
            </label>
            <select
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary"
              value={incomeData.driverId || ""}
              onChange={(e) =>
                setIncomeData({
                  ...incomeData,
                  driverId: Number(e.target.value),
                })
              }
            >
              <option value="">Select Driver</option>
              {drivers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount (RWF)
            </label>
            <input
              type="number"
              placeholder="Amount"
              className="border p-2 w-full rounded"
              value={incomeData.amount || ""}
              onChange={(e) =>
                setIncomeData({ ...incomeData, amount: Number(e.target.value) })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              className="border p-2 w-full rounded"
              value={incomeData.date}
              onChange={(e) =>
                setIncomeData({ ...incomeData, date: e.target.value })
              }
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="flex-1 px-4 py-2 bg-primary text-white rounded-lg flex items-center justify-center hover:bg-blue-600"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Income
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IncomeModal;
