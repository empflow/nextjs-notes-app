import { SetState } from "@/utils/types";
import { MouseEvent, ReactNode } from "react";
import ReactDom from "React-dom";
import useIsScreenWidthOverBreakpoint from "../hooks/useIsScreenWidthOverBreakpoint";
import useQuerySelector from "../hooks/useQuerySelector";
import Overlay from "./Overlay";

interface TProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: SetState<boolean>;
}

export default function Modal({ children, isOpen, setIsOpen }: TProps) {
  const isMobile = !useIsScreenWidthOverBreakpoint("md");
  const portalContainer = useQuerySelector<HTMLDivElement>("#modals");
  if (!portalContainer) return null;

  function onClick(e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) {
    e.stopPropagation();
  }

  return ReactDom.createPortal(
    <Overlay
      centerChildren={true}
      isActive={isOpen}
      setIsActive={setIsOpen}
      blurred={true}
    >
      <div
        onClick={onClick}
        className="w-full max-w-[600px] rounded border border-light-2xl-gray bg-light-5xl-gray p-2 dark:border-dark-3xl-gray dark:bg-dark-5xl-gray md:p-4"
      >
        {children}
      </div>
    </Overlay>,
    portalContainer,
  );
}
