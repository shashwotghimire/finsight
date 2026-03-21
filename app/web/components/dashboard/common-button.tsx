import { ReactNode } from "react";

const ButtonCommon = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="rounded-sm border-none bg-orange-950 p-2 text-white shadow-sm transition hover:cursor-pointer hover:bg-orange-900"
    >
      {children}
    </button>
  );
};

export default ButtonCommon;
