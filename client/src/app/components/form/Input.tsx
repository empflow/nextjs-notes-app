import { UseFormRegisterReturn } from "react-hook-form";
import Label from "./Label";
import { InputHTMLAttributes } from "react";
import FormErr from "./FormErr";

interface TInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  register: UseFormRegisterReturn<string>;
  label?: string;
  errMsg?: string;
}

export default function Input({
  register,
  type,
  label,
  errMsg,
  ...attributes
}: TInputProps) {
  return (
    <Label className="flex flex-col gap-1">
      {label && label}
      <input
        type={type}
        {...register}
        {...attributes}
        className={`rounded border border-slate-300 p-2 dark:border-dark-xl-gray ${
          attributes.className ? attributes.className : ""
        }`}
      />
      <FormErr content={errMsg} />
    </Label>
  );
}
