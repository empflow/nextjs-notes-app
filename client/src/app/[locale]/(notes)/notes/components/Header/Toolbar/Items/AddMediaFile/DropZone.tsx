import useWindowEventListener from "@/app/hooks/useWindowEventListener";
import { SetState } from "@/utils/types";
import useHandleFileInput from "./useHandleFileInput";

interface TProps {
  setIsDraggingOver?: SetState<boolean>;
}

export default function DropZone({ setIsDraggingOver }: TProps) {
  const handleFileInput = useHandleFileInput();

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
