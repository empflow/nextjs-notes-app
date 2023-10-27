import { ButtonProps } from "@/utils/componentsProps";
import { forwardRef } from "react";
import { baseClassNameNormal, baseClassNameOutlined } from "./common";

const SmallBtn = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "normal", children, className, ...restProps }, ref) => {
    return (
      <button
        {...restProps}
        ref={ref}
        className={`${
          variant === "normal" ? baseClassNameNormal : baseClassNameOutlined
        } px-4 py-[0.3rem] text-[0.9rem] disabled:cursor-not-allowed disabled:bg-light-xl-gray disabled:text-dark-gray disabled:dark:bg-dark-3xl-gray disabled:dark:text-light-gray ${
          className ? className : ""
        }`}
      >
        {children}
      </button>
    );
  },
);

export default SmallBtn;
