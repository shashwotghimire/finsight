"use client";
import TransactionInfoCard from "@/components/accounts-page/transaction-info-card";
import { StatsCard } from "@/components/dashboard/statsCard";
import { Table } from "@/components/ui/table";
import {
  useAccountById,
  useDeleteAccount,
} from "@/services/api/accounts/accounts.api";
import CreateAccountModal from "@/components/accounts-page/create-account-modal";
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
import { useEditAccount } from "@/services/api/accounts/accounts.api";
import { useEffect, useState } from "react";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import DeletePopup from "@/components/dashboard/delete-popup";

function page() {
  const params = useParams();
  const [editing, setEditing] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [err, setErr] = useState();
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState<"NPR" | "USD">("NPR");
  const [type, setType] = useState("PERSONAL");

  const id = params.id as string;
  const queryClient = useQueryClient();
  const {
    data: accountData,
    isLoading: accountIsLoading,
    isError: accountIsError,
    error: accountError,
  } = useAccountById(id);
  const { mutate, isPending, isError, error } = useEditAccount(
    accountData?.account.id!,
  );
  const { mutate: deleteMutate } = useDeleteAccount(accountData?.account.id!);
  const handleEdit = (e: React.FormEvent) => {
    e.preventDefault();
    setEditing(true);
    mutate(
      { name, balance, type, currency },
      {
        onSuccess(data, variables, onMutateResult, context) {
          queryClient.invalidateQueries({
            queryKey: ["AccountById", accountData?.account.id],
          });
          setEditing(false);
        },
        onError(err: any) {
          setErr(err);
        },
      },
    );
  };
  const handleModalClose = () => {
    setEditing(false);
  };
  const handleDeleteButton = () => {
    setIsDelete(true);
  };
  const handleDelete = () => {
    deleteMutate();
  };
  const handleDeleteClose = () => {
    setIsDelete(false);
  };
  useEffect(() => {
    setName(accountData?.account.name!);
    setType(accountData?.account.type!);
    setBalance(accountData?.account.balance!);
    setCurrency(accountData?.account.currency as "NPR" | "USD");
  }, [accountData]);
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
          <button
            onClick={() => setEditing(true)}
            className="rounded-sm border-none bg-orange-950 p-2 text-white shadow-sm transition hover:cursor-pointer hover:bg-orange-900"
          >
            <span className="flex gap-2">
              Edit Account<Edit></Edit>
            </span>
          </button>
          <button
            onClick={handleDeleteButton}
            className="rounded-sm border-none bg-red-950 p-2 text-white shadow-sm transition hover:cursor-pointer hover:bg-red-700"
          >
            <span className="flex gap-2">
              Delete Account<DeleteIcon></DeleteIcon>
            </span>
          </button>
        </div>
        {isDelete && (
          <DeletePopup isOpen={isDelete} onClose={handleDeleteClose}>
            <div className="flex w-[300px] flex-col gap-6 rounded-xl bg-white p-6 shadow-lg">
              <h2 className="text-center text-lg font-semibold text-neutral-800">
                Are you sure you want to delete this account?
              </h2>
              <p className="text-center text-sm text-neutral-500">
                This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={handleDeleteClose}
                  className="flex-1 cursor-pointer rounded-lg bg-gray-200 px-4 py-2 text-gray-700 transition hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition hover:bg-red-700"
                >
                  Delete <DeleteIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </DeletePopup>
        )}
        {editing && (
          <div>
            <CreateAccountModal isOpen onClose={handleModalClose}>
              <div className="mt-20 flex max-h-[390px] w-md flex-col justify-center gap-4 rounded-2xl border border-neutral-100 bg-neutral-100 p-4">
                <h1>Add an account</h1>
                <form onSubmit={handleEdit}>
                  <div className="mt-5 flex flex-col gap-5">
                    <input
                      className="rounded-sm p-2 shadow-sm hover:rounded-2xl hover:bg-neutral-100 hover:transition focus:rounded-2xl focus:outline focus:outline-neutral-400"
                      type="text"
                      placeholder="Enter account name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <input
                      type="text"
                      className="rounded-sm p-2 shadow-sm hover:rounded-2xl hover:bg-neutral-100 hover:transition focus:rounded-2xl focus:outline focus:outline-neutral-400"
                      value={balance}
                      placeholder="Enter account balance"
                      onChange={(e) => setBalance(e.target.value)}
                    />
                    <select
                      value={currency}
                      onChange={(e) =>
                        setCurrency(e.target.value as "NPR" | "USD")
                      }
                      className="rounded-sm p-2 shadow-sm hover:rounded-2xl hover:bg-neutral-100 hover:transition focus:rounded-2xl focus:outline focus:outline-neutral-400"
                    >
                      <option value="">Currency</option>
                      <option value="NPR">NPR</option>
                      <option value="USD">USD</option>
                    </select>
                    <select
                      value={type}
                      onChange={(e) =>
                        setType(
                          e.target.value as "JOINT" | "PERSONAL" | "SAVING",
                        )
                      }
                      className="rounded-sm p-2 shadow-sm hover:rounded-2xl hover:bg-neutral-100 hover:transition focus:rounded-2xl focus:outline focus:outline-neutral-400"
                    >
                      <option value="">Account type</option>
                      <option value="JOINT">Joint</option>
                      <option value="PERSONAL">Personal</option>
                      <option value="SAVING">Savings</option>
                    </select>
                  </div>
                  <div className="flex flex-row-reverse gap-5 p-2">
                    <button
                      onClick={handleModalClose}
                      type="button"
                      className="w-[100px] rounded-lg border-none bg-red-800 p-1.5 text-white shadow-sm transition hover:cursor-pointer hover:bg-red-900"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-[100px] rounded-lg border-none bg-orange-950 p-1.5 text-white shadow-sm transition hover:cursor-pointer hover:bg-orange-900"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </CreateAccountModal>
          </div>
        )}
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
