import SmallBtn from "@/app/components/buttons/Small";
import useGetContext from "@/app/hooks/useGetContext";
import { useTranslations } from "next-intl";
import { ToolbarContext } from "../../Context";

export default function AddMediaFileBtn() {
  const { addMediaFileMenuState: state } = useGetContext(ToolbarContext);
  const t = useTranslations("Toolbar.addMediaFile");

  if (state === "chooseFile") {
    return <SmallBtn>{t("chooseMediaFileBtnText")}</SmallBtn>;
  }
  if (state === "uploadFile") {
    return <SmallBtn>{t("uploadBtnText")}</SmallBtn>;
  }
  if (state === "uploadingFile") {
    return <SmallBtn>{t("uploadingBtnText")}</SmallBtn>;
  }

  return null;
}
