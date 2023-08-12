import React from "react";

interface NotesLayoutContext {
  children: React.ReactNode;
}

export default async function NotesLayout({ children }: NotesLayoutContext) {
  return <div>{children}</div>;
}
