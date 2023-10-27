import ColorInput from "@/app/components/form/ColorInput/ColorInput";
import Input from "@/app/components/form/Input";
import useObserveQuery from "@/app/hooks/useObserveQuery";
import { useTranslations } from "next-intl";
import { MutableRefObject, Ref, RefObject } from "react";
import { UseFormRegister } from "react-hook-form";
import { TAddTagForm } from "../AddTagModal/AddTagModal";

interface TProps {
  _id: string;
  register: UseFormRegister<TAddTagForm>;
  isEditingThisTag: boolean;
  nameInputRef: MutableRefObject<HTMLInputElement | null>;
  name: string;
  color: string;
}

export default function TagInputs({
  _id,
  register,
  isEditingThisTag,
  nameInputRef,
  color,
  name,
}: TProps) {
  const formT = useTranslations("Tags.addTagForm");
  const { ref: nameInputRegisterRef, ...nameInputRegisterRest } = register(
    "name",
    { required: formT("noName") },
  );

  return (
    <div key={_id} className="flex items-center gap-2">
      {isEditingThisTag ? (
        <>
          <ColorInput
            className="disabled:cursor-default"
            style={{ width: 30, height: 34 }}
            register={register("color", { required: formT("noColor") })}
            disabled={!isEditingThisTag}
          />
          <Input
            {...nameInputRegisterRest}
            ref={(e) => {
              nameInputRegisterRef(e);
              nameInputRef.current = e;
            }}
            className="disabled:border-none disabled:bg-transparent"
            disabled={!isEditingThisTag}
            type="text"
            style={{ padding: 4 }}
          />
        </>
      ) : (
        <>
          <ColorInput
            className="disabled:cursor-default"
            style={{ width: 30, height: 34 }}
            disabled={!isEditingThisTag}
            value={color}
          />
          <Input
            ref={nameInputRef}
            className="disabled:border-none disabled:bg-transparent"
            disabled={!isEditingThisTag}
            type="text"
            value={name}
            style={{ padding: 4 }}
          />
        </>
      )}
    </div>
  );
}
