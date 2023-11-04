import SmallBtn from "@/app/components/buttons/Small";
import useGetContext from "@/app/hooks/useGetContext";
import useSelectedTag from "@/app/hooks/useSelectedTag";
import NotesContext from "@/contexts/NotesContext";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";

export default function NoNotes() {
  const t = useTranslations("Notes");
  const { selectedTagId, setSelectedTagId } = useGetContext(NotesContext);
  const selectedTag = useSelectedTag();
  let content: ReactNode;

  function handleResetFilter() {
    setSelectedTagId(null);
  }

  if (!selectedTagId || !selectedTag) content = t("noNotes");
  else {
    content = (
      <>
        <p>{t("noNotesForThisTag", { tagName: selectedTag.name })}</p>
        <SmallBtn onClick={handleResetFilter}>{t("resetFilter")}</SmallBtn>
      </>
    );
  }

  return (
    <div className="flex-grow">
      <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-lg text-light-gray">
        {content}
      </div>
    </div>
  );
}
