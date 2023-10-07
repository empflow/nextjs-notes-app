import useSaveEditorContent from "@/app/hooks/queries/useSaveEditorContentQuery";
import useGetContext from "@/app/hooks/useGetContext";
import NotesContext, { TNotesListNotesMeta } from "@/contexts/NotesContext";
import { SetState } from "@/utils/types";
import Link from "@tiptap/extension-link";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import {
  EditorContent as TiptapEditorContent,
  JSONContent,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";
import styles from "./editor.module.css";
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
      Link.configure({
        protocols: ["tel", "mailto", "ftp", "file", "sms"],
        HTMLAttributes: { class: "link" },
      }),
      Image,
    ],
    onUpdate: ({ editor }) => {
      setHasContentChanged(true);
      updateSelectedNoteProps(setNotes, selectedNoteId);
      setContent(editor.getJSON());
    },
    onCreate({ editor }) {
      editor.commands.setContent(initContent);
      setEditor(editor);
    },
  });

  useEffect(() => {
    editor?.commands.setContent(initContent);
  }, [initContent]);

  return (
    <TiptapEditorContent
      className={`flex flex-grow ${styles.editor}`}
      editor={editor}
    />
  );
}

function updateSelectedNoteProps(
  setNotes: SetState<TNotesListNotesMeta>,
  selectedNoteId: string | null,
) {
  setNotes((prevNotes) => {
    if (!prevNotes || !selectedNoteId) return prevNotes;

    return prevNotes.map((note) => {
      if (note._id !== selectedNoteId) return note;
      note.updatedAt = new Date().toISOString();
      return note;
    });
  });
}
