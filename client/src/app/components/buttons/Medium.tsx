import { ButtonProps } from "@/utils/componentsProps";

const MediumBtn: React.FC<ButtonProps> = ({
  children,
  className,
  ...restProps
}) => {
  return (
    <button
      {...restProps}
      className={`hover:bg-blue-700 rounded bg-l-accent px-5 py-[0.4rem] text-[0.95rem] text-white duration-200 dark:bg-d-accent ${className}`}
    >
      {children}
    </button>
  );
};

export default MediumBtn;
