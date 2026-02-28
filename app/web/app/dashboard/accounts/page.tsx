"use client";
import AccountsCard from "@/components/accounts-page/accounts-card";
import CreateAccountModal from "@/components/accounts-page/create-account-modal";
import PaginationButton from "@/components/accounts-page/pagination-button";
import { StatsCard } from "@/components/dashboard/statsCard";
import {
  useAccounts,
  useCreateAccount,
} from "@/services/api/accounts/accounts.api";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
const Accounts = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState<"NPR" | "USD">("NPR");
  const [accountType, setAccountType] = useState("");
  const [err, setErr] = useState();
  const queryClient = useQueryClient();
  const {
    data: userAccountData,
    isLoading: accountIsLoading,
    isError: accountIsError,
    error: accountError,
    isPlaceholderData: accountIsPlaceholderData,
  } = useAccounts(currentPage, 10);
  const { mutate, isPending, isError, error } = useCreateAccount();
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
    mutate(
      { name, balance, currency, type: accountType },
      {
        onSuccess() {
          queryClient.invalidateQueries({ queryKey: ["accounts"] });
        },
        onError(err: any) {
          setErr(err);
        },
      },
    );
  };
  const handleNext = () => {
    if (userAccountData && currentPage < userAccountData.totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  return (
    <div className="p-4">
      <div className="mx-auto flex max-w-6xl justify-between border border-neutral-100">
        <div>
          <h2 className="font-inter text-3xl font-bold">Accounts</h2>
          <p className="mt-2 text-neutral-700">
            Manage your bank accounts and financial assets
          </p>
        </div>
        <div>
          <button
            className="rounded-sm border-none bg-orange-950 p-2 text-white shadow-sm transition hover:cursor-pointer hover:bg-orange-900"
            onClick={handleClick}
          >
            + Add Account
          </button>
        </div>
      </div>
      {/* modal */}
      {isOpen && (
        <div>
          <CreateAccountModal isOpen onClose={handleClick}>
            <div className="mt-20 flex max-h-[390px] w-md flex-col justify-center gap-4 rounded-2xl border border-neutral-100 bg-neutral-100 p-4">
              <h1>Add an account</h1>
              <form onSubmit={handleCreate}>
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
                  <input
                    type="text"
                    className="rounded-sm p-2 shadow-sm hover:rounded-2xl hover:bg-neutral-100 hover:transition focus:rounded-2xl focus:outline focus:outline-neutral-400"
                    placeholder="Enter account type"
                    value={accountType}
                    onChange={(e) => setAccountType(e.target.value)}
                  />
                </div>
                <div className="flex flex-row-reverse gap-5 p-2">
                  <button
                    onClick={handleClick}
                    type="button"
                    className="w-[100px] rounded-lg border-none bg-red-800 p-1.5 text-white shadow-sm transition hover:cursor-pointer hover:bg-red-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-[100px] rounded-lg border-none bg-orange-950 p-1.5 text-white shadow-sm transition hover:cursor-pointer hover:bg-orange-900"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </CreateAccountModal>
          <button onClick={handleClick}>Close</button>
        </div>
      )}
      <div className="mx-auto mt-6 grid max-w-7xl gap-4 rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm sm:grid-cols-1 md:grid-cols-3">
        <StatsCard title="Total Accounts" value={100} />
        <StatsCard title="Total Balance" value={100} />
        <StatsCard title="Highest Balance" value={100} />
      </div>
      <div className="mx-auto mt-4 max-w-7xl rounded-2xl border border-neutral-100 bg-white p-3">
        <input
          placeholder="Search your acount"
          className="w-full rounded-2xl p-4 shadow-sm hover:rounded-2xl hover:bg-neutral-100 hover:transition focus:rounded-2xl focus:outline focus:outline-neutral-400"
        />
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 rounded-lg border border-neutral-100 bg-white p-4">
        {userAccountData?.data.accounts.map((account) => (
          <div key={account.id}>
            <StatsCard title={account.name} value={account.balance} />
          </div>
        ))}
        {/* [pagination] */}
      </div>
      <div className="mx-auto mt-5 flex max-w-7xl justify-between">
        <PaginationButton
          disabled={currentPage === 1}
          onClick={handlePrevious}
          pageNumber="Previous"
        />
        <PaginationButton
          disabled={currentPage === userAccountData?.totalPages}
          onClick={handleNext}
          pageNumber="Next"
        />
      </div>
    </div>
  );
};

export default Accounts;
