import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface TProps extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn;
  className?: string;
}

export default function Input({ register, className, ...attrs }: TProps) {
  return (
    <input
      className={`rounded border border-slate-300 p-2 dark:border-dark-xl-gray ${
        className ? className : ""
      }`}
      {...register}
      {...attrs}
    />
  );
}
