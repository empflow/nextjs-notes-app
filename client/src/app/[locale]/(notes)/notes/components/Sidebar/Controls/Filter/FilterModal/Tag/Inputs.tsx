import ColorInput from "@/app/components/form/ColorInput/ColorInput";
import Input from "@/app/components/form/Input";
import { useTranslations } from "next-intl";
import { UseFormRegister } from "react-hook-form";
import { TAddTagForm } from "../AddTagModal/AddTagModal";

interface TProps {
  _id: string;
  register: UseFormRegister<TAddTagForm>;
  isEditingThisTag: boolean;
}

export default function TagInputs({ _id, register, isEditingThisTag }: TProps) {
  const formT = useTranslations("Tags.addTagForm");

  return (
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
  );
}
