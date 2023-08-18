import useGetContext from "@/app/hooks/useGetContext/useGetContext";
import { SetState } from "@/utils/types";
import { useTranslations } from "next-intl";
import { NotesContext } from "../../../page";

interface INoteProps {
  title: string;
  desc: string;
  isSelected: boolean;
  _id: string;
}

export default function Note({ desc, title, isSelected, _id }: INoteProps) {
  const { setSelectedNoteId } = useGetContext(NotesContext);
  const t = useTranslations("Notes");

  const truncateClassName = "overflow-hidden text-ellipsis whitespace-nowrap";
  title = !title ? t("noTitle") : title;
  desc = !desc ? t("noAdditionalText") : desc;

  return (
    <div
      className={`box-border flex flex-col rounded border-b-8 p-[10px] ${
        isSelected ? "bg-light-5xl-blue dark:bg-dark-blue" : ""
      }`}
      onClick={() => setSelectedNoteId(_id)}
    >
      <div className={`${truncateClassName}`}>{title}</div>
      <div className={`${truncateClassName}`}>{desc}</div>
    </div>
  );
}
