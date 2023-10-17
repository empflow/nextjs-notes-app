import useGetContext from "@/app/hooks/useGetContext";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ToolbarContext } from "../../Context";

export default function AddMediaFileFilePreview() {
  const { mediaFiles: files } = useGetContext(ToolbarContext);
  const t = useTranslations("Toolbar.addMediaFile");

  if (!files) return null;
  const file = files[0];
  if (!file) return null;

  console.log(file);
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
