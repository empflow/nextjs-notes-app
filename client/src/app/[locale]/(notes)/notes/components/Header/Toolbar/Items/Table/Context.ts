import { SetState, TContext } from "@/utils/types";
import { createContext } from "react";

export type TTableContext = TContext<{
  isMenuOpen: boolean;
  setIsMenuOpen: SetState<boolean>;
}>;

export const TableContext = createContext<TTableContext>(null);
