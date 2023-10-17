import useGetContext from "@/app/hooks/useGetContext";
import { ChangeEvent } from "react";
import { AddMediaFileContext } from "./Context";
import useHandleFileInput from "./useHandleFileInput";

export default function AddMediaFileFileInput() {
  const { fileInputRef } = useGetContext(AddMediaFileContext);
  const handleFileInput = useHandleFileInput();

  async function onFileInputChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    await handleFileInput(files);
  }

  return (
    <input
      hidden
      ref={fileInputRef}
      className="hidden"
      type="file"
      accept="image/*,video/*"
      onChange={onFileInputChange}
    />
  );
}
