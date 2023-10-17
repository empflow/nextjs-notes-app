import useGetContext from "@/app/hooks/useGetContext";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { AddMediaFileContext } from "./Context";

export default function AddMediaFileFilePreview() {
  const { mediaFiles: files } = useGetContext(AddMediaFileContext);
  const t = useTranslations("Toolbar.addMediaFile");

  const file = files?.[0];
  if (!file) return null;

  const previewImgSrc = URL.createObjectURL(file);
  const { name } = file;

  return (
    <div>
      <div className="relative">
        <Image src={previewImgSrc} alt={t("imageYouProvided")} fill={true} />
      </div>
      <img className="rounded" src={previewImgSrc} />
      <p className="truncate">{name}</p>
    </div>
  );
}
