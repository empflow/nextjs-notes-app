import { ButtonProps } from "../../utils/componentsProps";

const MediumBtn: React.FC<ButtonProps> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <button
      {...restProps}
      className={`py-[0.4rem] px-5 text-[0.95rem] bg-blue hover:bg-blue-700 duration-200 text-white rounded ${className}`}
    >
      {children}
    </button>
  );
};

export default MediumBtn;
