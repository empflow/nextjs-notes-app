import useGetContext from "@/app/hooks/useGetContext/useGetContext";
import { SetState } from "@/utils/types";
import { useTranslations } from "next-intl";
import { NotesContext } from "../../../page";

interface INoteProps {
  title: string;
  desc: string;
  isSelected: boolean;
  isAboveSelectedNote: boolean;
  _id: string;
}

export default function Note({
  desc,
  title,
  isSelected,
  _id,
  isAboveSelectedNote,
}: INoteProps) {
  const { setSelectedNoteId } = useGetContext(NotesContext);
  const t = useTranslations("Notes");

  const truncateClassName = "overflow-hidden text-ellipsis whitespace-nowrap";
  title = !title ? t("noTitle") : title;
  desc = !desc ? t("noAdditionalText") : desc;

  return (
    <div
      className={`box-border flex flex-col rounded-t border-b border-light-2xl-gray p-[10px] dark:border-dark-3xl-gray ${
        isSelected
          ? "rounded-b border-transparent bg-light-5xl-blue dark:bg-dark-blue"
          : ""
      } ${isAboveSelectedNote ? "border-transparent" : ""}`}
      onClick={() => setSelectedNoteId(_id)}
    >
      <div className={`${truncateClassName}`}>{title}</div>
      <div className={`${truncateClassName}`}>{desc}</div>
    </div>
  );
}
