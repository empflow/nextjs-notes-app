import { SetState } from "@/utils/types";
import { ButtonHTMLAttributes, MouseEventHandler, ReactNode } from "react";

interface TProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  setIsPopoverMenuOpen: SetState<boolean>;
}

export default function TagActionsPopoverBtn({
  children,
  onClick,
  setIsPopoverMenuOpen,
  ...attrs
}: TProps) {
  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    setIsPopoverMenuOpen(false);
    onClick(e);
  };

  return (
    <button
      className="w-full rounded px-2 py-1 text-left hover:bg-light-4xl-gray disabled:text-gray"
      {...attrs}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
