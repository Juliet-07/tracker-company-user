import axiosInstance from "@/api/axios";

const apiURL = import.meta.env.VITE_REACT_APP_BASE_URL;

export const fetchDevices = async () => {
  const res = await axiosInstance.get(`${apiURL}/devices`, {
    withCredentials: true,
  });
  return res.data;
};

export const fetchDrivers = async () => {
  const res = await axiosInstance.get(`${apiURL}/drivers`, {
    withCredentials: true,
  });
  return res.data;
};

export const fetchPayments = async (
  driverId: number,
  from: string,
  to: string
) => {
  if (!driverId || !from || !to) return [];
  const res = await axiosInstance.get(
    `${apiURL}/finance/payments?driverId=${driverId}&from=${from}&to=${to}`,
    { withCredentials: true }
  );
  console.log(res.data, "response from payment");
  return res.data;
};

export const fetchExpenses = async (
  vehicleId: number,
  from: string,
  to: string
) => {
  if (!vehicleId || !from || !to) return [];
  const res = await axiosInstance.get(
    `${apiURL}/finance/expenses?vehicleId=${vehicleId}&from=${from}&to=${to}`,
    { withCredentials: true }
  );
  console.log(res.data, "response from expenses");
  return res.data;
};

export const addIncome = async (data: any) => {
  const res = await axiosInstance.post(`${apiURL}/finance/payments`, data, {
    withCredentials: true,
  });
  return res.data;
};

export const addExpense = async (data: any) => {
  const res = await axiosInstance.post(`${apiURL}/finance/expenses`, data, {
    withCredentials: true,
  });
  return res.data;
};
