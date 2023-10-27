import SmallBtn from "@/app/components/buttons/Small";
import ColorInput from "@/app/components/form/ColorInput/ColorInput";
import FormErr from "@/app/components/form/FormErr";
import Input from "@/app/components/form/Input";
import InputWithLabel from "@/app/components/form/InputWithLabel";
import Popover from "@/app/components/Popover";
import useGetContext from "@/app/hooks/useGetContext";
import { SetState, TContext } from "@/utils/types";
import { useTranslations } from "next-intl";
import {
  createContext,
  MouseEvent,
  MouseEventHandler,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { useForm, UseFormRegister, UseFormReturn } from "react-hook-form";
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
  const { isEditing: isEditingTags } = useGetContext(FilterModalContext);
  const form = useForm<TAddTagForm>({
    defaultValues: { name, color },
  });
  const {
    register,
    formState: { errors: formErrs },
    watch: formWatch,
    handleSubmit,
  } = form;
  const formData = formWatch();
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  async function onSubmit() {}

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
