import { SetState, TContext, TNoteMeta, TTag } from "@/utils/types";
import { createContext } from "react";

interface TNotesContextValue {
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
