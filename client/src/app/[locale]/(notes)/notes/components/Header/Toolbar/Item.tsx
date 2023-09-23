import Tooltip from "@/app/components/Tooltip";
import { cloneElement, MouseEvent } from "react";

interface TProps {
  tooltipText: string;
  icon: any;
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  isActive?: boolean;
  className?: string;
}

export default function ToolbarItem({
  tooltipText,
  disabled,
  onClick,
  className,
  isActive,
  icon,
}: TProps) {
  return (
    <Tooltip text={tooltipText}>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`rounded-full px-3 py-1 disabled:cursor-not-allowed disabled:bg-light-4xl-gray disabled:text-dark-gray ${
          isActive ? "bg-gray-400" : ""
        } ${className ?? ""}`}
        title={disabled ? `${tooltipText} (disabled)` : undefined}
      >
        {cloneElement(icon, { className: "fill-light-xl-blue" })}
      </button>
    </Tooltip>
  );
}
