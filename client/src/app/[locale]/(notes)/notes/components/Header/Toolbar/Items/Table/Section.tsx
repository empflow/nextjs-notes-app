import { ReactNode } from "react";

interface TProps {
  title?: string;
  children: ReactNode;
}

export default function TableMenuSection({ title, children }: TProps) {
  return (
    <div className="flex flex-col gap-1 px-3 pb-3">
      {title && <p className="font-bold">{title}</p>}
      <div className="flex flex-col">{children}</div>
    </div>
  );
}
