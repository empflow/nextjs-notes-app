import SmallBtn from "@/app/components/buttons/Small";
import ColorInput from "@/app/components/form/ColorInput/ColorInput";
import FormErr from "@/app/components/form/FormErr";
import Input from "@/app/components/form/Input";
import InputWithLabel from "@/app/components/form/InputWithLabel";
import Popover from "@/app/components/Popover";
import useGetContext from "@/app/hooks/useGetContext";
import { useTranslations } from "next-intl";
import { MouseEvent, MouseEventHandler, useState } from "react";
import { useForm } from "react-hook-form";
import { TAddTagForm } from "../AddTagModal/AddTagModal";
import FilterModalContext from "../Context";
import TagActionsPopover from "./ActionsPopover";
import TagBtns from "./Btns";
import TagFormErrs from "./FormErrs";
import TagInputs from "./Inputs";

interface TProps {
  name: string;
  color: string;
  _id: string;
}

export default function Tag({ name, color, _id }: TProps) {
  const [isEditingThisTag, setIsEditingThisTag] = useState(false);
  const [isPopoverMenuOpen, setIsPopoverMenuOpen] = useState(false);
  const { isEditing: isEditingTags } = useGetContext(FilterModalContext);
  const {
    register,
    formState: { errors: formErrs },
    watch: formWatch,
    handleSubmit,
  } = useForm<TAddTagForm>({ defaultValues: { color, name } });
  const formData = formWatch();
  const formT = useTranslations("Tags.addTagForm");

  async function onSubmit() {}

  return (
    <form className="flex flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between">
        <TagInputs {...{ _id, isEditingThisTag, register }} />
        <TagActionsPopover {...{ isPopoverMenuOpen, setIsPopoverMenuOpen }} />
      </div>
      <TagBtns {...{ isEditingThisTag, setIsEditingThisTag }} />
      <TagFormErrs
        colorErrMsg={formErrs.color?.message}
        nameErrMsg={formErrs.name?.message}
      />
    </form>
  );
}