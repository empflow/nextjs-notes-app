import ProfileMenuContextProviders from "@/app/providers/ProfileMenuContextProviders/ProfileMenuContextProviders";
import serverGetAuthData from "@/utils/getAuthData/serverGetAuthData";
import { Link } from "@/i18nUtils";
import Logo from "../Logo";
import ProfileMenu from "./ProfileMenu/ProfileMenu";

export default function Header() {
  const authData = serverGetAuthData();
  return (
    <header className="sticky top-0 z-20 border-b border-light-xl-gray bg-l-header px-global py-3 backdrop-blur-lg dark:border-dark-3xl-gray dark:bg-d-header sm:px-global-sm">
      <div className="md m-auto flex w-full max-w-global items-center justify-between">
        <Link href="/" className="no-underline">
          <Logo />
        </Link>

        <ProfileMenuContextProviders authData={authData}>
          <ProfileMenu />
        </ProfileMenuContextProviders>
      </div>
    </header>
  );
}
