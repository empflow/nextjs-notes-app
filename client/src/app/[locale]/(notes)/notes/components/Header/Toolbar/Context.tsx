import { SetState, TContext } from "@/utils/types";
import { createContext } from "react";

export type TToolbarContext = TContext<{
  isFormatTextMenuOpen: boolean;
  setIsFormatTextMenuOpen: SetState<boolean>;

  link: string;
  setLink: SetState<string>;
  isAddLinkMenuOpen: boolean;
  setIsAddLinkMenuOpen: SetState<boolean>;

  isAddMediaFileMenuOpen: boolean;
  setIsAddMediaFileMenuOpen: SetState<boolean>;
  mediaFileId: string | null;
  setMediaFileId: SetState<string | null>;
}>;

export const ToolbarContext = createContext<TToolbarContext>(null);
