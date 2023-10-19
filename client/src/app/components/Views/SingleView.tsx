import { ReactNode } from "react";

interface TProps {
  children: ReactNode;
  name?: string;
  childrenContainerClassName?: string;
  headerClassName?: string;
}

export default function SignleView({
  children,
  childrenContainerClassName,
  headerClassName,
  name,
}: TProps) {
  return (
    <div className="flex flex-col gap-2">
      {name && (
        <div className={`text-xl font-bold ${headerClassName ?? ""}`}>
          {name}
        </div>
      )}
      <div className={`${childrenContainerClassName ?? ""}`}>{children}</div>
    </div>
  );
}
