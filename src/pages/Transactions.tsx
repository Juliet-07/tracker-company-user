import React, { useState } from "react";
import { Plus, ArrowUp, ArrowDown, Clock, ChartLine, Filter, Download, Eye, Pencil, X } from "lucide-react";

const drivers = [
  { label: "John Smith", value: "john-smith", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg", vehicle: "Vehicle-001" },
  { label: "Maria Garcia", value: "maria-garcia", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg", vehicle: "Vehicle-002" },
  { label: "David Wilson", value: "david-wilson", avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg", vehicle: "Vehicle-004" }
];

const transactionRows = [
  {
    date: "Dec 15, 2024",
    time: "10:30 AM",
    driver: drivers[0],
    type: "Income",
    typeIcon: <ArrowUp className="mr-1 h-4 w-4 text-success" />,
    category: "Trip Payment",
    subcategory: "Delivery Service",
    amount: "+RWF 150,000",
    amountClass: "text-success",
    status: "Completed",
    statusClass: "bg-green-100 text-green-500",
  },
  {
    date: "Dec 14, 2024",
    time: "2:15 PM",
    driver: drivers[1],
    type: "Expense",
    typeIcon: <ArrowDown className="mr-1 h-4 w-4 text-danger" />,
    category: "Fuel Cost",
    subcategory: "Gas Station",
    amount: "-RWF 45,000",
    amountClass: "text-danger",
    status: "Pending",
    statusClass: "bg-yellow-100 text-yellow-500",
  },
  {
    date: "Dec 13, 2024",
    time: "11:45 AM",
    driver: drivers[2],
    type: "Income",
    typeIcon: <ArrowUp className="mr-1 h-4 w-4 text-success" />,
    category: "Passenger Ride",
    subcategory: "Ride Share",
    amount: "+RWF 85,500",
    amountClass: "text-success",
    status: "Completed",
    statusClass: "bg-green-100 text-green-500",
  }
];

const Transactions: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-800">Transaction Records</h1>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <span className="px-3 py-1 bg-green-100 text-green-500  rounded-full font-medium ">RWF 2,450,000 This Month</span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-500 rounded-full font-medium">15 Pending</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              id="add-transaction-btn"
              className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex flex-row items-center"
              onClick={() => setShowModal(true)}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Transaction
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 p-6 overflow-auto">
        {/* Stats Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Income</p>
                <p className="text-2xl font-bold text-success">RWF 12,450,000</p>
                <p className="text-xs text-gray-500 mt-1">+12% from last month</p>
              </div>
              <div className="w-12 h-12 flex items-center justify-center">
                <ArrowUp className="text-success text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Total Expenses</p>
                <p className="text-2xl font-bold text-danger">RWF 3,250,000</p>
                <p className="text-xs text-gray-500 mt-1">+8% from last month</p>
              </div>
              <div className="w-12 h-12 flex items-center justify-center">
                <ArrowDown className="text-danger text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Pending</p>
                <p className="text-2xl font-bold text-warning">RWF 1,850,000</p>
                <p className="text-xs text-gray-500 mt-1">15 transactions</p>
              </div>
              <div className="w-12 h-12 flex items-center justify-center">
                <Clock className="text-warning text-xl" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 font-medium">Net Profit</p>
                <p className="text-2xl font-bold text-primary">RWF 9,200,000</p>
                <p className="text-xs text-gray-500 mt-1">+15% from last month</p>
              </div>
              <div className="w-12 h-12 flex items-center justify-center">
                <ChartLine className="text-primary text-xl" />
              </div>
            </div>
          </div>
        </div>
        {/* Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Type:</label>
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>All Types</option>
                  <option>Income</option>
                  <option>Expense</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Driver:</label>
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>All Drivers</option>
                  {drivers.map(d => <option key={d.value}>{d.label}</option>)}
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Date Range:</label>
                <input type="date" className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                <span className="text-gray-500">to</span>
                <input type="date" className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors flex flex-row items-center">
                <Filter className="mr-2 h-4 w-4" />Apply
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors flex flex-row items-center">
                <Download className="mr-2 h-4 w-4" />Export
              </button>
            </div>
          </div>
        </div>
        {/* Transactions Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
            <div className="grid grid-cols-12 gap-4 text-sm font-semibold text-gray-700">
              <div className="col-span-2">Date</div>
              <div className="col-span-2">Driver</div>
              <div className="col-span-2">Type</div>
              <div className="col-span-2">Category</div>
              <div className="col-span-2">Amount</div>
              <div className="col-span-1">Status</div>
              <div className="col-span-1">Actions</div>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {transactionRows.map((row, i) => (
              <div className="px-6 py-4 hover:bg-gray-50 transition-colors" key={i}>
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-2">
                    <p className="font-semibold text-gray-800">{row.date}</p>
                    <p className="text-sm text-gray-500">{row.time}</p>
                  </div>
                  <div className="col-span-2 flex items-center space-x-3">
                    <img src={row.driver.avatar} alt="Driver" className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="font-semibold text-gray-800">{row.driver.label}</p>
                      <p className="text-sm text-gray-500">{row.driver.vehicle}</p>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <span className={`inline-flex items-center px-2 py-1 bg-opacity-10 text-xs rounded-full font-medium ${row.type === "Income" ? "bg-green-100 text-green-500" : "bg-red-100 text-red-500"}`}>
                      {row.typeIcon}{row.type}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <p className="font-semibold text-gray-800">{row.category}</p>
                    <p className="text-sm text-gray-500">{row.subcategory}</p>
                  </div>
                  <div className="col-span-2">
                    <p className={`font-bold ${row.amountClass}`}>{row.amount}</p>
                  </div>
                  <div className="col-span-1">
                    <span className={`inline-flex items-center px-2 py-1 text-xs rounded-full font-medium ${row.statusClass}`}>{row.status}</span>
                  </div>
                  <div className="col-span-1">
                    <div className="flex space-x-2">
                      <button className="p-2 text-primary hover:bg-primary hover:bg-opacity-10 rounded-lg transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Pencil className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Add Transaction Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Add New Transaction</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <X className="text-xl h-6 w-6" />
              </button>
            </div>
            <form className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="">Select Type</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Driver</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="">Select Driver</option>
                  {drivers.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="">Select Category</option>
                  <option value="trip-payment">Trip Payment</option>
                  <option value="fuel-cost">Fuel Cost</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="passenger-ride">Passenger Ride</option>
                  <option value="delivery-service">Delivery Service</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount (RWF)</label>
                <input type="number" placeholder="0.00" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea rows={3} placeholder="Enter transaction details..." className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input type="datetime-local" className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />
              </div>
              <div className="flex space-x-3 pt-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex flex-row items-center">
                  <Plus className="mr-2 h-4 w-4" />Add Transaction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
