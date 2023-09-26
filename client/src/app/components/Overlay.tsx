"use client";
import { SetState } from "@/utils/types";
import { useEffect, useRef } from "react";
import ReactDom from "react-dom";

interface TProps {
  isActive: boolean;
  setIsActive: SetState<boolean>;
  transparent?: boolean;
}

export default function Overlay({
  isActive,
  setIsActive,
  transparent = false,
}: TProps) {
  const portalContainer = useRef<HTMLElement | null>(null);

  useEffect(() => {
    portalContainer.current = document.getElementById("popover-overlays");
  }, []);

  if (!portalContainer.current) return null;

  return ReactDom.createPortal(
    <div
      className={`absolute bottom-0 left-0 right-0 top-0 z-10 ${
        transparent ? "bg-transparent" : "bg-black/70"
      } ${isActive ? "opacity-100" : "pointer-events-none opacity-0"}`}
      onClick={() => setIsActive(false)}
    ></div>,
    portalContainer.current,
  );
}
