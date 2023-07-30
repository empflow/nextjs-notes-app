import { ButtonProps } from "../../utils/componentsProps";

const BigBtn: React.FC<ButtonProps> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <button
      {...restProps}
      className={`py-2 px-6 bg-blue hover:bg-blue-700 duration-200 text-white rounded ${className}`}
    >
      {children}
    </button>
  );
};

export default BigBtn;
