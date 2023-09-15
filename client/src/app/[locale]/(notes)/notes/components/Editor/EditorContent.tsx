import useSaveEditorContent from "@/app/hooks/queries/useSaveEditorContentQuery";
import {
  EditorContent as TiptapEditorContent,
  JSONContent,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRef, useState } from "react";
import styles from "./editor.module.css";

interface TProps {
  initContent: JSONContent | null;
}

export default function EditorContent({ initContent }: TProps) {
  const [content, setContent] = useState<null | JSONContent>(initContent);
  useSaveEditorContent(content);

  const editor = useEditor({
    content: initContent ?? "",
    extensions: [StarterKit],
    onUpdate: ({ editor }) => setContent(editor.getJSON()),
  });

  return (
    <TiptapEditorContent
      className={`flex flex-grow ${styles.editor}`}
      editor={editor}
    />
  );
}
