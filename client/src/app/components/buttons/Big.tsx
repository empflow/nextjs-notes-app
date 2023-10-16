import { ButtonProps } from "@/utils/componentsProps";
import { forwardRef } from "react";
import { baseClassNameNormal, baseClassNameOutlined } from "./common";

const BigBtn = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "normal", ...restProps }, ref) => {
    return (
      <button
        {...restProps}
        className={`${
          variant === "normal" ? baseClassNameNormal : baseClassNameOutlined
        } px-6 py-2`}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);
export default BigBtn;
