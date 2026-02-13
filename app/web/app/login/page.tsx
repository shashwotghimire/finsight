"use client";

import { useLogin } from "@/services/api/auth/auth.api";
import React, { useState } from "react";
import type { LoginResponse } from "@/services/api/auth/auth.api";
import { useRouter } from "next/navigation";
import { PublicRoute } from "@/components/routes/public-route";

const LoginPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { mutate, isPending, isError, error } = useLogin();
  const [data, setData] = useState<LoginResponse>();
  const router = useRouter();
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { email, password },
      {
        onSuccess(data, variables, onMutateResult, context) {
          setData(data);
          router.push("/dashboard");
        },
        onError: (err: any) => {
          console.error(
            "login failed",
            err?.response?.data?.message || err?.response?.message,
          );
        },
      },
    );
  };
  React.useEffect(() => {
    console.log("Base URL:", process.env.NEXT_PUBLIC_API_BASE_URL);
  }, []);

  return (
    <PublicRoute>
      <div>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        {data && <p>logged in</p>}
      </div>
    </PublicRoute>
  );
};

export default LoginPage;
