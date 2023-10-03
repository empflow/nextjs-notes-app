import { ReactNode } from "react";

interface TProps {
  children: ReactNode;
  name?: string;
  childrenClassName?: string;
}

export default function SignleView({
  children,
  childrenClassName,
  name,
}: TProps) {
  return (
    <div className="flex flex-col gap-2">
      {name && <div className="text-xl font-bold">{name}</div>}
      <div className={`flex flex-col ${childrenClassName ?? ""}`}>
        {children}
      </div>
    </div>
  );
}
