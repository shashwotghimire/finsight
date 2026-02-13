"use client";

import { useRegister } from "@/services/api/auth/auth.api";
import React, { useState } from "react";
import type { RegisterResponse } from "@/services/api/auth/auth.api";
import { useRouter } from "next/navigation";
import { PublicRoute } from "@/components/routes/public-route";

const RegisterPage = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { mutate, isPending, isError, error } = useRegister();
  const [data, setData] = useState<RegisterResponse>();
  const router = useRouter();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { name, email, password },
      {
        onSuccess(data) {
          setData(data);
          router.push("/dashboard");
        },
        onError: (err: any) => {
          console.error("Register failed", err);
        },
      },
    );
  };

  return (
    <PublicRoute>
      <div>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="First Last"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button type="submit">Register</button>
        </form>
        {data && <p>Registered</p>}
      </div>
    </PublicRoute>
  );
};

export default RegisterPage;
