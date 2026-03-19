import { ArrowDownLeft, ArrowUpRight, ArrowUpLeft } from "lucide-react";
import React from "react";

type TransactionType = "INCOMING" | "OUTGOING" | "CHANGE";

const transactionConfig = {
  INCOMING: {
    label: "Incoming Transactions",
    icon: ArrowUpRight,
    color: "text-green-600",
  },
  OUTGOING: {
    label: "Outgoing Transactions",
    icon: ArrowDownLeft,
    color: "text-red-600",
  },
  CHANGE: {
    label: "Change",
    icon: ArrowUpLeft,
    color: "text-blue-600",
  },
};

const TransactionInfoCard = ({
  IncomingTransfers,
  OutgoingTransfers,
  type,
}: {
  IncomingTransfers: number;
  OutgoingTransfers: number;
  type: TransactionType;
}) => {
  const config = transactionConfig[type];
  const Icon = config.icon;

  const value =
    type === "INCOMING"
      ? IncomingTransfers
      : type === "OUTGOING"
        ? OutgoingTransfers
        : IncomingTransfers - OutgoingTransfers;

  return (
    <div className="h-[150px] max-w-[200px] rounded-xl p-4 shadow-sm">
      <span className={`flex items-center gap-2 ${config.color}`}>
        <Icon />
        {config.label}
      </span>

      <p className="mt-4 text-2xl font-semibold">{value}</p>
    </div>
  );
};

export default TransactionInfoCard;
