import NetworkStatusListener from "@/app/components/NetworkStatusListener";
import React from "react";

interface NotesLayoutContext {
  children: React.ReactNode;
}

export default async function NotesLayout({ children }: NotesLayoutContext) {
  return (
    <>
      {children}
      <NetworkStatusListener editorWarning={true} />
    </>
  );
}
