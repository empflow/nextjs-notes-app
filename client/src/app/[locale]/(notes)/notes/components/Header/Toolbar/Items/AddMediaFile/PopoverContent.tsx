import useGetContext from "@/app/hooks/useGetContext";
import AddMediaFileBtn from "./Btn";
import AddMediaFileCancelBtn from "./CancelBtn";
import { AddMediaFileContext } from "./Context";
import AddMediaFileDragAndDropHint from "./DragAndDropHint";
import DropZone from "./DropZone";
import AddMediaFileFileInput from "./FileInput";
import AddMediaFileFilePreview from "./FilePreview";

export default function AddMediaFilePopoverContent() {
  const { isMenuOpen } = useGetContext(AddMediaFileContext);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-1">
      {isMenuOpen && <DropZone />}
      <div className="blue-outline flex flex-col gap-2  rounded border-2 border-dashed border-light-2xl-gray bg-light-5xl-gray p-2 dark:border-dark-2xl-gray dark:bg-dark-5xl-gray">
        <AddMediaFileDragAndDropHint />
        <AddMediaFileBtn />
        <AddMediaFileFileInput />
        <AddMediaFileCancelBtn />
        <AddMediaFileFilePreview />
      </div>
    </form>
  );
}
