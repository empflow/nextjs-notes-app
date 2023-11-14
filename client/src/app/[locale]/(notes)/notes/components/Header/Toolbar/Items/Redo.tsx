import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/app/[locale]/(notes)/notes/NotesContext";
import { useTranslations } from "next-intl";
import ToolbarItem from "./ToolbarItem";
import RedoIcon from "@/icons/svg/redo.svg";

export default function Redo() {
  const t = useTranslations("Toolbar.tooltips");
  const { editor, selectedNoteId } = useGetContext(NotesContext);
  const isDisabled =
    !selectedNoteId || !editor?.can().chain().focus().redo().run();

  return (
    <ToolbarItem
      tooltipText={t("redo")}
      isDisabled={isDisabled}
      onClick={() => editor?.chain().focus().redo().run()}
      icon={<RedoIcon />}
    />
  );
}
