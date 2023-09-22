import { SetState } from "@/utils/types";
import { ReactNode, useEffect, useRef } from "react";

interface TProps {
  children: ReactNode;
  state: [boolean, SetState<boolean>];
}

export default function Popover({
  children,
  state: [isOpen, setIsOpen],
}: TProps) {
  const popoverRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("click", onClickOutsideDropdown);
    return () => document.removeEventListener("click", onClickOutsideDropdown);
  }, []);

  function onClickOutsideDropdown(e: globalThis.MouseEvent) {
    const popover = popoverRef.current;
    if (!(e.target instanceof Node)) return;

    const isClickOutsidePopover = !popover?.contains(e.target);
    if (isClickOutsidePopover) setIsOpen(false);
  }

  // TODO: make popover half-transparent
  return (
    <div
      className={`relative border border-red-500 duration-100 ${
        isOpen ? "opacity-100 ponter-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded border border-white"
        ref={popoverRef}
      >
        {children}
      </div>
    </div>
  );
}
