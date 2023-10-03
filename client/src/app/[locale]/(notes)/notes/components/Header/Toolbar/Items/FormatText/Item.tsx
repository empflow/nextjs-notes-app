import ColoredIcon from "@/app/components/ColoredIcon";
import { ReactNode } from "react";

interface TProps {
  text: ReactNode;
  icon: any;
  onClick?: () => unknown;
  isDisabled?: boolean;
  isActive?: boolean;
  className?: string;
}

export default function FormatTextItem({
  icon,
  text,
  className,
  isActive,
  isDisabled,
  onClick,
}: TProps) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`flex items-center gap-1 rounded p-1 text-left disabled:cursor-not-allowed ${
        isActive ? "bg-light-4xl-gray dark:bg-dark-4xl-gray" : ""
      } ${className ?? ""}`}
    >
      <ColoredIcon {...{ icon, isDisabled }} />
      {text}
    </button>
  );
}
