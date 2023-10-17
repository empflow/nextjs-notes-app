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
  const [isAddMediaFileMenuOpen, setIsAddMediaFileMenuOpen] = useState(false);
  const [mediaFileId, setMediaFileId] = useState<string | null>(null);
  const [mediaFiles, setMediaFiles] = useState<FileList | null>(null);
  const [addMediaFileMenuState, setAddMediaFileMenuState] =
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

        isAddMediaFileMenuOpen,
        setIsAddMediaFileMenuOpen,
        mediaFileId,
        setMediaFileId,
        mediaFiles,
        setMediaFiles,
        addMediaFileMenuState,
        setAddMediaFileMenuState,
      }}
    >
      {children}
    </ToolbarContext.Provider>
  );
}
