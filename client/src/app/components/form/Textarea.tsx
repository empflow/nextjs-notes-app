import { UseFormRegisterReturn } from "react-hook-form";
import Label from "./Label";
import { TextareaHTMLAttributes } from "react";
import FormErr from "./FormErr";

interface TInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  register: UseFormRegisterReturn<string>;
  label: string;
  errMsg?: string;
}

export default function Textarea({
  register,
  label,
  errMsg,
  ...attributes
}: TInputProps) {
  return (
    <Label>
      {label}
      <textarea
        className="border-gray-300 rounded border px-2 py-1"
        {...register}
        {...attributes}
      />
      <FormErr content={errMsg} />
    </Label>
  );
}
