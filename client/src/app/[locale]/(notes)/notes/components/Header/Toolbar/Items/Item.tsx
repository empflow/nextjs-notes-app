import Tooltip from "@/app/components/Tooltip";
import useGetContext from "@/app/hooks/useGetContext";
import TooltipContainerContext from "@/contexts/TooltipContainerContext";
import { useTranslations } from "next-intl";
import { cloneElement, MouseEvent, ReactNode } from "react";

interface TProps {
  hideTooltip?: boolean;
  tooltipText: string;
  icon: any;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  isActive?: boolean;
  className?: string;
  children?: ReactNode;
  top?: number;
}

export default function ToolbarItem({
  tooltipText,
  disabled,
  onClick,
  className,
  isActive,
  icon,
  children,
  hideTooltip = false,
  top,
}: TProps) {
  const t = useTranslations("Toolbar");

  return (
    <Tooltip top={top} hide={hideTooltip} text={tooltipText}>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`rounded px-[10px] py-1 disabled:cursor-not-allowed ${
          isActive ? "bg-light-4xl-gray dark:bg-dark-4xl-gray" : ""
        } ${className ?? ""}`}
        title={disabled ? `${tooltipText} (${t("disabled")})` : undefined}
      >
        {cloneElement(icon, {
          className: `${
            disabled
              ? "fill-light-gray dark:fill-dark-xl-gray"
              : "fill-light-xl-blue"
          }`,
        })}
      </button>
      {children}
    </Tooltip>
  );
}
