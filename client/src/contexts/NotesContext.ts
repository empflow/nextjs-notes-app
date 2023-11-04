"use client";

import { SetState, TContext } from "@/utils/types";
import { TTagSchema } from "@shared/schemas/tag";
import { TNoteMetaSchema } from "@shared/schemas/note";
import { Editor } from "@tiptap/react";
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
  hideEditorOnMobile: boolean;
  setHideEditorOnMobile: SetState<boolean>;
  isAssignTagModalOpen: boolean;
  setIsAssignTagModalOpen: SetState<boolean>;
  assignTagModalNoteId: string | null;
  setAssignTagModalNoteId: SetState<string | null>;
  isAddTagModalOpen: boolean;
  setIsAddTagModalOpen: SetState<boolean>;
  isNotesFiltering: boolean;
  setIsNotesFiltering: SetState<boolean>;
}

type TNotesContext = TContext<TNotesContextValue>;
const NotesContext = createContext<TNotesContext>(null);

export default NotesContext;
