"use client";
import TooltipContainerContext from "@/contexts/TooltipContainerContext";
import { ReactNode, useRef, useState } from "react";

interface TProps {
  children: ReactNode;
  className?: string;
  tooltipsTop?: number;
}

export default function TooltipContainer({
  children,
  className,
  tooltipsTop,
}: TProps) {
  const [showTooltips, setShowTooltips] = useState(false);
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const showTooltipsAfterMs = 800;

  function showTooltipAfterDelay() {
    timeout.current = setTimeout(
      () => setShowTooltips(true),
      showTooltipsAfterMs,
    );
  }

  function hideTooltip() {
    if (!timeout.current) return;
    clearTimeout(timeout.current);
    setShowTooltips(false);
  }

  return (
    <div
      onMouseEnter={showTooltipAfterDelay}
      onMouseLeave={hideTooltip}
      onTouchStart={showTooltipAfterDelay}
      onTouchEnd={hideTooltip}
      className={className}
    >
      <TooltipContainerContext.Provider
        value={{ showTooltips, top: tooltipsTop }}
      >
        {children}
      </TooltipContainerContext.Provider>
    </div>
  );
}
