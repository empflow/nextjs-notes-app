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
          isDisabled={
            !editor
              ?.can()
              .chain()
              .focus()
              .insertTable({ rows: 5, cols: 4, withHeaderRow: false })
              .run()
          }
          onClick={() => editor?.chain().focus().insertTable().run()}
          icon={<TableIcon />}
        />
        {/* <ToolbarItem
          tooltipText={"add col before"}
          isDisabled={!editor?.can().chain().focus().addColumnBefore().run()}
          onClick={() => editor?.chain().focus().addColumnBefore().run()}
          icon={<TableIcon />}
        />
        <ToolbarItem
          tooltipText={"add col after"}
          isDisabled={!editor?.can().chain().focus().addColumnAfter().run()}
          onClick={() => editor?.chain().focus().addColumnAfter().run()}
          icon={<TableIcon />}
        />
        <ToolbarItem
          tooltipText={"add row before"}
          isDisabled={!editor?.can().chain().focus().addRowBefore().run()}
          onClick={() => editor?.chain().focus().addRowBefore().run()}
          icon={<TableIcon />}
        />
        <ToolbarItem
          tooltipText={"add row after"}
          isDisabled={!editor?.can().chain().focus().addRowAfter().run()}
          onClick={() => editor?.chain().focus().addRowAfter().run()}
          icon={<TableIcon />}
        /> */}
        <Undo />
        <Redo />
      </TooltipContainer>
    </ToolbarContextProviders>
  );
}
