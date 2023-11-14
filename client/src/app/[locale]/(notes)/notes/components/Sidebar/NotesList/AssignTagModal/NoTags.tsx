import MediumBtn from "@/app/components/buttons/Medium";
import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/app/[locale]/(notes)/notes/NotesContext";
import { useTranslations } from "next-intl";

export default function AssignTagModalNoTags() {
  const t = useTranslations("Tags");
  const { setIsAssignTagModalOpen, setIsAddTagModalOpen } =
    useGetContext(NotesContext);

  function handleClick() {
    setIsAssignTagModalOpen(false);
    setIsAddTagModalOpen(true);
  }

  return (
    <div className="flex flex-col">
      <p>{t("noTags")}</p>
      <MediumBtn onClick={handleClick}>{t("addTag")}</MediumBtn>
    </div>
  );
}
