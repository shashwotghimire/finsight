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
    <div className="bg-gray-50 min-h-screen pb-3">
      <Navbar />
      {/* <div className="bg-white m-4 border border-red-500 shadow-sm rounded-3xl px-6 py-8 min-h-10"> */}
      {/* user
      <div className="bg-white p-2  border-red-500">
        <h3 className="font-semibold text-neutral-900 text-3xl ">
          Welcome back, {userData?.name} !
        </h3>
      </div> */}
      {/* card stats */}
      <div className="bg-white p-2 py-6 ml-4 mr-4 grid grid-cols-1 lg:grid-cols-4 gap-4 mx-auto mt-8 max-w-8xl shadow-sm rounded-2xl">
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
      <div className="bg-white px-2 py-3 ml-4 mr-4 grid grid-cols-1 md:grid-cols-2 mt-3 rounded-2xl border-red-700 max-w-8xl gap-5 mx-auto">
        <div className=" border rounded-2xl border-neutral-50 shadow-sm max-w-4xl ">
          <TransactionsTable />
        </div>
        <div>
          <ChartPieDonutText />
        </div>
      </div>
      <div className="px-2 py-2 bg-white ml-4 mr-4 max-w-8xl shadow-sm border-neutral-50 rounded-2xl mx-auto mt-3 grid md:grid-cols-2 gap-3">
        <div className="border border-neutral-100 shadow-sm rounded-2xl">
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
