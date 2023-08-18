import { SetState, TNoteMeta, TTag } from "@/utils/types";
import { createContext } from "react";

interface TNotesContextValue {
  notes: TNoteMeta[] | null;
  setNotes: SetState<null | TNoteMeta[]>;
  selectedNoteId: string | null;
  setSelectedNoteId: SetState<string | null>;
  tags: TTag[] | null;
  setTags: SetState<null | TTag[]>;
  selectedTagId: string | null;
  isEditing: boolean;
  setIsEditing: SetState<boolean>;
  isFilterMenuOpen: boolean;
  setIsFilterMenuOpen: SetState<boolean>;
}

type TNotesContext = null | TNotesContextValue;

const NotesContext = createContext<TNotesContext>(null);

export default NotesContext;
