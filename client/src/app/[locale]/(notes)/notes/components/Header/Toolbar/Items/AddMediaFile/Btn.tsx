import SmallBtn from "@/app/components/buttons/Small";
import { useTranslations } from "next-intl";
import { TAddMediaFileState } from "./PopoverContent";

interface TProps {
  state: TAddMediaFileState;
}

export default function AddMediaFileBtn({ state }: TProps) {
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
