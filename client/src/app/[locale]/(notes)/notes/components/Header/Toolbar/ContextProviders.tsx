"use client";

import { ReactNode, useState } from "react";
import { TAddMediaFileState, ToolbarContext } from "./Context";

interface TProps {
  children: ReactNode;
}

export default function ToolbarContextProviders({ children }: TProps) {
  const [isFormatTextMenuOpen, setIsFormatTextMenuOpen] = useState(false);
  const [link, setLink] = useState("");
  const [isAddLinkMenuOpen, setIsAddLinkMenuOpen] = useState(false);
  useState<TAddMediaFileState>("chooseFile");

  return (
    <ToolbarContext.Provider
      value={{
        isFormatTextMenuOpen,
        setIsFormatTextMenuOpen,

        link,
        setLink,
        isAddLinkMenuOpen,
        setIsAddLinkMenuOpen,
      }}
    >
      {children}
    </ToolbarContext.Provider>
  );
}
