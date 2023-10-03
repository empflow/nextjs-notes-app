import View from "@/app/components/Views/View";
import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import { useTranslations } from "next-intl";
import FormatTextItem from "./Item";
import OrderedListIcon from "@/icons/svg/orderedList.svg";
import BulletedListIcon from "@/icons/svg/bulletedList.svg";
import useRerender from "@/app/hooks/useRerender";

export default function ListsView() {
  const t = useTranslations("Toolbar.formatText.lists");
  const tFormatText = useTranslations("Toolbar.formatText");
  const { editor } = useGetContext(NotesContext);
  const rerender = useRerender();

  const isOrderedListDisabled = !editor
    ?.can()
    .chain()
    .focus()
    .toggleOrderedList()
    .run();
  const isBulletedListDisabled = !editor
    ?.can()
    .chain()
    .focus()
    .toggleBulletList()
    .run();

  function toggleOrderedList() {
    editor?.chain().focus().toggleOrderedList().run();
    rerender();
  }

  function toggleBulletedList() {
    editor?.chain().focus().toggleBulletList().run();
    rerender();
  }

  return (
    <View
      headerClassName="px-3 py-2"
      childrenClassName="flex justify-between px-3 py-2"
      name="lists"
      nameToShow={t("menuTitle")}
      backBtn={{ navTo: "formatting", text: tFormatText("menuTitle") }}
    >
      <FormatTextItem
        text={t("ordered")}
        icon={<OrderedListIcon />}
        onClick={toggleOrderedList}
        isActive={editor?.isActive("orderedList")}
        isDisabled={isOrderedListDisabled}
      />
      <FormatTextItem
        text={t("bulleted")}
        icon={<BulletedListIcon />}
        onClick={toggleBulletedList}
        isActive={editor?.isActive("bulletList")}
        isDisabled={isBulletedListDisabled}
      />
    </View>
  );
}
