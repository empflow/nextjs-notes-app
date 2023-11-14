import ColoredIcon from "@/app/components/ColoredIcon";
import Tooltip from "@/app/components/Tooltip/Tooltip";
import { useTranslations } from "next-intl";
import { MouseEvent, ReactNode } from "react";

interface TProps {
  hideTooltip?: boolean;
  tooltipText: string;
  icon: any;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  isDisabled?: boolean;
  isActive?: boolean;
  className?: string;
  children?: ReactNode;
  top?: number;
}

export default function ToolbarItem({
  hideTooltip,
  tooltipText,
  isDisabled,
  onClick,
  className,
  isActive,
  icon,
  children,
  top,
}: TProps) {
  const t = useTranslations("Toolbar");

  return (
    <Tooltip top={top} hide={isDisabled || hideTooltip} text={tooltipText}>
      <button
        onClick={onClick}
        disabled={isDisabled}
        className={`rounded p-1 disabled:cursor-not-allowed md:p-[6px] ${
          isActive ? "bg-light-4xl-gray dark:bg-dark-4xl-gray" : ""
        } ${className ?? ""}`}
        title={isDisabled ? `${tooltipText} (${t("disabled")})` : undefined}
      >
        <ColoredIcon {...{ icon, isDisabled }} />
      </button>
      {children}
    </Tooltip>
  );
}
