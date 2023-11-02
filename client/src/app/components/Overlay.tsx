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
  blurred?: boolean;
  centerChildren?: boolean;
  usePortal?: boolean;
}

export default function Overlay({
  isActive,
  setIsActive,
  transparent = false,
  blurred = false,
  children,
  portalSelector = "#popover-overlays",
  centerChildren = false,
  usePortal = true,
  ...attributes
}: TProps) {
  const portalContainer = useQuerySelector(portalSelector);
  if (!portalContainer) return null;

  const content = (
    <div
      className={`fixed bottom-0 left-0 right-0 top-0 z-20 p-4 duration-100 ${
        transparent ? "bg-transparent" : "bg-black/70"
      } ${blurred ? "backdrop-blur-sm" : "backdrop-blur-none"} ${
        isActive ? "opacity-100" : "pointer-events-none opacity-0"
      } ${centerChildren ? "flex flex-col items-center justify-center" : ""}`}
      onClick={(e) => {
        e.stopPropagation();
        if (setIsActive) setIsActive(false);
      }}
      {...attributes}
    >
      <div
        className="flex w-full items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );

  if (!usePortal) return content;

  return ReactDom.createPortal(content, portalContainer);
}
