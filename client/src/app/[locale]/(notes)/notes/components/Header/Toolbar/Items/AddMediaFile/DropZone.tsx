import useWindowEventListener from "@/app/hooks/useWindowEventListener";
import { SetState } from "@/utils/types";
import useHandleFileInput from "./useHandleFileInput";

export default function DropZone() {
  const handleFileInput = useHandleFileInput();

  function onDragOver(e: globalThis.DragEvent) {
    e.preventDefault();
  }

  function onDrop(e: globalThis.DragEvent) {
    e.preventDefault();
    handleFileInput(e.dataTransfer?.files);
  }

  useWindowEventListener("dragover", onDragOver);
  useWindowEventListener("drop", onDrop);

  return null;
}
