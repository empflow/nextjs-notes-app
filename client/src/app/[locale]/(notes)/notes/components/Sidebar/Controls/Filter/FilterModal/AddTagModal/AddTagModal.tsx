import FormBtn from "@/app/components/form/FormBtn";
import InputWithLabel from "@/app/components/form/InputWithLabel";
import Label from "@/app/components/form/Label";
import Modal from "@/app/components/Modal";
import useAddTagMutation from "@/app/hooks/queries/useAddTagMutation";
import useGetContext from "@/app/hooks/useGetContext";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import ColorInput from "./ColorInput";
import FilterModalContext from "../Context";

export interface TAddTagForm {
  color: string;
  name: string;
}

export default function AddTagModal() {
  const { isAddTagPopupOpen, setIsAddTagPopupOpen } =
    useGetContext(FilterModalContext);
  const {
    register,
    handleSubmit,
    watch: formWatch,
    formState: { errors: formErrs },
  } = useForm<TAddTagForm>();
  const formData = formWatch();
  const { mutate: addTag, isLoading } = useAddTagMutation();
  const formT = useTranslations("Tags.addTagForm");

  function onSubmit() {
    addTag(formData);
    setIsAddTagPopupOpen(false);
  }

  return (
    <Modal
      overlayStyle={{ zIndex: 40 }}
      isOpen={isAddTagPopupOpen}
      setIsOpen={setIsAddTagPopupOpen}
    >
      <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2">
          <InputWithLabel
            type="text"
            register={register("name", {
              required: formT("noName"),
            })}
            label={"Name"}
            errMsg={formErrs.name?.message}
          />
          <ColorInput
            errMsg={formErrs?.color?.message}
            color={formData.color}
            register={register}
          />
        </div>
        <FormBtn text="Submit" isLoading={isLoading} />
      </form>
    </Modal>
  );
}
