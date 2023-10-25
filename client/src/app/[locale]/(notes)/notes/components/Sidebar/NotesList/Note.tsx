import useGetContext from "@/app/hooks/useGetContext";
import { useTranslations } from "next-intl";
import NotesContext from "@/contexts/NotesContext";
import Skeleton from "react-loading-skeleton";
import { TNoteSchema } from "@shared/schemas/note";
import { useCallback } from "react";

interface TNoteProps {
  state?: "normal" | "loading";
  title?: TNoteSchema["title"];
  description?: TNoteSchema["description"];
  isSelected?: boolean;
  isAboveSelectedNote?: boolean;
  _id?: string;
}

export default function Note({
  description,
  title,
  isSelected,
  _id,
  isAboveSelectedNote,
  state = "normal",
}: TNoteProps) {
  const { setSelectedNoteId, setHideEditorOnMobile, hideEditorOnMobile } =
    useGetContext(NotesContext);
  const t = useTranslations("Notes");
  const isHighlighted = isSelected && !hideEditorOnMobile;
  const isBorderTransparent =
    isHighlighted || (isAboveSelectedNote && !hideEditorOnMobile);

  if (state === "normal") {
    title = !title ? t("noTitle") : title;
    description = !description ? t("noAdditionalText") : description;
  }

  let borderColor: undefined | string = undefined;
  if (isBorderTransparent) borderColor = "transparent";

  const handleSelectNote = useCallback(function (_id: string) {
    setHideEditorOnMobile(false);
    setSelectedNoteId(_id);
  }, []);

  return (
    <div
      className={`flex flex-col rounded-t border-b border-light-2xl-gray p-[14px] last:border-transparent dark:border-dark-4xl-gray dark:last:border-transparent ${
        isHighlighted ? "rounded-b bg-light-5xl-blue dark:bg-dark-blue" : ""
      } ${state === "normal" ? "cursor-pointer" : ""}`}
      style={{ borderColor }}
      onClick={_id ? () => handleSelectNote(_id) : undefined}
    >
      <div className="truncate">{title || <Skeleton />}</div>
      <div
        className={`truncate  ${
          isHighlighted
            ? "text-dark-2xl-gray dark:text-light-xl-gray"
            : "text-dark-gray dark:text-gray"
        }`}
      >
        {description || <Skeleton />}
      </div>
    </div>
  );
}
