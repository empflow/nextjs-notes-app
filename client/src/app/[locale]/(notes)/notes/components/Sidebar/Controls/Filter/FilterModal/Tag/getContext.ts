import { SetState, TContext } from "@/utils/types";
import { createContext, MutableRefObject, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { TAddTagForm } from "../AddTagModal/AddTagModal";

interface TTagContextValue {
  isEditingThisTag: boolean;
  setIsEditingThisTag: SetState<boolean>;
  _id: string;
  nameInputRef: MutableRefObject<HTMLInputElement | null>;
  color: string;
  setColor: SetState<string>;
  name: string;
  setName: SetState<string>;
  isPopoverMenuOpen: boolean;
  setIsPopoverMenuOpen: SetState<boolean>;
  form: UseFormReturn<TAddTagForm>;
}
type TTagContext = TContext<TTagContextValue>;

export default function getTagContext() {
  return createContext<TTagContext>(null);
}
