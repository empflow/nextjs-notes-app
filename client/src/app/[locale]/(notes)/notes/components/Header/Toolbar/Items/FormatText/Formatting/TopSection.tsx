import ItalicIcon from "@/icons/svg/italic.svg";
import BoldIcon from "@/icons/svg/bold.svg";
import StrikethroughIcon from "@/icons/svg/strikethrough.svg";
import CodeIcon from "@/icons/svg/code.svg";
import useGetContext from "@/app/hooks/useGetContext";
import TooltipContainer from "@/app/components/TooltipContainer";
import { useTranslations } from "next-intl";
import NotesContext from "@/contexts/NotesContext";
import ToolbarItem from "../../Item";
import useRerender from "@/app/hooks/useRerender";

export default function TopSection() {
  const t = useTranslations("Toolbar.formatText.formattingOptions");
  const { editor } = useGetContext(NotesContext);
  const rerender = useRerender();

  const isStrikethroughDisabled = !editor
    ?.can()
    .chain()
    .focus()
    .toggleStrike()
    .run();
  const isCodeBlockDisabled = !editor
    ?.can()
    .chain()
    .focus()
    .toggleCodeBlock()
    .run();
  const isItalicDisabled = !editor?.can().chain().focus().toggleItalic().run();
  const isBoldDisabled = !editor?.can().chain().focus().toggleBold().run();

  function toggleStrikethrough() {
    editor?.chain().toggleStrike().focus().run();
    rerender();
  }

  function toggleItalic() {
    editor?.chain().toggleItalic().focus().run();
    rerender();
  }

  function toggleBold() {
    editor?.chain().toggleBold().focus().run();
    rerender();
  }

  function toggleCodeBlock() {
    editor?.chain().toggleCodeBlock().focus().run();
    rerender();
  }

  return (
    <TooltipContainer
      tooltipsTop={35}
      className="flex justify-between px-3 py-2"
    >
      <ToolbarItem
        tooltipText={t("strikethrough")}
        icon={<StrikethroughIcon />}
        onClick={toggleStrikethrough}
        isActive={editor?.isActive("strike")}
        isDisabled={isStrikethroughDisabled}
      />
      <ToolbarItem
        tooltipText={t("italic")}
        icon={<ItalicIcon />}
        onClick={toggleItalic}
        isActive={editor?.isActive("italic")}
        isDisabled={isItalicDisabled}
      />
      <ToolbarItem
        tooltipText={t("bold")}
        icon={<BoldIcon />}
        onClick={toggleBold}
        isActive={editor?.isActive("bold")}
        isDisabled={isBoldDisabled}
      />
      <ToolbarItem
        tooltipText={t("codeBlock")}
        icon={<CodeIcon />}
        onClick={toggleCodeBlock}
        isActive={editor?.isActive("codeBlock")}
        isDisabled={isCodeBlockDisabled}
      />
    </TooltipContainer>
  );
}
