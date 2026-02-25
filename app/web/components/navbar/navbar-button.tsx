import Link from "next/link";

type TabButtonProps = {
  label: string;
  active?: boolean;
  href: string;
};

const TabButton = ({ label, active = false, href }: TabButtonProps) => {
  return (
    <Link
      className={`
        relative p-2 bg-transparent border-none
        text-neutral-900 cursor-pointer text-sm transition-colors
        hover:text-black
        after:content-[''] after:absolute after:bottom-0 after:left-0 
        after:w-full after:h-0.5 after:bg-blue-500
        after:transition-transform after:duration-300
        ${active ? "after:scale-x-100" : "after:scale-x-0"}
      `}
      href={href}
    >
      {label}
    </Link>
  );
};

export default TabButton;
