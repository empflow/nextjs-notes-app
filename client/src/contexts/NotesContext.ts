"use client";

import { SetState, TContext } from "@/utils/types";
import { TNoteMetaSchema, TTagSchema } from "@shared/schemas";
import { Editor } from "@tiptap/core";
import { createContext } from "react";

export type TNotesListNotesMeta = TNoteMetaSchema[] | null;
export type TEditor = Editor | null;

interface TNotesContextValue {
  editor: TEditor;
  setEditor: SetState<TEditor>;
  notes: TNotesListNotesMeta;
  setNotes: SetState<TNotesListNotesMeta>;
  sortedNotes: TNotesListNotesMeta;
  selectedNoteId: string | null;
  setSelectedNoteId: SetState<string | null>;
  selectedNote: TNoteMetaSchema | null;
  tags: TTagSchema[] | null;
  selectedTagId: string | null;
  setSelectedTagId: SetState<string | null>;
  isEditing: boolean;
  setIsEditing: SetState<boolean>;
  isFilterMenuOpen: boolean;
  setIsFilterMenuOpen: SetState<boolean>;
}

type TNotesContext = TContext<TNotesContextValue>;
const NotesContext = createContext<TNotesContext>(null);

export default NotesContext;
