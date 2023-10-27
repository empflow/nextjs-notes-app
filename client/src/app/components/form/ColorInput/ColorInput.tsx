import { UseFormRegisterReturn } from "react-hook-form";
import { InputHTMLAttributes } from "react";
import styles from "./styles.module.scss";

interface TInputProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn<string>;
  className?: string;
}

export default function ColorInput({
  register,
  className,
  ...attributes
}: TInputProps) {
  return (
    <input
      type="color"
      className={`border border-slate-300 dark:border-dark-xl-gray ${
        styles.colorInput
      } ${className ? className : ""}`}
      {...register}
      {...attributes}
    />
  );
}
