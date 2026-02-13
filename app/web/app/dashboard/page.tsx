"use client";

import Navbar from "@/components/navbar/navbar";
import { StatsCard } from "@/components/dashboard/statsCard";
import { useMe } from "@/services/api/auth/auth.api";
import { useDashboardStats } from "@/services/api/dashboard/dashboard.api";

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
    <div className="bg-neutral-100 h-screen">
      <Navbar />
      <div className="bg-white m-4 border-neutral-50 shadow-sm rounded-3xl px-6 py-8 min-h-10">
        {/* user */}
        <div className="px-4 py-4">
          <h3 className="font-semibold text-neutral-900 text-3xl ">
            Welcome back, {userData?.name} !
          </h3>
        </div>
        {/* card stats */}
        <div className="bg-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto mt-8 max-w-6xl shadow-sm">
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
              dashboardStats?.totalBalance
                ? dashboardStats.totalBalance
                : "Error"
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
      </div>
    </div>
  );
};

export default DashboardPage;
