import { SetState, TContext, TNoteMeta, TTag } from "@/utils/types";
import { AxiosResponse } from "axios";
import { createContext } from "react";

interface TNotesContextValue {
  notes: TNoteMeta[] | null;
  setNotes: SetState<null | TNoteMeta[]>;
  notesLoading: boolean;
  notesErr: AxiosResponse | null;
  selectedNoteId: string | null;
  setSelectedNoteId: SetState<string | null>;
  tags: TTag[] | null;
  setTags: SetState<null | TTag[]>;
  tagsLoading: boolean;
  tagsErr: AxiosResponse | null;
  selectedTagId: string | null;
  isEditing: boolean;
  setIsEditing: SetState<boolean>;
  isFilterMenuOpen: boolean;
  setIsFilterMenuOpen: SetState<boolean>;
}

type TNotesContext = TContext<TNotesContextValue>;
const NotesContext = createContext<TNotesContext>(null);

export default NotesContext;
