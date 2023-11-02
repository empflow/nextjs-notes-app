import SmallBtn from "@/app/components/buttons/Small";
import useGetContext from "@/app/hooks/useGetContext";
import { useTranslations } from "next-intl";
import FilterModalContext from "./Context";

export default function FilterModalAddTagBtn() {
  const t = useTranslations("Tags");
  const { setIsAddTagPopupOpen } = useGetContext(FilterModalContext);

  function handleClick() {
    setIsAddTagPopupOpen(true);
  }

  return (
    <div>
      <SmallBtn onClick={handleClick}>{t("addTag")}</SmallBtn>
    </div>
  );
}
