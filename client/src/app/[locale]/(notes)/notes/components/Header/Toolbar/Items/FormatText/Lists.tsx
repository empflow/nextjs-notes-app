import View from "@/app/components/Views/View";
import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/app/[locale]/(notes)/notes/NotesContext";
import { useTranslations } from "next-intl";
import ActivatableItem from "../ActivatableItem";
import OrderedListIcon from "@/icons/svg/orderedList.svg";
import BulletedListIcon from "@/icons/svg/bulletedList.svg";
import TaskListIcon from "@/icons/svg/taskList.svg";
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
  const isTaskListDisabled = !editor
    ?.can()
    .chain()
    .focus()
    .toggleTaskList()
    .run();

  function toggleOrderedList() {
    editor?.chain().focus().toggleOrderedList().run();
    rerender();
  }

  function toggleBulletedList() {
    editor?.chain().focus().toggleBulletList().run();
    rerender();
  }

  function toggleTaskList() {
    editor?.chain().toggleTaskList().focus().run();
    rerender();
  }

  return (
    <View
      headerClassName="px-3 py-2"
      childrenContainerClassName="flex justify-between px-3 py-2"
      name="lists"
      nameToShow={t("menuTitle")}
      backBtn={{ navTo: "formatting", text: tFormatText("menuTitle") }}
    >
      <ActivatableItem
        text={t("ordered")}
        icon={<OrderedListIcon />}
        onClick={toggleOrderedList}
        isActive={editor?.isActive("orderedList")}
        isDisabled={isOrderedListDisabled}
      />
      <ActivatableItem
        text={t("bulleted")}
        icon={<BulletedListIcon />}
        onClick={toggleBulletedList}
        isActive={editor?.isActive("bulletList")}
        isDisabled={isBulletedListDisabled}
      />
      <ActivatableItem
        text={t("task")}
        icon={<TaskListIcon />}
        onClick={toggleTaskList}
        isActive={editor?.isActive("taskList")}
        isDisabled={isTaskListDisabled}
      />
    </View>
  );
}
