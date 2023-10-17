import useGetContext from "@/app/hooks/useGetContext";
import checkFileFormat from "@/utils/mediaFileCheckFileFormat";
import { useTranslations } from "next-intl";
import { ToolbarContext } from "../../Context";

export default function useHandleFileInput() {
  const t = useTranslations("Toolbar.addMediaFile");
  const { setMediaFiles, setAddMediaFileMenuState } =
    useGetContext(ToolbarContext);

  async function handleFileInput(files?: FileList | null) {
    if (files?.length) {
      const errMsg = t("unsupportedFileFormat");
      const fileFormatOk = await checkFileFormat(files, errMsg);
      if (!fileFormatOk) return;

      setAddMediaFileMenuState("uploadFile");
      setMediaFiles(files);
    }
  }

  return handleFileInput;
}
