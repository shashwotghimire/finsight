"use client";
import ButtonCommon from "@/components/dashboard/common-button";
import { StatsCard } from "@/components/dashboard/statsCard";
import { CalendarClockIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { DatePickerWithRange } from "@/components/transactions-page/date-picker";

const Transactions = () => {
  const handleClick = () => {
    console.log("CLICKED");
  };
  return (
    <div className="p-4">
      <div className="mx-auto mt-4 flex max-w-6xl justify-between border border-red-500">
        <div>
          <h1 className="font-inter text-3xl font-bold">Transactions</h1>
          <p className="mt-3 text-neutral-700">
            Track your income and expenses
          </p>
        </div>
        <div className="p-4">
          <ButtonCommon onClick={handleClick}> + Add Transaction</ButtonCommon>
        </div>
      </div>
      <div className="mx-auto mt-6 grid max-w-7xl gap-4 rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm sm:grid-cols-1 md:grid-cols-3">
        <StatsCard title="Total Income" value={100} />
        <StatsCard title="Total Expenses" value={100} />
        <StatsCard title="Net" value={100} />
      </div>
      <div className="mx-auto mt-5 flex max-w-7xl items-center gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        {/* 🔍 Search */}
        <div className="flex flex-1 items-center">
          <input
            placeholder="Search transactions..."
            className="w-full rounded-xl border border-neutral-300 p-3 shadow-sm transition focus:ring-2 focus:ring-neutral-400 focus:outline-none"
          />
        </div>

        <div className="flex items-center">
          <DatePickerWithRange />
        </div>
        <div className="flex items-center gap-2">
          {/* Account Filter */}
          <select className="rounded-xl border border-neutral-300 bg-neutral-100 p-2 text-sm shadow-sm transition hover:bg-neutral-200">
            <option>All Accounts</option>
            <option>Account 1</option>
            <option>Account 2</option>
          </select>

          <select className="rounded-xl border border-neutral-300 bg-neutral-100 p-2 text-sm shadow-sm transition hover:bg-neutral-200">
            <option>All Categories</option>
            <option>Food</option>
            <option>Transport</option>
            <option>Salary</option>
          </select>

          {/* Type Filter */}
          <select className="rounded-xl border border-neutral-300 bg-neutral-100 p-2 text-sm shadow-sm transition hover:bg-neutral-200">
            <option>All Types</option>
            <option>Income</option>
            <option>Expense</option>
          </select>

          {/* Sort */}
          <select className="rounded-xl border border-neutral-300 bg-neutral-100 p-2 text-sm shadow-sm transition hover:bg-neutral-200">
            <option>Sort By</option>
            <option>Newest</option>
            <option>Oldest</option>
            <option>Amount (High → Low)</option>
            <option>Amount (Low → High)</option>
          </select>
        </div>
      </div>
      <div className="mx-auto mt-5 max-w-7xl rounded-xl border border-neutral-300 bg-white p-4 shadow-sm">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Transactions;
