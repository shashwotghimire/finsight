"use client";

import { useLogin } from "@/services/api/auth/auth.api";
import React, { useState } from "react";
import type { LoginResponse } from "@/services/api/auth/auth.api";
import { useRouter } from "next/navigation";
import Link from "next/link";
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

  const inputClassName =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-xs transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30";

  return (
    <PublicRoute>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Fin<span className="text-blue-600">Sight</span>
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
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
                  "Login failed. Please try again."}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isPending ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-medium text-blue-600 hover:underline"
            >
              Sign up
            </Link>
          </p>

          {data && (
            <p className="text-center text-sm text-green-600">Logged in!</p>
          )}
        </div>
      </div>
    </PublicRoute>
  );
};

export default LoginPage;
