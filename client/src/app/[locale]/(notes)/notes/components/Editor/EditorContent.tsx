import { EditorContent as TiptapEditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styles from "./editor.module.css";

interface TProps {
  initContent: string;
}

export default function EditorContent({ initContent }: TProps) {
  const editor = useEditor({
    content: initContent,
    extensions: [StarterKit],
  });
  return (
    <TiptapEditorContent
      className={`flex w-full flex-grow p-global ${styles.editor} sm:p-global-sm`}
      editor={editor}
    />
  );
}
