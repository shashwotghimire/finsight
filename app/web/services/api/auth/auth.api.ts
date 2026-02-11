"use client";
import axiosInstance from "@/services/axios/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

interface LoginRequest {
  email: string;
  password: string;
}
export interface LoginResponse {
  accessToken: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
export interface RegisterResponse {
  accessToken: string;
}

export interface MeResponse {
  id: string;
  name: string;
  email: string;
  profilePicUrl: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: LoginRequest) => {
      const res = (await axiosInstance.post("/auth/login", data)).data;
      console.log(res.data.accessToken);
      return res.data;
    },
    onSuccess: (data: LoginResponse) => {
      localStorage.setItem("token", data.accessToken);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      const res = (await axiosInstance.post("/auth/register", data)).data;
      return res.data;
    },
    onSuccess: (data: RegisterResponse) => {
      localStorage.setItem("token", data.accessToken);
    },
  });
};

export const useMe = () => {
  return useQuery<MeResponse, any>({
    queryKey: ["me"],
    queryFn: async () => {
      const res = (await axiosInstance.get("/auth/me")).data;
      return res.data.user;
    },
    staleTime: 1000 * 60 * 5,
  });
};
