import { ButtonProps } from "../../utils/componentsProps";

const BigButton: React.FC<ButtonProps> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <button
      {...restProps}
      className={`py-2 w-full bg-blue bg-l- hover:bg-blue-700 duration-200 text-white rounded ${className}`}
    >
      {children}
    </button>
  );
};

export default BigButton;
