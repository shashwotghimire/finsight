import axiosInstance from "@/services/axios/axios";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";

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

export interface AccountByIdResponse {
  account: {
    id: string;
    user: {
      id: string;
      name: string;
      profilePicUrl: string;
      type: string;
    };
    name: string;
    type: string;
    currency: string;
    balance: string;
    createdAt: string;
    updatedAt: string;
    transactions: [];
    outgoingTransfers: [];
    incomingTransfers: [];
  };
}
interface CreateAccountRequest {
  name: string;
  balance: string;
  currency: "USD" | "NPR";
  type: string;
}
interface EditAccountRequest {
  name?: string;
  balance?: string;
  currency?: "USD" | "NPR";
  type?: string;
}

interface EditAccountResponse {
  data: {
    account: UserAccounts;
  };
}
export const useAccounts = (
  page: number,
  limit: number = 10,
  search: string,
) => {
  return useQuery<AccountResponse>({
    queryKey: ["accounts", { page, search }],
    queryFn: async () => {
      const res = await axiosInstance.get(`/account`, {
        params: {
          page,
          limit,
          search,
        },
      });
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

export const useEditAccount = (accountId: string) => {
  return useMutation<EditAccountResponse, unknown, EditAccountRequest>({
    mutationFn: async (data) => {
      const res = (await axiosInstance.patch(`/account/${accountId}`, data))
        .data;
      return res.data;
    },
  });
};

export const useDeleteAccount = (accountId: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      (await axiosInstance.delete(`/account/${accountId}`)).data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      router.push("/dashboard/accounts");
    },
  });
};
export const useAccountById = (accountId: string) => {
  return useQuery<AccountByIdResponse>({
    queryKey: ["AccountById", accountId],
    queryFn: async () => {
      const res = (await axiosInstance.get(`/account/${accountId}`)).data;
      return res.data;
    },
  });
};
