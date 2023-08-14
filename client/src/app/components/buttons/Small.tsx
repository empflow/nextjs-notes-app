import { ButtonProps } from "@/utils/componentsProps";

const SmallBtn: React.FC<ButtonProps> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <button
      {...restProps}
      className={`hover:bg-blue-700 rounded bg-l-accent px-4 py-[0.3rem] text-[0.9rem] text-white duration-200 dark:bg-d-accent ${className}`}
    >
      {children}
    </button>
  );
};

export default SmallBtn;
