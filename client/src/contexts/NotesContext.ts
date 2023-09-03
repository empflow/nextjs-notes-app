import { SetState, TContext, TTag } from "@/utils/types";
import { AxiosResponse } from "axios";
import { createContext } from "react";

interface TNotesContextValue {
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
