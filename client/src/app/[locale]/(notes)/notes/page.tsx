import protectedPage from "@/utils/protectedPage";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Editor from "./components/Editor/Editor";
import NotesContextProviders from "@/app/providers/NotesContextProviders";

export default function Notes() {
  protectedPage();
  return (
    <NotesContextProviders>
      <div className="flex min-h-[100dvh]">
        <Sidebar />
        <div className="flex w-full flex-col">
          <Header />
          <Editor />
        </div>
      </div>
    </NotesContextProviders>
  );
}
