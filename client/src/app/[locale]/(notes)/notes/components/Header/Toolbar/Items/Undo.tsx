import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import { useTranslations } from "next-intl";
import ToolbarItem from "./ToolbarItem";
import UndoIcon from "@/icons/svg/undo.svg";

export default function Undo() {
  const t = useTranslations("Toolbar.tooltips");
  const { editor } = useGetContext(NotesContext);

  return (
    <ToolbarItem
      tooltipText={t("undo")}
      isDisabled={!editor?.can().chain().focus().undo().run()}
      onClick={() => editor?.chain().focus().undo().run()}
      icon={<UndoIcon />}
    />
  );
}
