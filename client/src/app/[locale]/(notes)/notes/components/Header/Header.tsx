import ProfileMenu from "@/app/components/Header/ProfileMenu/ProfileMenu";
import BackArrow from "./BackArrow";
import Toolbar from "./Toolbar/Toolbar";

export default function Header() {
  return (
    <header className="relative flex justify-between gap-2 border-b border-light-3xl-gray bg-light-5xl-gray p-global dark:border-dark-4xl-gray dark:bg-d-secondary">
      <BackArrow />
      <Toolbar />
      <ProfileMenu />
    </header>
  );
}
