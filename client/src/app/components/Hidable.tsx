import { ReactNode } from "react";

interface TProps {
  children: ReactNode;
  isHidden: boolean;
  width?: number;
  className?: string;
}

export default function Hidable({
  children,
  isHidden,
  width = 300,
  className,
}: TProps) {
  return (
    <div
      className={`${
        isHidden
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-1 opacity-0"
      } rounded border border-light-2xl-gray bg-l-secondary shadow-md duration-200 dark:border-dark-3xl-gray dark:bg-d-main ${
        className ?? ""
      }`}
      style={{ width }}
    >
      {children}
    </div>
  );
}
