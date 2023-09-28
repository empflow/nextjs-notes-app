import useGetContext from "@/app/hooks/useGetContext";
import useRerender from "@/app/hooks/useRerender";
import NotesContext, { TEditor } from "@/contexts/NotesContext";
import H1Icon from "@/icons/svg/h1.svg";
import H2Icon from "@/icons/svg/h2.svg";
import H3Icon from "@/icons/svg/h3.svg";
import BodyTextIcon from "@/icons/svg/text.svg";
import { useTranslations } from "next-intl";
import HeadingsItem from "./Item";

export type THeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export default function Headings() {
  const { editor } = useGetContext(NotesContext);
  const t = useTranslations("Toolbar.formatText.titles");
  const rerender = useRerender();

  const isH1Disabled = getIsHeadingDisabled({ editor, level: 1 });
  const isH2Disabled = getIsHeadingDisabled({ editor, level: 2 });
  const isH3Disabled = getIsHeadingDisabled({ editor, level: 3 });
  const isBodyTextDisabled = !editor
    ?.can()
    .chain()
    .focus()
    .setParagraph()
    .run();

  function setHeading({ level }: { level: THeadingLevel }) {
    editor?.chain().setHeading({ level }).focus().run();
    rerender();
  }

  function toggleBodyText() {
    editor?.chain().setParagraph().focus().run();
    rerender();
  }

  return (
    <div className="flex flex-col px-3 py-2">
      <HeadingsItem
        text={t("title")}
        icon={<H1Icon />}
        onClick={() => setHeading({ level: 1 })}
        isActive={editor?.isActive("heading", { level: 1 })}
        isDisabled={isH1Disabled}
      />
      <HeadingsItem
        text={t("heading")}
        icon={<H2Icon />}
        onClick={() => setHeading({ level: 2 })}
        isActive={editor?.isActive("heading", { level: 2 })}
        isDisabled={isH2Disabled}
      />
      <HeadingsItem
        text={t("subheading")}
        icon={<H3Icon />}
        onClick={() => setHeading({ level: 3 })}
        isActive={editor?.isActive("heading", { level: 3 })}
        isDisabled={isH3Disabled}
      />
      <HeadingsItem
        text={t("body")}
        icon={<BodyTextIcon />}
        onClick={toggleBodyText}
        isActive={editor?.isActive("paragraph")}
        isDisabled={false}
      />
    </div>
  );
}

function getIsHeadingDisabled({
  level,
  editor,
}: {
  level: THeadingLevel;
  editor: TEditor;
}) {
  return !editor?.can().chain().focus().toggleHeading({ level }).run();
}
