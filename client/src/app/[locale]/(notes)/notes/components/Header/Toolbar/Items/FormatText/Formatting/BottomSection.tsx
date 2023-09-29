import useGetContext from "@/app/hooks/useGetContext";
import useRerender from "@/app/hooks/useRerender";
import NotesContext from "@/contexts/NotesContext";
import { useTranslations } from "next-intl";
import TextFormattingItem from "./Item";
import ListIcon from "@/icons/svg/list.svg";
import ClearFormattingIcon from "@/icons/svg/clearFormatting.svg";
import HorizontalRuleIcon from "@/icons/svg/horizontalRule.svg";
import { ViewsContainerContext } from "@/app/components/Views/ViewsContainer";

export default function BottomSection() {
  const t = useTranslations("Toolbar.formatText");
  const { editor } = useGetContext(NotesContext);
  const { setActiveView } = useGetContext(ViewsContainerContext);
  const rerender = useRerender();
  const isHorizontalRuleDisabled = !editor
    ?.can()
    .chain()
    .focus()
    .setHorizontalRule()
    .run();
  const isClearFormattingDisabled = !editor
    ?.can()
    .chain()
    .focus()
    .unsetAllMarks()
    .run();
  // horizontal rule
  // lists
  // clear formatting

  function addHorizontalRule() {
    editor?.chain().setHorizontalRule().focus().run();
    rerender();
  }

  function clearFormatting() {
    editor?.chain().unsetAllMarks().focus().run();
    rerender();
  }

  return (
    <div className="flex flex-col px-3  py-2">
      <TextFormattingItem
        text={t("horizontalRule")}
        icon={<HorizontalRuleIcon />}
        onClick={addHorizontalRule}
        isActive={editor?.isActive("horizontalRule")}
        isDisabled={isHorizontalRuleDisabled}
      />
      <TextFormattingItem
        text={t("clearFormatting")}
        icon={<ClearFormattingIcon />}
        onClick={clearFormatting}
        isDisabled={isClearFormattingDisabled}
      />
      <TextFormattingItem
        text={t("lists.menuTitle")}
        icon={<ListIcon />}
        onClick={() => setActiveView("lists")}
      />
    </div>
  );
}
