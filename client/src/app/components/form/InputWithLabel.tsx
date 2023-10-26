import { UseFormRegisterReturn } from "react-hook-form";
import Label from "./Label";
import { InputHTMLAttributes } from "react";
import FormErr from "./FormErr";
import Input from "./Input";

interface TInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type: string;
  register: UseFormRegisterReturn<string>;
  label?: string;
  errMsg?: string;
}

export default function InputWithLabel({
  register,
  type,
  label,
  errMsg,
  ...attrs
}: TInputProps) {
  return (
    <Label className="flex flex-col gap-1">
      {label && label}
      <Input {...attrs} register={register} />
      <FormErr content={errMsg} />
    </Label>
  );
}
