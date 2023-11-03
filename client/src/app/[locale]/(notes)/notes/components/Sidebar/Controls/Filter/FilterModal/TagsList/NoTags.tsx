import MediumBtn from "@/app/components/buttons/Medium";
import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import { useTranslations } from "next-intl";

export default function NoTags() {
  const t = useTranslations("Tags");
  const { setIsAddTagModalOpen } = useGetContext(NotesContext);

  return (
    <div className="flex flex-col">
      <p>{t("noTags")}</p>
      <MediumBtn onClick={() => setIsAddTagModalOpen((prev) => !prev)}>
        {t("addTag")}
      </MediumBtn>
    </div>
  );
}
