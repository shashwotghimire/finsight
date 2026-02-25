"use client";

import Navbar from "@/components/navbar/navbar";
import { StatsCard } from "@/components/dashboard/statsCard";
import { useMe } from "@/services/api/auth/auth.api";
import { useDashboardStats } from "@/services/api/dashboard/dashboard.api";
import { ChartBarDemoTooltip } from "@/components/dashboard/barChart";
import { ChartPieDonutText } from "@/components/dashboard/chart-pie-donut-text";
import { TransactionsTable } from "@/components/dashboard/table";
import Logs from "@/components/dashboard/logs";
import Categories from "@/components/dashboard/categories";
import Link from "next/link";

const DashboardPage = () => {
  const {
    data: userData,
    isLoading: userLoading,
    isError: userIsError,
    error: userError,
  } = useMe();
  const {
    data: dashboardStats,
    isLoading: dashboardLoading,
    isError: dashboardIsError,
    error: dashboardError,
  } = useDashboardStats();
  if (dashboardLoading) return <p>Loading...</p>;
  if (dashboardError) return <p>Error loading dashboard</p>;

  return (
    //main
    <div className="min-h-screen bg-gray-50 pb-3">
      {/* <div className="bg-white m-4 border border-red-500 shadow-sm rounded-3xl px-6 py-8 min-h-10"> */}
      {/* user
      <div className="bg-white p-2  border-red-500">
        <h3 className="font-semibold text-neutral-900 text-3xl ">
          Welcome back, {userData?.name} !
        </h3>
      </div> */}
      {/* card stats */}
      <div className="max-w-8xl mx-auto mt-8 mr-4 ml-4 grid grid-cols-1 gap-4 rounded-2xl bg-white p-2 py-6 shadow-sm lg:grid-cols-4">
        <StatsCard
          title="Total Accounts"
          value={
            dashboardStats?.totalAccounts
              ? dashboardStats.totalAccounts
              : "Error"
          }
        />

        <StatsCard
          title="Total Balance"
          value={
            dashboardStats?.totalBalance ? dashboardStats.totalBalance : "Error"
          }
          subTitle="0 accounts"
        />
        <StatsCard
          title="Net "
          value={
            dashboardStats?.totalIncome ? dashboardStats.totalIncome : "Error"
          }
        />
        <StatsCard
          title="Savings Rate"
          value={
            dashboardStats?.savingsRate ? dashboardStats.savingsRate : "Error"
          }
        />
      </div>
      <div className="max-w-8xl mx-auto mt-3 mr-4 ml-4 grid grid-cols-1 gap-5 rounded-2xl border-red-700 bg-white px-2 py-3 md:grid-cols-2">
        <div className="max-w-4xl rounded-2xl border border-neutral-50 shadow-sm">
          <TransactionsTable />
        </div>
        <div>
          <ChartPieDonutText />
        </div>
      </div>
      <div className="max-w-8xl mx-auto mt-3 mr-4 ml-4 grid gap-3 rounded-2xl border-neutral-50 bg-white px-2 py-2 shadow-sm md:grid-cols-2">
        <div className="rounded-2xl border border-neutral-100 shadow-sm">
          <ChartBarDemoTooltip />
        </div>
        <div className="grid grid-cols-1 gap-3">
          <Categories />
          <div>
            <Logs />
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default DashboardPage;
