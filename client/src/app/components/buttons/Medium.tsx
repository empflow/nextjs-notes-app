import { ButtonProps } from "@/utils/componentsProps";
import { forwardRef } from "react";
import { baseClassNameNormal, baseClassNameOutlined } from "./common";

const MediumBtn = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = "normal", ...restProps }, ref) => {
    return (
      <button
        {...restProps}
        className={`${
          variant === "normal" ? baseClassNameNormal : baseClassNameOutlined
        } px-5 py-[0.4rem]`}
        ref={ref}
      >
        {children}
      </button>
    );
  },
);

export default MediumBtn;
