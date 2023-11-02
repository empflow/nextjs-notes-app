import SmallBtn from "@/app/components/buttons/Small";
import useGetContext from "@/app/hooks/useGetContext";
import { useTranslations } from "next-intl";
import FilterModalContext from "./Context";
import AddIcon from "@/icons/svg/add.svg";

export default function FilterModalAddTagBtn() {
  const t = useTranslations("Tags");
  const { setIsAddTagPopupOpen } = useGetContext(FilterModalContext);

  function handleClick() {
    setIsAddTagPopupOpen(true);
  }

  return (
    <div>
      <SmallBtn className="flex gap-1" onClick={handleClick}>
        <AddIcon className="fill-white" />
        {t("addTag")}
      </SmallBtn>
    </div>
  );
}
