import { forwardRef, InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface TProps extends InputHTMLAttributes<HTMLInputElement> {
  register?: UseFormRegisterReturn;
  className?: string;
}

const InputWithRef = forwardRef<HTMLInputElement, TProps>(
  ({ register, className, ...attrs }, ref) => {
    return (
      <input
        {...attrs}
        {...register}
        className={`rounded border border-slate-300 p-2 dark:border-dark-xl-gray ${
          className ? className : ""
        }`}
        ref={ref}
      />
    );
  },
);

export default InputWithRef;
