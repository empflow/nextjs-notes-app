import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function Editor() {
  const editor = useEditor({
    content: "init content",
    extensions: [StarterKit],
  });
  if (!editor) return null;

  return (
    <main className="flex-grow">
      <EditorContent editor={editor} />
    </main>
  );
}
