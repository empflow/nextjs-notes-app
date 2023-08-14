import { ButtonProps } from "@/utils/componentsProps";
import { baseClassName } from "./common";
import { forwardRef } from "react";

const TinyBtn = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, ...restProps }, ref) => {
    return (
      <button
        {...restProps}
        className={`${baseClassName} px-2 py-1 text-[0.9rem] ${className}`}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);

export default TinyBtn;
