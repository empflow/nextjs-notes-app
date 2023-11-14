import SmallBtn from "@/app/components/buttons/Small";
import useGetContext from "@/app/hooks/useGetContext";
import { useTranslations } from "next-intl";
import AddIcon from "@/icons/svg/add.svg";
import NotesContext from "@/app/[locale]/(notes)/notes/NotesContext";

export default function FilterModalAddTagBtn() {
  const t = useTranslations("Tags");
  const { setIsAddTagModalOpen } = useGetContext(NotesContext);

  function handleClick() {
    setIsAddTagModalOpen(true);
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
