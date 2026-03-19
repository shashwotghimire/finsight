"use client";
import TransactionInfoCard from "@/components/accounts-page/transaction-info-card";
import { StatsCard } from "@/components/dashboard/statsCard";
import { Table } from "@/components/ui/table";
import { useAccountById } from "@/services/api/accounts/accounts.api";
import {
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Calendar1,
  DeleteIcon,
  Edit,
  EditIcon,
  LucideArrowLeftSquare,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

function page() {
  const params = useParams();
  const id = params.id as string;
  const {
    data: accountData,
    isLoading: accountIsLoading,
    isError: accountIsError,
    error: accountError,
  } = useAccountById(id);
  console.log(accountData);
  return (
    <div className="h-screen bg-gray-50">
      <div className="mx-auto mt-3 ml-5 max-w-7xl p-2">
        <Link href={`/dashboard/accounts`}>
          <span className="flex cursor-pointer gap-1.5 transition-colors hover:font-extralight">
            <LucideArrowLeftSquare></LucideArrowLeftSquare>
            Back to accounts
          </span>
        </Link>
      </div>
      <div className="mx-auto mt-8 max-w-7xl p-4 sm:flex sm:justify-between sm:gap-2.5">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-bold"> {accountData?.account.name}</h1>
          <p className="text-lg text-neutral-500">
            {accountData?.account.type}
          </p>
          <p className="text-md text-neutral-500">
            {accountData?.account.currency}
          </p>
        </div>
        <div className="mt-2 flex h-[50px] gap-2 sm:flex sm:gap-2">
          <button className="rounded-sm border-none bg-orange-950 p-2 text-white shadow-sm transition hover:cursor-pointer hover:bg-orange-900">
            <span className="flex gap-2">
              Edit Account<Edit></Edit>
            </span>
          </button>
          <button className="rounded-sm border-none bg-red-950 p-2 text-white shadow-sm transition hover:cursor-pointer hover:bg-red-700">
            <span className="flex gap-2">
              Delete Account<DeleteIcon></DeleteIcon>
            </span>
          </button>
        </div>
      </div>
      <div className="mx-auto mt-8 flex max-w-7xl flex-col rounded-xl border border-neutral-200 bg-neutral-100 p-4 shadow-sm">
        <div className="flex flex-col">
          <p className="text-lg text-neutral-500">Current Balance</p>
          <span className="text-5xl">
            {accountData?.account.currency === "USD" ? "$ " : "रु "}{" "}
            {accountData?.account.balance}
          </span>
        </div>
        <div className="mt-10 rounded-xl border-neutral-50 p-4 shadow-sm">
          <p className="text-neutral-600">Account activity</p>
          <div className="mx-auto mt-4 grid grid-cols-3">
            <TransactionInfoCard
              type="INCOMING"
              IncomingTransfers={100}
              OutgoingTransfers={0}
            />
            <TransactionInfoCard
              type="OUTGOING"
              IncomingTransfers={10}
              OutgoingTransfers={2}
            />
            <TransactionInfoCard
              type="CHANGE"
              IncomingTransfers={10}
              OutgoingTransfers={2}
            />
          </div>
          <div className="mt-4 flex justify-between gap-2">
            <div className="mt-3 flex gap-4 p-1">
              <span>
                <Calendar1></Calendar1>
              </span>
              <p className="text-neutral-500">
                Created At:{" "}
                {new Date(
                  accountData?.account.createdAt as string,
                ).toLocaleDateString()}
              </p>
            </div>
            <div>Total Transactions: {accountData?.account.transactions}</div>
          </div>
        </div>
        <div className="mt-5 border border-neutral-100">
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
    </div>
  );
}

export default page;
