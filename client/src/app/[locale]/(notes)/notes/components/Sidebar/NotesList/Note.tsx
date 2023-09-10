import useGetContext from "@/app/hooks/useGetContext";
import { useTranslations } from "next-intl";
import NotesContext from "@/contexts/NotesContext";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

interface INoteProps {
  state?: "normal" | "loading";
  title?: string;
  desc?: string;
  isSelected?: boolean;
  isAboveSelectedNote?: boolean;
  _id?: string;
}

export default function Note({
  desc,
  title,
  isSelected,
  _id,
  isAboveSelectedNote,
  state = "normal",
}: INoteProps) {
  const { setSelectedNoteId } = useGetContext(NotesContext);
  const t = useTranslations("Notes");

  if (state === "normal") {
    title = !title ? t("noTitle") : title;
    desc = !desc ? t("noAdditionalText") : desc;
  }

  return (
    <div
      className={`flex flex-col rounded-t border-b border-light-2xl-gray p-[14px] dark:border-dark-3xl-gray ${
        isSelected
          ? "rounded-b border-transparent bg-light-5xl-blue dark:bg-dark-blue"
          : ""
      } ${isAboveSelectedNote ? "border-transparent" : ""}`}
      onClick={_id ? () => setSelectedNoteId(_id) : () => {}}
    >
      <div className="truncate">{title || <Skeleton />}</div>
      <div className="truncate">{desc || <Skeleton />}</div>
    </div>
  );
}
