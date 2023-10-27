import colorInputStyles from "./colorInput.module.css";
import FormErr from "@/app/components/form/FormErr";
import Label from "@/app/components/form/Label";
import { useTranslations } from "next-intl";
import { UseFormRegister } from "react-hook-form";
import { TAddTagForm } from "./AddTagModal";

interface TProps {
  register: UseFormRegister<TAddTagForm>;
  errMsg?: string;
  color: string;
}

export default function ColorInput({ register, errMsg, color }: TProps) {
  const formT = useTranslations("Tags.addTagForm");
  return (
    <Label>
      Color
      <div className="flex items-center gap-2">
        <input
          {...register("color", {
            required: formT("noColor"),
          })}
          type="color"
          className="h-[50px] w-[80px]"
        />
        {color}
      </div>
      <FormErr content={errMsg} />
    </Label>
  );
}
