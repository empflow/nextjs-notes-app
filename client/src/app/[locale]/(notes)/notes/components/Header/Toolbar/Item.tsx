import Tooltip from "@/app/components/Tooltip";
import NotesContext from "@/contexts/NotesContext";
import { useTranslations } from "next-intl";
import { cloneElement, MouseEvent, useContext } from "react";

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
  const t = useTranslations("Toolbar");

  const btn = (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-[10px] py-1 disabled:cursor-not-allowed ${
        isActive ? "bg-gray-400" : ""
      } ${className ?? ""}`}
      title={disabled ? `${tooltipText} (${t("disabled")})` : undefined}
    >
      {cloneElement(icon, {
        className: ` ${
          disabled
            ? "fill-light-gray dark:fill-dark-xl-gray"
            : "fill-light-xl-blue"
        }`,
      })}
    </button>
  );

  if (disabled) return btn;

  return <Tooltip text={tooltipText}>{btn}</Tooltip>;
}
