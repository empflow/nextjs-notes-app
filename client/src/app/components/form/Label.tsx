import { LabelHTMLAttributes, ReactNode } from "react";

interface TLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export default function Label({ children, ...attributes }: TLabelProps) {
  return (
    <label className="flex flex-col" {...attributes}>
      {children}
    </label>
  );
}
