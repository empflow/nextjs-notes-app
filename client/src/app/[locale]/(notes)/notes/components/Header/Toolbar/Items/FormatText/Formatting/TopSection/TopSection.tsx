import ItalicIcon from "@/icons/svg/italic.svg";
import BoldIcon from "@/icons/svg/bold.svg";
import StrikethroughIcon from "@/icons/svg/strikethrough.svg";
import CodeIcon from "@/icons/svg/code.svg";
import useGetContext from "@/app/hooks/useGetContext";
import { ViewsContainerContext } from "@/app/components/Views/ViewsContainer";
import TooltipContainer from "@/app/components/TooltipContainer";
import { useTranslations } from "next-intl";
import NotesContext from "@/contexts/NotesContext";
import ToolbarItem from "../../../Item";
import useRerender from "@/app/hooks/useRerender";

interface TProps {}

export default function TopSection() {
  const t = useTranslations("Toolbar.formatText.formattingOptions");
  const { editor } = useGetContext(NotesContext);
  const { setActiveView } = useGetContext(ViewsContainerContext);
  const rerender = useRerender();

  const isStrikethroughDisabled = !editor
    ?.can()
    .chain()
    .focus()
    .toggleStrike()
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

  return (
    <TooltipContainer tooltipsTop={35} className="flex justify-between">
      <ToolbarItem
        tooltipText={t("strikethrough")}
        icon={<StrikethroughIcon />}
        onClick={toggleStrikethrough}
        isActive={editor?.isActive("strike")}
        disabled={isStrikethroughDisabled}
        hideTooltip={isStrikethroughDisabled}
      />
      <ToolbarItem
        tooltipText={t("italic")}
        icon={<ItalicIcon />}
        onClick={toggleItalic}
        isActive={editor?.isActive("italic")}
        disabled={isItalicDisabled}
        hideTooltip={isItalicDisabled}
      />
      <ToolbarItem
        tooltipText={t("bold")}
        icon={<BoldIcon />}
        onClick={toggleBold}
        isActive={editor?.isActive("bold")}
        disabled={!editor?.can().chain().focus().toggleBold().run()}
        hideTooltip={isBoldDisabled}
      />
      <ToolbarItem
        tooltipText={t("code")}
        onClick={() => setActiveView("code")}
        icon={<CodeIcon />}
      />
    </TooltipContainer>
  );
}
