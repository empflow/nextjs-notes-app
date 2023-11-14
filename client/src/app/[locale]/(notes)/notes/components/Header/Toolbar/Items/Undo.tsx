import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/app/[locale]/(notes)/notes/NotesContext";
import { useTranslations } from "next-intl";
import ToolbarItem from "./ToolbarItem";
import UndoIcon from "@/icons/svg/undo.svg";

export default function Undo() {
  const t = useTranslations("Toolbar.tooltips");
  const { editor, selectedNoteId } = useGetContext(NotesContext);
  const isDisabled =
    !selectedNoteId || !editor?.can().chain().focus().undo().run();

  return (
    <ToolbarItem
      tooltipText={t("undo")}
      isDisabled={isDisabled}
      onClick={() => editor?.chain().focus().undo().run()}
      icon={<UndoIcon />}
    />
  );
}
