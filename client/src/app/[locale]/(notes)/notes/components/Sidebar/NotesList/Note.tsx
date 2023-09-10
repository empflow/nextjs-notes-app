import useGetContext from "@/app/hooks/useGetContext";
import { useTranslations } from "next-intl";
import NotesContext from "@/contexts/NotesContext";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Property as CSSProperty } from "csstype";

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

  let borderColor: undefined | CSSProperty.BorderColor = undefined;
  if (isSelected || isAboveSelectedNote) borderColor = "transparent";

  return (
    <div
      className={`flex flex-col rounded-t border-b border-light-2xl-gray p-[14px] last:border-transparent dark:border-dark-3xl-gray dark:last:border-transparent ${
        isSelected ? "rounded-b bg-light-5xl-blue dark:bg-dark-blue" : ""
      } ${state === "normal" ? "cursor-pointer" : ""}`}
      style={{ borderColor }}
      onClick={_id ? () => setSelectedNoteId(_id) : () => {}}
    >
      <div className="truncate">{title || <Skeleton />}</div>
      <div className="truncate">{desc || <Skeleton />}</div>
    </div>
  );
}
