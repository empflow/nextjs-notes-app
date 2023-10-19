import ColoredIcon from "@/app/components/ColoredIcon";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface TProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: ReactNode;
  icon?: any;
  onClick?: () => unknown;
  isDisabled?: boolean;
  className?: string;
}

export default function HoverableItem({
  icon,
  text,
  isDisabled,
  onClick,
  className,
  ...attrs
}: TProps) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={`flex items-center gap-1 rounded p-1 text-left disabled:cursor-not-allowed disabled:text-dark-gray dark:disabled:text-light-gray ${
        className ?? ""
      } ${
        isDisabled ? "" : "hover:bg-light-4xl-gray dark:hover:bg-dark-4xl-gray"
      }`}
      {...attrs}
    >
      {icon && <ColoredIcon {...{ icon, isDisabled }} />}
      {text}
    </button>
  );
}
