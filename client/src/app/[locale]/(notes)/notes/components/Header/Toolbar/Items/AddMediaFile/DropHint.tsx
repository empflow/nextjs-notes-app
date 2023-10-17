import useGetContext from "@/app/hooks/useGetContext";
import { useTranslations } from "next-intl";
import { ToolbarContext } from "../../Context";

interface TProps {
  isDraggingOver: boolean;
}

export default function AddMediaFileDropHint({ isDraggingOver }: TProps) {
  const { mediaFiles: files } = useGetContext(ToolbarContext);
  const t = useTranslations("Toolbar.addMediaFile");
  if (!isDraggingOver) return null;

  let msg: string;
  console.log(files);
  if (!!files?.length) msg = t("releaseMouseToReplaceFile");
  else msg = t("releaseMouseToAddFile");

  return <p>{msg}</p>;
}
