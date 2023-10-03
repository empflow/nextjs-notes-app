"use client";

import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import ToolbarItem from "./Items/Item";
import UndoIcon from "@/icons/svg/undo.svg";
import RedoIcon from "@/icons/svg/redo.svg";
import ImageIcon from "@/icons/svg/image.svg";
import TableIcon from "@/icons/svg/table.svg";
import TooltipContainer from "@/app/components/TooltipContainer";
import { useTranslations } from "next-intl";
import FormatText from "./Items/FormatText/FormatText";
import ToolbarContextProviders from "./ContextProviders";
import AddLink from "./Items/AddLink/AddLink";

export default function Toolbar() {
  const t = useTranslations("Toolbar.tooltips");
  const { editor } = useGetContext(NotesContext);

  return (
    <ToolbarContextProviders>
      <TooltipContainer className="flex lg:m-auto">
        <FormatText />
        <ToolbarItem
          tooltipText={t("addImage")}
          isDisabled={!editor?.can().chain().focus().redo().run()}
          onClick={() => editor?.chain().focus().redo().run()}
          icon={<ImageIcon />}
        />
        <AddLink />
        <ToolbarItem
          tooltipText={t("addTable")}
          isDisabled={!editor?.can().chain().focus().redo().run()}
          onClick={() => editor?.chain().focus().redo().run()}
          icon={<TableIcon />}
        />
        <ToolbarItem
          tooltipText={t("undo")}
          isDisabled={!editor?.can().chain().focus().undo().run()}
          onClick={() => editor?.chain().focus().undo().run()}
          icon={<UndoIcon />}
        />
        <ToolbarItem
          tooltipText={t("redo")}
          isDisabled={!editor?.can().chain().focus().redo().run()}
          onClick={() => editor?.chain().focus().redo().run()}
          icon={<RedoIcon />}
        />
      </TooltipContainer>
    </ToolbarContextProviders>
  );
}
