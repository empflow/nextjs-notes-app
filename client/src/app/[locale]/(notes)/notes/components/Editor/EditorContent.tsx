import useSaveEditorContent from "@/app/hooks/queries/useSaveEditorContentQuery";
import useGetContext from "@/app/hooks/useGetContext";
import NotesContext from "@/contexts/NotesContext";
import { NextImage } from "@/utils/TiptapExtensions/NextImage/NextImage";
import Link from "@tiptap/extension-link";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Underline from "@tiptap/extension-underline";
import {
  Editor,
  EditorContent as TiptapEditorContent,
  JSONContent,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import styles from "./editor.module.css";
import findNoteTitleAndDescription from "@shared/utils/findNoteTitleAndDescription";
import "./editorContent.css";

interface TProps {
  initContent: JSONContent | null;
}

export default function EditorContent({ initContent }: TProps) {
  const [content, setContent] = useState<null | JSONContent>(initContent);
  const { setNotes, selectedNoteId, setEditor } = useGetContext(NotesContext);
  const [hasContentChanged, setHasContentChanged] = useState(false);
  useSaveEditorContent({ content, hasContentChanged });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TaskList,
      TaskItem.configure({ HTMLAttributes: { class: "task-list-item" } }),
      Link.extend({ inclusive: false }).configure({
        protocols: ["tel", "mailto", "ftp", "file", "sms"],
        HTMLAttributes: { class: "link" },
        autolink: true,
        linkOnPaste: true,
      }),
      NextImage,
    ],
    onUpdate: ({ editor }) => {
      setHasContentChanged(true);
      updateSelectedNoteProps(editor as Editor);
      setContent(editor.getJSON());
    },
    onCreate({ editor }) {
      editor.commands.setContent(initContent);
      setEditor(editor as Editor);
    },
  });

  useEffect(() => {
    setTimeout(() => editor?.commands.setContent(initContent), 0);
  }, [initContent]);

  return (
    <TiptapEditorContent
      className={`flex flex-grow ${styles.editor}`}
      editor={editor}
    />
  );

  function updateSelectedNoteProps(editor: Editor) {
    setNotes((prevNotes) => {
      if (!prevNotes || !selectedNoteId) return prevNotes;

      return prevNotes.map((note) => {
        if (note._id !== selectedNoteId) return note;
        const { title, description } = findNoteTitleAndDescription(
          editor?.getJSON(),
        );
        note.title = title;
        note.description = description;
        note.updatedAt = new Date().toISOString();
        return note;
      });
    });
  }
}
