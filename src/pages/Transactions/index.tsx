import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import {
  fetchDevices,
  fetchDrivers,
  fetchPayments,
  fetchExpenses,
  addIncome,
  addExpense,
} from "@/api/finance";
import {
  ArrowUp,
  ArrowDown,
  Clock,
  ChartLine,
  Eye,
  Pencil,
  Plus,
} from "lucide-react";
import IncomeModal from "./IncomeModal";
import ExpenseModal from "./ExpenseModal";

const Transactions = () => {
  const [filters, setFilters] = useState({
    driverId: 0,
    vehicleId: 0,
    from: "",
    to: "",
  });

  const [incomeData, setIncomeData] = useState({
    id: null,
    driverId: 0,
    amount: 0,
    method: "income",
    date: "",
    reference: "",
    companyId: null,
  });
  const [expenseData, setExpenseData] = useState({
    id: null,
    vehicleId: 0,
    amount: 0,
    type: "expense",
    date: "",
    description: "",
    companyId: null,
  });

  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [transactions, setTransactions] = useState([]);

  // Queries for devices & drivers
  const { data: devices = [] } = useQuery({
    queryKey: ["devices"],
    queryFn: fetchDevices,
  });
  const { data: drivers = [] } = useQuery({
    queryKey: ["drivers"],
    queryFn: fetchDrivers,
  });

  // Mutations for add income/expense
  const incomeMutation = useMutation({
    mutationFn: addIncome,
    onSuccess: () => toast.success("Income added!"),
  });
  const expenseMutation = useMutation({
    mutationFn: addExpense,
    onSuccess: () => toast.success("Expense added!"),
  });

  const formatDateWithTime = (date: string) => {
    if (!date) return "";
    const currentTime = new Date();
    const timePart = currentTime.toISOString().split("T")[1];
    return `${date}T${timePart}`;
  };

  const handleFetchTransactions = async () => {
    const { driverId, vehicleId, from, to } = filters;

    // Validation
    if (!from || !to) {
      toast.error("Please select a date range");
      return;
    }

    if (driverId && vehicleId) {
      toast.error("Please select either a driver OR a vehicle, not both");
      return;
    }

    if (!driverId && !vehicleId) {
      toast.error("Please select a driver or a vehicle");
      return;
    }

    try {
      const fromWithTime = formatDateWithTime(from);
      const toWithTime = formatDateWithTime(to);
      let merged = [];

      if (driverId) {
        // Fetch payments
        const payments = await fetchPayments(
          driverId,
          fromWithTime,
          toWithTime
        );
        merged = payments.map((p: any) => ({
          date: new Date(p.date).toLocaleDateString(),
          time: new Date(p.date).toLocaleTimeString(),
          name:
            drivers.find((d) => d.id === p.driverId)?.name || "Unknown Driver",
          type: "Income",
          amount: p.amount,
        }));
      }

      if (vehicleId) {
        // Fetch expenses
        const expenses = await fetchExpenses(
          vehicleId,
          fromWithTime,
          toWithTime
        );
        merged = expenses.map((e: any) => ({
          date: new Date(e.date).toLocaleDateString(),
          time: new Date(e.date).toLocaleTimeString(),
          name:
            devices.find((d) => d.id === e.vehicleId)?.name ||
            "Unknown Vehicle",
          type: "Expense",
          amount: e.amount,
        }));
      }

      setTransactions(merged);
    } catch (error) {
      toast.error("Failed to fetch transactions");
    }
  };

  const handleAddIncome = () => incomeMutation.mutate(incomeData);
  const handleAddExpense = () => expenseMutation.mutate(expenseData);

  const totalIncome = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netProfit =
    totalIncome > 0 || totalExpense > 0 ? totalIncome - totalExpense : 0;
  return (
    <>
      <ToastContainer />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm flex justify-between">
          <h1 className="text-2xl font-bold">Transaction Records</h1>
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-lg flex items-center"
              onClick={() => setShowIncomeModal(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Income
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg flex items-center"
              onClick={() => setShowExpenseModal(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Expense
            </button>
          </div>
        </header>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6 mx-4">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  Total Income
                </p>
                <p className="text-2xl font-bold text-success">
                  {`RWF ${totalIncome.toLocaleString()}`}
                </p>
              </div>
              <div className="w-12 h-12 flex items-center justify-center">
                <ArrowUp className="text-success text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">
                  Total Expense
                </p>
                <p className="text-2xl font-bold text-danger">
                  {`RWF ${totalExpense.toLocaleString()}`}
                </p>
              </div>
              <div className="w-12 h-12 flex items-center justify-center">
                <ArrowDown className="text-danger text-xl" />
              </div>
            </div>
          </div>
          {/* <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Net Profit</p>
                <p className="text-2xl font-bold text-primary">
                  {`RWF ${netProfit}`}
                </p>
              </div>
              <div className="w-12 h-12 flex items-center justify-center">
                <ChartLine className="text-primary text-xl" />
              </div>
            </div>
          </div> */}
        </div>

        {/* Filters */}
        <div className="bg-white p-4 flex gap-4 border-b">
          <select
            className="border p-2 rounded"
            onChange={(e) =>
              setFilters({ ...filters, driverId: Number(e.target.value) })
            }
          >
            <option value="">Select Driver</option>
            {drivers.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          <select
            className="border p-2 rounded"
            onChange={(e) =>
              setFilters({ ...filters, vehicleId: Number(e.target.value) })
            }
          >
            <option value="">Select Vehicle</option>
            {devices.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            className="border p-2 rounded"
            onChange={(e) => setFilters({ ...filters, from: e.target.value })}
          />
          <input
            type="date"
            className="border p-2 rounded"
            onChange={(e) => setFilters({ ...filters, to: e.target.value })}
          />
          <button
            className="bg-blue-500 text-white px-4 rounded"
            onClick={handleFetchTransactions}
          >
            Fetch
          </button>
        </div>

        {/* Transactions Table */}
        <main className="p-6 overflow-auto">
          <table className="w-full bg-white rounded-xl shadow-sm border">
            <thead className="bg-gray-50 text-sm font-semibold">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Type</th>
                <th className="px-4 py-3 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {t.date}{" "}
                    <span className="text-xs text-gray-500">{t.time}</span>
                  </td>
                  <td className="px-4 py-3">{t.name}</td>
                  <td className="px-4 py-3">{t.type}</td>
                  <td className="px-4 py-3">{t.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>

        {/* Modals */}
        {showIncomeModal && (
          <IncomeModal
            incomeData={incomeData}
            setIncomeData={setIncomeData}
            onClose={() => setShowIncomeModal(false)}
            onSave={handleAddIncome}
            drivers={drivers}
          />
        )}
        {showExpenseModal && (
          <ExpenseModal
            expenseData={expenseData}
            setExpenseData={setExpenseData}
            onClose={() => setShowExpenseModal(false)}
            onSave={handleAddExpense}
            devices={devices}
          />
        )}
      </div>
    </>
  );
};

export default Transactions;
