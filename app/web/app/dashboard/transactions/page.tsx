"use client";
import ButtonCommon from "@/components/dashboard/common-button";
import React from "react";

const Transactions = () => {
  const handleClick = () => {
    console.log("CLICKED");
  };
  return (
    <div>
      Transactions
      <ButtonCommon onClick={handleClick}>Add Transaction</ButtonCommon>
    </div>
  );
};

export default Transactions;
