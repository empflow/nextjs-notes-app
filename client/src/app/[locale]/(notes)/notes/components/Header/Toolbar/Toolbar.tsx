"use client";

import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import ToolbarItem from "./Items/Item";
import RedoIcon from "@/icons/svg/redo.svg";
import TableIcon from "@/icons/svg/table.svg";
import TooltipContainer from "@/app/components/TooltipContainer";
import { useTranslations } from "next-intl";
import FormatText from "./Items/FormatText/FormatText";
import ToolbarContextProviders from "./ContextProviders";
import AddLink from "./Items/AddLink/AddLink";
import AddMediaFile from "./Items/AddMediaFile/AddMediaFile";
import Undo from "./Items/Undo";
import Redo from "./Items/Redo";

export default function Toolbar() {
  const t = useTranslations("Toolbar.tooltips");
  const { editor } = useGetContext(NotesContext);

  return (
    <ToolbarContextProviders>
      <TooltipContainer className="flex lg:m-auto">
        <FormatText />
        <AddMediaFile />
        <AddLink />
        <ToolbarItem
          tooltipText={t("addTable")}
          isDisabled={!editor?.can().chain().focus().redo().run()}
          onClick={() => editor?.chain().focus().redo().run()}
          icon={<TableIcon />}
        />
        <Undo />
        <Redo />
      </TooltipContainer>
    </ToolbarContextProviders>
  );
}
