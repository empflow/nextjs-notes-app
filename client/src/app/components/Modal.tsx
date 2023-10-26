import { SetState } from "@/utils/types";
import { CSSProperties, HTMLAttributes, ReactNode } from "react";
import ReactDom from "React-dom";
import useQuerySelector from "../hooks/useQuerySelector";
import Overlay from "./Overlay";

interface TProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: SetState<boolean>;
  overlayStyle?: CSSProperties;
}

export default function Modal({
  children,
  isOpen,
  setIsOpen,
  overlayStyle,
  ...attrs
}: TProps) {
  const portalContainer = useQuerySelector<HTMLDivElement>("#modals");
  if (!portalContainer) return null;

  return ReactDom.createPortal(
    <Overlay
      style={overlayStyle}
      centerChildren={true}
      isActive={isOpen}
      setIsActive={setIsOpen}
      blurred={true}
    >
      <div
        className="w-full max-w-[600px] rounded border border-light-2xl-gray bg-light-5xl-gray p-4 dark:border-dark-3xl-gray dark:bg-dark-5xl-gray md:p-6"
        {...attrs}
      >
        {children}
      </div>
    </Overlay>,
    portalContainer,
  );
}
