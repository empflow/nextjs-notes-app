import { SetState, TContext } from "@/utils/types";
import { createContext } from "react";

export type TAddMediaFileState = "chooseFile" | "uploadFile" | "uploadingFile";

export type TToolbarContext = TContext<{
  isFormatTextMenuOpen: boolean;
  setIsFormatTextMenuOpen: SetState<boolean>;

  link: string;
  setLink: SetState<string>;
  isAddLinkMenuOpen: boolean;
  setIsAddLinkMenuOpen: SetState<boolean>;

  isAddMediaFileMenuOpen: boolean;
  setIsAddMediaFileMenuOpen: SetState<boolean>;
  mediaFiles: FileList | null;
  setMediaFiles: SetState<FileList | null>;
  mediaFileId: string | null;
  setMediaFileId: SetState<string | null>;
  addMediaFileMenuState: TAddMediaFileState;
  setAddMediaFileMenuState: SetState<TAddMediaFileState>;
}>;

export const ToolbarContext = createContext<TToolbarContext>(null);
