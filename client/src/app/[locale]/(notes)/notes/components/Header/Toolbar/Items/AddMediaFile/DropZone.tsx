import useWindowEventListener from "@/app/hooks/useWindowEventListener";
import { SetState } from "@/utils/types";
import { DragEvent, ReactNode, useEffect, useState } from "react";
import { TAddMediaFileState } from "./PopoverContent";
import notify from "@/utils/notify";
import { useTranslations } from "next-intl";
import { ALLOWED_IMG_EXTS } from "@shared/values";
import { filetypeinfo } from "magic-bytes.js";
import getFileType from "@/utils/getFileType";
import checkFileFormat from "@/utils/mediaFileCheckFileFormat";
import useHandleFileInput from "./useHandleFileInput";

interface TProps {
  setFiles: SetState<FileList | null>;
  setIsDraggingOver?: SetState<boolean>;
  setState: SetState<TAddMediaFileState>;
}

export default function DropZone({
  setFiles,
  setIsDraggingOver,
  setState,
}: TProps) {
  const handleFileInput = useHandleFileInput(setState, setFiles);

  function onDragOver(e: globalThis.DragEvent) {
    e.preventDefault();
    if (setIsDraggingOver) setIsDraggingOver(true);
  }

  function onDrop(e: globalThis.DragEvent) {
    e.preventDefault();
    handleFileInput(e.dataTransfer?.files);
    if (setIsDraggingOver) setIsDraggingOver(false);
  }

  useWindowEventListener("dragover", onDragOver);
  useWindowEventListener("drop", onDrop);

  return null;
}
