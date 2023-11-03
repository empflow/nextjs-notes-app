import useGetContext from "@/app/hooks/useGetContext";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { TAddTagForm } from "../AddTagModal/AddTagModal";
import FilterModalContext from "../Context";
import TagActionsPopover from "./ActionsPopover/ActionsPopover";
import TagBtns from "./Btns";
import TagFormErrs from "./FormErrs";
import getTagContext from "./getContext";
import TagInputs from "./Inputs";

interface TProps {
  name: string;
  color: string;
  _id: string;
}

export const TagContext = getTagContext();

export default function Tag({ name, color, _id }: TProps) {
  const [isEditingThisTag, setIsEditingThisTag] = useState(false);
  const [isPopoverMenuOpen, setIsPopoverMenuOpen] = useState(false);
  const form = useForm<TAddTagForm>({
    defaultValues: { name, color },
  });
  const { handleSubmit } = form;
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  async function onSubmit() {
    setIsEditingThisTag(false);
  }

  return (
    <TagContext.Provider
      value={{
        _id,
        form,
        initColor: color,
        initName: name,
        isEditingThisTag,
        isPopoverMenuOpen,
        nameInputRef,
        setIsEditingThisTag,
        setIsPopoverMenuOpen,
      }}
    >
      <form className="flex flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between">
          <TagInputs />
          <TagActionsPopover />
        </div>
        <TagBtns />
        <TagFormErrs />
      </form>
    </TagContext.Provider>
  );
}
