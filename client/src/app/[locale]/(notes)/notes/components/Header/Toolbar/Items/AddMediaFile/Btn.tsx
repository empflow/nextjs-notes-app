import SmallBtn from "@/app/components/buttons/Small";
import useUploadMediaFileMutation from "@/app/hooks/reactQuery/useUploadMediaFileMutation";
import useGetContext from "@/app/hooks/useGetContext";
import { useTranslations } from "next-intl";
import { AddMediaFileContext } from "./Context";
import Loading from "@/app/components/Loading";

export default function AddMediaFileBtn() {
  const { menuState, fileInputRef } = useGetContext(AddMediaFileContext);
  const t = useTranslations("Toolbar.addMediaFile");
  const { isLoading, mutate } = useUploadMediaFileMutation();
  const translationKey = getTranslationKey();

  const handleChooseFile = () => fileInputRef?.current?.click();
  const handleUploadFile = () => mutate();

  async function onClick() {
    if (menuState === "chooseFile") handleChooseFile();
    else if (menuState === "uploadFile") handleUploadFile();
  }

  return (
    <SmallBtn onClick={onClick} style={{ display: "flex", gap: "8px" }}>
      {isLoading && <Loading pxSize={22} backgroundColor="white" />}
      <p>{t(translationKey)}</p>
    </SmallBtn>
  );

  function getTranslationKey() {
    switch (menuState) {
      case "chooseFile":
        return "chooseMediaFileBtnText";
      case "uploadFile":
        return "uploadBtnText";
      case "uploadingFile":
        return "uploadingBtnText";
    }
  }
}
