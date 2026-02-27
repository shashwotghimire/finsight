import axiosInstance from "@/services/axios/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

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

export const useAccounts = () => {
  return useQuery<AccountResponse>({
    queryKey: ["accounts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/account");
      return res.data;
    },
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
