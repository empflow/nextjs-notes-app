import protectedPage from "@/utils/protectedPage";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Editor from "./components/Editor/Editor";
import NotesContextProviders from "@/app/providers/NotesContextProviders";
import serverGetAuthData from "@/utils/getAuthData/serverGetAuthData";
import MainContentContextProviders from "./components/MainContent/ContextProvider";
import MainContent from "./components/MainContent/MainContent";

export default function Notes() {
  protectedPage();
  const authData = serverGetAuthData();
  return (
    <NotesContextProviders>
      <div className="flex h-[100dvh]">
        <Sidebar />
        <MainContentContextProviders authData={authData}>
          <MainContent />
        </MainContentContextProviders>
      </div>
    </NotesContextProviders>
  );
}
