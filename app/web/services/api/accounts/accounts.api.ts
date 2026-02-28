import axiosInstance from "@/services/axios/axios";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

export interface UserAccounts {
  id: string;
  userId: string;
  name: string;
  type: string;
  currency: string;
  balance: string;
  createdAt: string;
  updatedAt: string;
}

export interface AccountResponse {
  page: number;
  limit: number;
  totalPages: number;
  total: number;
  data: {
    accounts: UserAccounts[];
  };
}

interface CreateAccountRequest {
  name: string;
  balance: string;
  currency: "USD" | "NPR";
  type: string;
}

export const useAccounts = (page: number, limit: number = 10) => {
  return useQuery<AccountResponse>({
    queryKey: ["accounts", page],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/account?page=${page}&limit=${limit}`,
      );
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
};

export const useCreateAccount = () => {
  return useMutation<UserAccounts, unknown, CreateAccountRequest>({
    mutationFn: async (data: CreateAccountRequest) => {
      const res = await axiosInstance.post("/account", data);
      return res.data;
    },
  });
};
