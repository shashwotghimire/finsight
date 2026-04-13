"use client";

import { useRegister } from "@/services/api/auth/auth.api";
import React, { useState } from "react";
import type { RegisterResponse } from "@/services/api/auth/auth.api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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

  const inputClassName =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-xs transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30";

  return (
    <PublicRoute>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 space-y-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Image
                src="https://assets.streamlinehq.com/image/private/w_300,h_300,ar_1/f_auto/v1/icons/money/dollar-minimalistic-7sr3wyd3gc9je4re2y9b8l.png/dollar-minimalistic-zumyt8yqlccd6959i5l29.png?_a=DATAiZAAZAA0"
                alt="Finsights logo"
                width={48}
                height={48}
              />
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                Finsights
              </h1>
            </div>
            <p className="mt-2 text-sm text-gray-500">Create your account</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-1">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full name
              </label>
              <input
                id="name"
                type="text"
                placeholder="First Last"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClassName}
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClassName}
              />
            </div>

            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClassName}
              />
            </div>

            {isError && (
              <p className="text-sm text-red-600">
                {(error as any)?.response?.data?.message ||
                  "Registration failed. Please try again."}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? "Creating account…" : "Create account"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign in
            </Link>
          </p>

          {data && (
            <p className="text-center text-sm text-green-600">
              Account created!
            </p>
          )}
        </div>
      </div>
    </PublicRoute>
  );
};

export default RegisterPage;
