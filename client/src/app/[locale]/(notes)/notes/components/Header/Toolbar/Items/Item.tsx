import ColoredIcon from "@/app/components/ColoredIcon";
import Tooltip from "@/app/components/Tooltip";
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
    <Tooltip top={top} hide={isDisabled} text={tooltipText}>
      <button
        onClick={onClick}
        disabled={hideTooltip ?? isDisabled}
        className={`rounded px-[10px] py-1 disabled:cursor-not-allowed ${
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
