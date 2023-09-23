"use client";

import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import ToolbarItem from "./Item";
import UndoIcon from "@/icons/svg/undo.svg";
import RedoIcon from "@/icons/svg/redo.svg";
import TooltipContainer from "@/app/components/TooltipContainer";
import Tooltip from "@/app/components/Tooltip";
import { useTranslations } from "next-intl";

export default function Toolbar() {
  const t = useTranslations("Toolbar.tooltips");
  const { editor } = useGetContext(NotesContext);
  if (!editor) return null;

  return (
    <div className="flex gap-1">
      <TooltipContainer>
        <ToolbarItem
          tooltipText={t("undo")}
          disabled={!editor.can().chain().focus().undo().run()}
          onClick={() => editor.chain().focus().undo().run()}
          icon={<UndoIcon />}
        />
      </TooltipContainer>
    </div>
  );
}
