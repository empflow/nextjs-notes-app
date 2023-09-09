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
    onUpdate(props) {
      console.log(props.editor.getJSON());
    },
  });
  return (
    <TiptapEditorContent
      className={`flex flex-grow ${styles.editor}`}
      editor={editor}
    />
  );
}
