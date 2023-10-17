import useGetContext from "@/app/hooks/useGetContext";
import { useTranslations } from "next-intl";
import { AddMediaFileContext } from "./Context";

export default function AddMediaFileDragAndDropHint() {
  const { mediaFiles } = useGetContext(AddMediaFileContext);
  const t = useTranslations("Toolbar.addMediaFile");
  if (!!mediaFiles?.length) return null;

  return <p className="text-center text-lg">{t("dragAndDrop")}</p>;
}
