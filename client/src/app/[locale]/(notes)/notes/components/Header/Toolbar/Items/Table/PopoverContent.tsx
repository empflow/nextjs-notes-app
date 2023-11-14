import useGetContext from "@/app/hooks/useGetContext";
import useSelectionIncludesMark from "@/app/hooks/useSelectionIncludesMark";
import NotesContext from "@/app/[locale]/(notes)/notes/NotesContext";
import { useTranslations } from "next-intl";
import Divider from "../FormatText/Formatting/Divider";
import HoverableItem from "../HoverableItem";
import { TableContext } from "./Context";
import TableMenuSection from "./Section";
import AddIcon from "@/icons/svg/add.svg";
import DeleteIcon from "@/icons/svg/delete.svg";
import useIsSelectionInsideTable from "@/app/[locale]/(notes)/notes/components/Header/Toolbar/Items/Table/useIsSelectionInsideTable";

export default function TablePopoverContent() {
  const t = useTranslations("Toolbar.table");
  const { editor } = useGetContext(NotesContext);
  const { isMenuOpen } = useGetContext(TableContext);
  const selectionIncludesTable = useIsSelectionInsideTable({
    isMenuOpen,
  });

  const isAddTableDisabled =
    selectionIncludesTable ||
    !editor?.can().chain().insertTable({ withHeaderRow: false }).run();
  const isDeleteTableDisabled = !editor?.can().chain().deleteTable().run();

  const isAddRowAboveDisabled = !editor?.can().chain().addRowBefore().run();
  const isAddRowBelowDisabled = !editor?.can().chain().addRowAfter().run();
  const isDeleteRowDisabled = !editor?.can().chain().deleteRow().run();

  const isAddColToLeftDisabled = !editor?.can().chain().addColumnBefore().run();
  const isAddColToRightDisabled = !editor?.can().chain().addColumnAfter().run();
  const isDeleteColDisabled = !editor?.can().chain().deleteColumn().run();

  const isMergeCellsDisabled = !editor?.can().chain().mergeCells().run();
  const isSplitCellDisabled = !editor?.can().chain().splitCell().run();

  const isToggleHeaderRowDisabled = !editor
    ?.can()
    .chain()
    .toggleHeaderRow()
    .run();
  const isToggleHeaderColDisabled = !editor
    ?.can()
    .chain()
    .toggleHeaderColumn()
    .run();
  const isToggleHeaderCellDisabled = !editor
    ?.can()
    .chain()
    .toggleHeaderCell()
    .run();

  const addRowAbove = () => editor?.chain().addRowBefore().focus().run();
  const addRowBelow = () => editor?.chain().addRowAfter().focus().run();
  const addColToLeft = () => editor?.chain().addColumnBefore().focus().run();
  const addColToRight = () => editor?.chain().addColumnAfter().focus().run();

  const addTable = () =>
    editor?.chain().insertTable({ withHeaderRow: false }).focus().run();
  const deleteTable = () => editor?.chain().deleteTable().focus().run();
  const deleteRow = () => editor?.chain().deleteRow().focus().run();
  const deleteCol = () => editor?.chain().deleteColumn().focus().run();
  const mergeCells = () => editor?.chain().mergeCells().focus().run();
  const splitCell = () => editor?.chain().splitCell().focus().run();
  const toggleHeaderRow = () => editor?.chain().toggleHeaderRow().focus().run();
  const toggleHeaderCol = () =>
    editor?.chain().toggleHeaderColumn().focus().run();
  const toggleHeaderCell = () =>
    editor?.chain().toggleHeaderCell().focus().run();

  return (
    <div className="flex flex-col gap-2">
      <TableMenuSection>
        <HoverableItem
          text={t("addTable")}
          onClick={addTable}
          isDisabled={isAddTableDisabled}
          icon={<AddIcon />}
        />
        <HoverableItem
          text={t("deleteTable")}
          onClick={deleteTable}
          isDisabled={isDeleteTableDisabled}
          icon={<DeleteIcon />}
        />
      </TableMenuSection>
      <Divider />
      <TableMenuSection title={t("rows")}>
        <HoverableItem
          text={t("addRowAbove")}
          onClick={addRowAbove}
          isDisabled={isAddRowAboveDisabled}
        />
        <HoverableItem
          text={t("addRowBelow")}
          onClick={addRowBelow}
          isDisabled={isAddRowBelowDisabled}
        />
        <HoverableItem
          text={t("deleteRow")}
          onClick={deleteRow}
          isDisabled={isDeleteRowDisabled}
        />
      </TableMenuSection>
      <TableMenuSection title={t("cols")}>
        <HoverableItem
          text={t("addColToLeft")}
          onClick={addColToLeft}
          isDisabled={isAddColToLeftDisabled}
        />
        <HoverableItem
          text={t("addColToRight")}
          onClick={addColToRight}
          isDisabled={isAddColToRightDisabled}
        />
        <HoverableItem
          text={t("deleteCol")}
          onClick={deleteCol}
          isDisabled={isDeleteColDisabled}
        />
      </TableMenuSection>
      <Divider />
      <TableMenuSection>
        <HoverableItem
          text={t("mergeCells")}
          onClick={mergeCells}
          isDisabled={isMergeCellsDisabled}
        />
        <HoverableItem
          text={t("splitCell")}
          onClick={splitCell}
          isDisabled={isSplitCellDisabled}
        />
      </TableMenuSection>
      <Divider />
      <TableMenuSection>
        <HoverableItem
          text={t("toggleHeaderRow")}
          onClick={toggleHeaderRow}
          isDisabled={isToggleHeaderRowDisabled}
        />
        <HoverableItem
          text={t("toggleHeaderCol")}
          onClick={toggleHeaderCol}
          isDisabled={isToggleHeaderColDisabled}
        />
        <HoverableItem
          text={t("toggleHeaderCell")}
          onClick={toggleHeaderCell}
          isDisabled={isToggleHeaderCellDisabled}
        />
      </TableMenuSection>
    </div>
  );
}
