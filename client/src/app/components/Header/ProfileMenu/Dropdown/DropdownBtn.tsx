import { cloneElement, MouseEvent, ReactNode } from "react";

interface TProps {
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  text: string;
  icon?: any;
  children?: ReactNode;
  hoverable?: boolean;
}

const iconProps = {
  width: 22,
  className: "fill-l-accent dark:fill-d-accent",
};

export default function ProfileMenuDropdownBtn({
  onClick,
  text,
  icon,
  children,
  hoverable = true,
}: TProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 rounded p-2  ${
        hoverable ? "hover:bg-light-5xl-gray dark:hover:bg-dark-4xl-gray" : ""
      }`}
    >
      {icon && cloneElement(icon, iconProps)}
      <div>{text}</div>
      {children}
    </button>
  );
}
