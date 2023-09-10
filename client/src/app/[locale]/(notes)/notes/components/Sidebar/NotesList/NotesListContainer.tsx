import { ReactNode } from "react";

export default function NotesListContainer({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="flex flex-grow flex-col">{children}</div>;
}