import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import styles from "./editor.module.css";

export default function Editor() {
  const editor = useEditor({
    content: "init content",
    extensions: [StarterKit],
  });
  if (!editor) return null;

  return (
    <div className="flex flex-grow">
      <EditorContent
        className={`flex w-full flex-grow ${styles.editor}`}
        editor={editor}
      />
    </div>
  );
}
