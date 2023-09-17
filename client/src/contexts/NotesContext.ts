import { SetState, TContext } from "@/utils/types";
import { TNoteMetaSchema } from "@shared/schemas";
import { createContext } from "react";

export type TNotesListNotesMeta = TNoteMetaSchema[] | null;

interface TNotesContextValue {
  notes: TNotesListNotesMeta;
  setNotes: SetState<TNotesListNotesMeta>;
  sortedNotes: TNotesListNotesMeta;
  selectedNoteId: string | null;
  setSelectedNoteId: SetState<string | null>;
  selectedNote: TNoteMetaSchema | null;
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
