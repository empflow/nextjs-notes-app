import { ButtonProps } from "@/utils/componentsProps";
import { baseClassName } from "./common";

const MediumBtn: React.FC<ButtonProps> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <button
      {...restProps}
      className={`${baseClassName} px-5 py-[0.4rem] ${className}`}
    >
      {children}
    </button>
  );
};

export default MediumBtn;
