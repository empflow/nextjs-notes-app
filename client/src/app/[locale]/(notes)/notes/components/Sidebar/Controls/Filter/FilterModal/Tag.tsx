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
import { TAddTagForm } from "./AddTagModal";
import FilterModalContext from "./Context";

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

  console.log(isEditingThisTag);

  return (
    <form className="flex flex-col gap-1" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between">
        <div key={_id} className="flex items-center gap-2">
          <ColorInput
            className="disabled:cursor-default"
            style={{ width: 30, height: 34 }}
            register={register("color", { required: formT("noColor") })}
            disabled={!isEditingThisTag}
          />
          <Input
            className="disabled:border-none disabled:bg-transparent"
            disabled={!isEditingThisTag}
            type="text"
            register={register("name", { required: formT("noName") })}
            style={{ padding: 4 }}
          />
        </div>
        {isEditingTags && (
          <div
            className="relative"
            onClick={() => setIsPopoverMenuOpen((prev) => !prev)}
          >
            open popover
            <Popover
              noOverlay={true}
              isOpen={isPopoverMenuOpen}
              setIsOpen={setIsPopoverMenuOpen}
              position={"bottom-left"}
              offset={40}
              portalSelector="#popover-overlays"
              className="rounded border border-black"
            >
              popover content
            </Popover>
          </div>
        )}
      </div>
      <div>
        <FormErr content={formErrs.name?.message} />
        <FormErr content={formErrs.color?.message} />
      </div>
      <div className="flex gap-1">
        {isEditingThisTag && (
          <>
            <SmallBtn>Save</SmallBtn>
            <SmallBtn
              onClick={() => setIsEditingThisTag(false)}
              variant="outlined"
            >
              Cancel
            </SmallBtn>
          </>
        )}
      </div>
    </form>
  );
}
