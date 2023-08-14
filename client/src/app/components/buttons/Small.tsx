import { ButtonProps } from "@/utils/componentsProps";
import { baseClassName } from "./common";

const SmallBtn: React.FC<ButtonProps> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <button
      {...restProps}
      className={`${baseClassName} px-4 py-[0.3rem] text-[0.9rem] ${className}`}
    >
      {children}
    </button>
  );
};

export default SmallBtn;
