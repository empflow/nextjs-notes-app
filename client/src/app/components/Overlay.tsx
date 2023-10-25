"use client";
import NotesContext from "@/contexts/NotesContext";
import { SetState } from "@/utils/types";
import {
  HTMLAttributes,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from "react";
import ReactDom from "react-dom";
import useGetContext from "../hooks/useGetContext";
import useQuerySelector from "../hooks/useQuerySelector";

interface TProps extends HTMLAttributes<HTMLDivElement> {
  isActive: boolean;
  setIsActive?: SetState<boolean>;
  transparent?: boolean;
  children?: ReactNode;
  portalSelector?: string;
}

export default function Overlay({
  isActive,
  setIsActive,
  transparent = false,
  children,
  portalSelector = "#popover-overlays",
  ...attributes
}: TProps) {
  const portalContainer = useQuerySelector(portalSelector);
  if (!portalContainer) return null;

  return ReactDom.createPortal(
    <div
      className={`fixed bottom-0 left-0 right-0 top-0 z-20 ${
        transparent ? "bg-transparent" : "bg-black/70"
      } ${isActive ? "opacity-100" : "pointer-events-none opacity-0"}`}
      onClick={setIsActive ? () => setIsActive(false) : undefined}
      {...attributes}
    >
      {children}
    </div>,
    portalContainer,
  );
}
