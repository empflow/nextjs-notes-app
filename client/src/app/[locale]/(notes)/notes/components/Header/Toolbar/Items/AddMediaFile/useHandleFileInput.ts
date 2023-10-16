import checkFileFormat from "@/utils/mediaFileCheckFileFormat";
import { SetState } from "@/utils/types";
import { useTranslations } from "next-intl";
import { TAddMediaFileState } from "./PopoverContent";

export default function useHandleFileInput(
  setState: SetState<TAddMediaFileState>,
  setFiles: SetState<FileList | null>,
) {
  const t = useTranslations("Toolbar.addMediaFile");

  async function handleFileInput(files?: FileList | null) {
    if (files?.length) {
      const errMsg = t("unsupportedFileFormat");
      const fileFormatOk = await checkFileFormat(files, errMsg);
      if (!fileFormatOk) return;

      setState("uploadFile");
      setFiles(files);
    }
  }

  return handleFileInput;
}
