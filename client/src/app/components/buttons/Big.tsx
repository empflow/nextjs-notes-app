import { ButtonProps } from "@/utils/componentsProps";
import { baseClassName } from "./common";

const BigBtn: React.FC<ButtonProps> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <button
      {...restProps}
      className={`${baseClassName} px-6 py-2 ${className}`}
    >
      {children}
    </button>
  );
};

export default BigBtn;
