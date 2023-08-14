import { ButtonProps } from "@/utils/componentsProps";

const BigBtn: React.FC<ButtonProps> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <button
      {...restProps}
      className={`hover:bg-blue-700 flex items-center rounded bg-l-accent px-6 py-2 text-white duration-200 dark:bg-d-accent ${className}`}
    >
      {children}
    </button>
  );
};

export default BigBtn;
