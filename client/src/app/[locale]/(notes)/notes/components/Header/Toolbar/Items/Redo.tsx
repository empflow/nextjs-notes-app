import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import { useTranslations } from "next-intl";
import ToolbarItem from "./Item";
import RedoIcon from "@/icons/svg/redo.svg";

export default function Redo() {
  const t = useTranslations("Toolbar.tooltips");
  const { editor } = useGetContext(NotesContext);

  return (
    <ToolbarItem
      tooltipText={t("redo")}
      isDisabled={!editor?.can().chain().focus().redo().run()}
      onClick={() => editor?.chain().focus().redo().run()}
      icon={<RedoIcon />}
    />
  );
}
