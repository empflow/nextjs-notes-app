import SmallBtn from "@/app/components/buttons/Small";
import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import checkFileFormat from "@/utils/mediaFileCheckFileFormat";
import { TTranslations } from "@/utils/types";
import { useTranslations } from "next-intl";
import { ChangeEvent, ReactNode, useEffect, useRef, useState } from "react";
import { ToolbarContext } from "../../Context";
import AddMediaFileBtn from "./Btn";
import AddMediaFileCancelBtn from "./CancelBtn";
import DropZone from "./DropZone";
import AddMediaFileFilePreview from "./FilePreview";
import useHandleFileInput from "./useHandleFileInput";

export type TAddMediaFileState = "chooseFile" | "uploadFile" | "uploadingFile";

export default function AddMediaFilePopoverContent() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [state, setState] = useState<TAddMediaFileState>("chooseFile");
  const [files, setFiles] = useState<FileList | null>(null);
  const t = useTranslations("Toolbar.addMediaFile");
  const { isAddMediaFileMenuOpen } = useGetContext(ToolbarContext);
  const { editor } = useGetContext(NotesContext);
  const handleFileInput = useHandleFileInput(setState, setFiles);

  async function onFileInputChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const files = e.target.files;
    await handleFileInput(files);
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-1">
      {isAddMediaFileMenuOpen && (
        <DropZone
          setState={setState}
          setFiles={setFiles}
          setIsDraggingOver={setIsDraggingOver}
        />
      )}
      <label
        role="input"
        className="blue-outline flex flex-col gap-2  rounded border-2 border-dashed border-light-2xl-gray bg-light-5xl-gray p-2 dark:border-dark-2xl-gray dark:bg-dark-5xl-gray"
      >
        {!files?.length && (
          <p className="text-center text-lg">{t("dragAndDrop")}</p>
        )}

        <AddMediaFileBtn state={state} />
        <AddMediaFileCancelBtn {...{ files, setFiles, setState }} />
        <input
          hidden
          ref={fileInputRef}
          className="hidden"
          type="file"
          accept="image/*,video/*"
          onChange={onFileInputChange}
        />
        <AddMediaFileFilePreview files={files} />
      </label>
    </form>
  );
}

function getBtnText(t: TTranslations, state: TAddMediaFileState) {
  switch (state) {
    case "chooseFile":
      return "chooseMediaFileBtnText";
    case "uploadFile":
      return "uploadBtnText";
    case "uploadingFile":
      return "uploadingBtnText";
  }
}
