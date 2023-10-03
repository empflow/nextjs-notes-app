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
      className={`${baseClassName} px-4 py-[0.3rem] text-[0.9rem] disabled:cursor-not-allowed disabled:bg-light-xl-gray disabled:text-dark-gray disabled:dark:bg-dark-3xl-gray disabled:dark:text-light-gray ${className}`}
    >
      {children}
    </button>
  );
};

export default SmallBtn;
