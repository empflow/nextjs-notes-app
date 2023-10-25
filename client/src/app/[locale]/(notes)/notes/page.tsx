import protectedPage from "@/utils/protectedPage";
import Sidebar from "./components/Sidebar/Sidebar";
import NotesContextProviders from "@/app/providers/NotesContextProviders";
import serverGetAuthData from "@/utils/getAuthData/serverGetAuthData";
import MainContent from "./components/MainContent/MainContent";
import ProfileMenuContextProviders from "@/app/providers/ProfileMenuContext";

export default function Notes() {
  protectedPage();
  const authData = serverGetAuthData();
  return (
    <ProfileMenuContextProviders authData={authData}>
      <NotesContextProviders>
        <div className="flex h-[100dvh]">
          <Sidebar />
          <MainContent />
        </div>
      </NotesContextProviders>
    </ProfileMenuContextProviders>
  );
}
