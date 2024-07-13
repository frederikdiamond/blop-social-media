import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface PrimaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export default function PrimaryButton({
  children,
  onClick,
  ...props
}: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "font-semibold text-base text-white bg-blue-600 hover:bg-blue-800 px-4 py-2 rounded-xl transition-all duration-150 ease-in-out"
      )}
      {...props}
    >
      {children}
    </button>
  );
}
