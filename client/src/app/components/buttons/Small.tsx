import { ButtonProps } from "../../utils/componentsProps";

const SmallBtn: React.FC<ButtonProps> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <button
      {...restProps}
      className={`py-[0.3rem] px-4 text-[0.9rem] bg-blue hover:bg-blue-700 duration-200 text-white rounded ${className}`}
    >
      {children}
    </button>
  );
};

export default SmallBtn;
