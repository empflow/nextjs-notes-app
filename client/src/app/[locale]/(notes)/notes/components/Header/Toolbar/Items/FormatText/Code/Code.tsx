import View from "@/app/components/Views/View";
import { useTranslations } from "next-intl";
import CodeItem from "./Item";
import InlineCodeIcon from "@/icons/svg/code.svg";
import CodeBlockIcon from "@/icons/svg/codeBlock.svg";
import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import useRerender from "@/app/hooks/useRerender";

interface TProps {}

export default function CodeView({}: TProps) {
  const tFormatText = useTranslations("Toolbar.formatText");
  const tCode = useTranslations("Toolbar.formatText.code");
  const { editor } = useGetContext(NotesContext);
  const rerender = useRerender();

  const isInlineCodeDisabled =
    editor?.isActive("codeBlock") ||
    !editor?.can().chain().focus().toggleCode().run();
  const isCodeBlockDisabled = !editor
    ?.can()
    .chain()
    .focus()
    .toggleCodeBlock()
    .run();

  function toggleInlineCode() {
    editor?.chain().toggleCode().focus().run();
    rerender();
  }

  function toggleCodeBlock() {
    editor?.chain().toggleCodeBlock().focus().run();
    rerender();
  }

  return (
    <View
      nameToShow={tCode("menuTitle")}
      backBtn={{ navTo: "formatting", text: tFormatText("menuTitle") }}
      name="code"
      className="flex flex-col gap-1"
    >
      <CodeItem
        icon={<InlineCodeIcon />}
        content={tCode("inline")}
        onClick={toggleInlineCode}
        isActive={editor?.isActive("code")}
        isDisabled={isInlineCodeDisabled}
      />
      <CodeItem
        icon={<CodeBlockIcon />}
        content={tCode("block")}
        onClick={toggleCodeBlock}
        isActive={editor?.isActive("codeBlock")}
        isDisabled={isCodeBlockDisabled}
      />
    </View>
  );
}
