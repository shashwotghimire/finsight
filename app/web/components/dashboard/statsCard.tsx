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
    <div className="bg-neutral-100 border border-neutral-200 rounded-2xl hover:bg-neutral-400 transition px-4 py-4 flex flex-col align-center gap-4 font-manrope">
      <p className="text-neutral-900 font-medium">{title}</p>
      <p className="text-neutral-1000 font-bold text-3xl">{value}</p>
      {subTitle && <p className="text-neutral-800 text-sm">{subTitle}</p>}
    </div>
  );
};
