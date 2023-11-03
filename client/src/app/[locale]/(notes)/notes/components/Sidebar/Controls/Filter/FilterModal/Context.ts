import { SetState, TContext } from "@/utils/types";
import { createContext } from "react";

interface TFilterModalContextValue {
  isEditing: boolean;
  setIsEditing: SetState<boolean>;
}

export type TFilterModalContext = TContext<TFilterModalContextValue>;

const FilterModalContext = createContext<TFilterModalContext>(null);
export default FilterModalContext;
