import { SetState, TContext } from "@/utils/types";
import { createContext, MutableRefObject, RefObject } from "react";

export type TAddMediaFileState = "chooseFile" | "uploadFile" | "uploadingFile";

export type TAddMediaFileContext = TContext<{
  isMenuOpen: boolean;
  setIsMenuOpen: SetState<boolean>;

  mediaFiles: FileList | null;
  setMediaFiles: SetState<FileList | null>;

  mediaFileId: string | null;
  setMediaFileId: SetState<string | null>;

  menuState: TAddMediaFileState;
  setMenuState: SetState<TAddMediaFileState>;

  fileInputRef: MutableRefObject<HTMLInputElement | null>;
}>;

export const AddMediaFileContext = createContext<TAddMediaFileContext>(null);
