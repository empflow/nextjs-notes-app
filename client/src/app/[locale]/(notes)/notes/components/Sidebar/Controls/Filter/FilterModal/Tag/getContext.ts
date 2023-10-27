import { SetState, TContext } from "@/utils/types";
import { createContext, MutableRefObject, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { TAddTagForm } from "../AddTagModal/AddTagModal";

interface TTagContextValue {
  isEditingThisTag: boolean;
  setIsEditingThisTag: SetState<boolean>;
  _id: string;
  nameInputRef: MutableRefObject<HTMLInputElement | null>;
  initColor: string;
  initName: string;
  isPopoverMenuOpen: boolean;
  setIsPopoverMenuOpen: SetState<boolean>;
  form: UseFormReturn<TAddTagForm>;
}
type TTagContext = TContext<TTagContextValue>;

export default function getTagContext() {
  return createContext<TTagContext>(null);
}
