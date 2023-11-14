import protectedPage from "@/utils/protectedPage";
import Sidebar from "./components/Sidebar/Sidebar";
import NotesContextProviders from "./NotesContextProviders";
import serverGetAuthData from "@/utils/getAuthData/serverGetAuthData";
import MainContent from "./components/MainContent/MainContent";
import ProfileMenuContextProviders from "@/app/providers/ProfileMenuContextProviders/ProfileMenuContextProviders";
import { unstable_setRequestLocale } from "next-intl/server";

interface TProps {
  params: {
    locale: string;
  };
}

export default function Notes({ params: { locale } }: TProps) {
  unstable_setRequestLocale(locale);
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
