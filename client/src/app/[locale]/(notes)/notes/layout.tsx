import NetworkStatusListener from "@/app/components/NetworkStatusListener";

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
