import { ReactNode } from "react";

interface TProps {
  onClick?: () => void;
  disabled?: boolean;
  isActive?: boolean;
  content?: ReactNode;
}

export default function CodeItem({
  content,
  onClick,
  disabled,
  isActive,
}: TProps) {
  return (
    <button
      className={`rounded px-2 py-1 text-left disabled:cursor-not-allowed ${
        isActive
          ? "bg-light-4xl-gray dark:bg-dark-4xl-gray"
          : "hover:bg-light-5xl-gray dark:hover:bg-dark-5xl-gray"
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
