"use client";
import { useEffect, useRef } from "react";
import ReactDom from "react-dom";

interface TProps {
  onClick: () => unknown;
  isActive: boolean;
  transparent?: boolean;
}

export default function PopoverBgOverlay({
  isActive,
  onClick,
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
      } ${isActive ? "opacity-100" : "opacity-0"}`}
      onClick={onClick}
    ></div>,
    portalContainer.current,
  );
}
