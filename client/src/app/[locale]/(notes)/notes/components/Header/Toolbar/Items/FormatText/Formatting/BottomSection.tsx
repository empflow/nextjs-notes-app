import useGetContext from "@/app/hooks/useGetContext";
import useRerender from "@/app/hooks/useRerender";
import NotesContext from "@/contexts/NotesContext";
import { useTranslations } from "next-intl";
import ActivatableItem from "../../ActivatableItem";
import ListIcon from "@/icons/svg/list.svg";
import ClearFormattingIcon from "@/icons/svg/clearFormatting.svg";
import { ViewsContainerContext } from "@/app/components/Views/ViewsContainer";

export default function BottomSection() {
  const t = useTranslations("Toolbar.formatText");
  const { editor } = useGetContext(NotesContext);
  const { setActiveView } = useGetContext(ViewsContainerContext);
  const rerender = useRerender();

  const isClearFormattingDisabled = !editor
    ?.can()
    .chain()
    .focus()
    .unsetAllMarks()
    .run();

  function clearFormatting() {
    editor?.chain().unsetAllMarks().focus().run();
    rerender();
  }

  return (
    <div className="flex flex-col px-3 py-2">
      <ActivatableItem
        text={t("lists.menuTitle")}
        icon={<ListIcon />}
        onClick={() => setActiveView("lists")}
      />
      <ActivatableItem
        text={t("clearFormatting")}
        icon={<ClearFormattingIcon />}
        onClick={clearFormatting}
        isDisabled={isClearFormattingDisabled}
      />
    </div>
  );
}
