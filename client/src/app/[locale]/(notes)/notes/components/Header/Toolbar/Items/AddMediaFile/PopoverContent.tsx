import useGetContext from "@/app/hooks/useGetContext";
import { ChangeEvent, useRef, useState } from "react";
import { ToolbarContext } from "../../Context";
import AddMediaFileBtn from "./Btn";
import AddMediaFileCancelBtn from "./CancelBtn";
import AddMediaFileDragAndDropHint from "./DragAndDropHint";
import AddMediaFileDropHint from "./DropHint";
import DropZone from "./DropZone";
import AddMediaFileFilePreview from "./FilePreview";
import useHandleFileInput from "./useHandleFileInput";

export default function AddMediaFilePopoverContent() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const { isAddMediaFileMenuOpen } = useGetContext(ToolbarContext);
  const handleFileInput = useHandleFileInput();

  async function onFileInputChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const files = e.target.files;
    await handleFileInput(files);
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-1">
      {isAddMediaFileMenuOpen && (
        <DropZone setIsDraggingOver={setIsDraggingOver} />
      )}
      <label
        role="input"
        className="blue-outline flex flex-col gap-2  rounded border-2 border-dashed border-light-2xl-gray bg-light-5xl-gray p-2 dark:border-dark-2xl-gray dark:bg-dark-5xl-gray"
      >
        <AddMediaFileDragAndDropHint />

        <AddMediaFileBtn />
        <AddMediaFileCancelBtn />
        <input
          hidden
          ref={fileInputRef}
          className="hidden"
          type="file"
          accept="image/*,video/*"
          onChange={onFileInputChange}
        />
        <AddMediaFileDropHint {...{ isDraggingOver }} />
        <AddMediaFileFilePreview />
      </label>
    </form>
  );
}
