import { SetState, TContext } from "@/utils/types";
import { createContext } from "react";

export type TToolbarContext = TContext<{
  isFormatTextMenuOpen: boolean;
  setIsFormatTextMenuOpen: SetState<boolean>;
}>;

export const ToolbarContext = createContext<TToolbarContext>(null);
