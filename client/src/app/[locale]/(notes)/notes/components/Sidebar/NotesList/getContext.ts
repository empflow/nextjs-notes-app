import { SetState, TContext } from "@/utils/types";
import { createContext } from "react";

interface TNoteContextValue {
  isActionsPopoverOpen: boolean;
  setIsActionsPopoverOpen: SetState<boolean>;
  _id?: string;
}
type TNoteContext = TContext<TNoteContextValue>;

export default function getNoteContext() {
  return createContext<TNoteContext>(null);
}
