import axiosInstance from "@/services/axios/axios";
import { useQuery } from "@tanstack/react-query";

export interface DashboardStats {
  totalAccounts: number;
  totalBalance: string;
  totalIncome: string;
  totalExpense: string;
  savingsRate: string;
}
export const useDashboardStats = () => {
  return useQuery<DashboardStats, any>({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      const res = (await axiosInstance.get("/dashboard/stats")).data;
      console.log(res.data);
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
