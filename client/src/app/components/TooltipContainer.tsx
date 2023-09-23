"use client";
import TooltipContainerContext from "@/contexts/TooltipContainerContext";
import { ReactNode, useRef, useState } from "react";

interface TProps {
  children: ReactNode;
}

export default function TooltipContainer({ children }: TProps) {
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
    >
      <TooltipContainerContext.Provider value={{ showTooltips }}>
        {children}
      </TooltipContainerContext.Provider>
    </div>
  );
}
