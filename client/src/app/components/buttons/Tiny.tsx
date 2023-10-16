import { ButtonProps } from "@/utils/componentsProps";
import { baseClassNameNormal, baseClassNameOutlined } from "./common";
import { forwardRef } from "react";

const TinyBtn = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "normal", ...restProps }, ref) => {
    return (
      <button
        {...restProps}
        className={`${
          variant === "normal" ? baseClassNameNormal : baseClassNameOutlined
        } px-2 py-1 text-[0.9rem]`}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);

export default TinyBtn;
