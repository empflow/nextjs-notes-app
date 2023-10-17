import useGetContext from "@/app/hooks/useGetContext";
import checkFileFormat from "@/utils/mediaFileCheckFileFormat";
import { useTranslations } from "next-intl";
import { AddMediaFileContext } from "./Context";

export default function useHandleFileInput() {
  const t = useTranslations("Toolbar.addMediaFile");
  const { setMediaFiles, setMenuState } = useGetContext(AddMediaFileContext);

  async function handleFileInput(files?: FileList | null) {
    if (files?.length) {
      const errMsg = t("unsupportedFileFormat");
      const fileFormatOk = await checkFileFormat(files, errMsg);
      if (!fileFormatOk) return;

      setMenuState("uploadFile");
      setMediaFiles(files);
    }
  }

  return handleFileInput;
}
