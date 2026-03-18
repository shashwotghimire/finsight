import React from "react";

export const StatsCard = ({
  title,
  value,
  subTitle,
  icon,
}: {
  title: string;
  value: string | number;
  subTitle?: string;
  icon?: string;
}) => {
  return (
    <div className="align-center font-manrope flex cursor-pointer flex-col gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-4 shadow-sm transition hover:bg-neutral-200">
      <p className="font-medium text-neutral-900">{title}</p>
      <p className="text-neutral-1000 text-3xl font-bold">{value}</p>
      {subTitle && <p className="text-sm text-neutral-800">{subTitle}</p>}
    </div>
  );
};
