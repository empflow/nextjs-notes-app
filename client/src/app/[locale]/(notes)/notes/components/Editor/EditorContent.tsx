import {
  EditorContent as TiptapEditorContent,
  JSONContent,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styles from "./editor.module.css";

interface TProps {
  initContent: JSONContent | null;
}

export default function EditorContent({ initContent }: TProps) {
  const editor = useEditor({
    content: initContent ?? "",
    extensions: [StarterKit],
    onUpdate(props) {
      console.log(JSON.stringify(props.editor.getJSON()));
    },
  });

  return (
    <TiptapEditorContent
      className={`flex flex-grow ${styles.editor}`}
      editor={editor}
    />
  );
}
