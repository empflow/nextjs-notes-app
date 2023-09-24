"use client";

import { ReactNode, useState } from "react";
import { ToolbarContext } from "./Context";

interface TProps {
  children: ReactNode;
}

export default function ToolbarContextProviders({ children }: TProps) {
  const [isFormatTextMenuOpen, setIsFormatTextMenuOpen] = useState(false);

  return (
    <ToolbarContext.Provider
      value={{ isFormatTextMenuOpen, setIsFormatTextMenuOpen }}
    >
      {children}
    </ToolbarContext.Provider>
  );
}
