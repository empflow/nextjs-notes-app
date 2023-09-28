import ColoredIcon from "@/app/components/ColoredIcon";
import { ReactNode } from "react";

interface TProps {
  onClick?: () => void;
  isDisabled?: boolean;
  isActive?: boolean;
  content?: ReactNode;
  icon: any;
}

export default function CodeItem({
  content,
  onClick,
  isDisabled,
  isActive,
  icon,
}: TProps) {
  return (
    <button
      className={`flex gap-2 rounded p-2 text-left disabled:cursor-not-allowed ${
        isActive ? "bg-light-4xl-gray dark:bg-dark-4xl-gray" : ""
      }`}
      disabled={isDisabled}
      onClick={onClick}
    >
      <ColoredIcon {...{ icon, isDisabled }} />
      <div>{content}</div>
    </button>
  );
}
