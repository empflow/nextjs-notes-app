import ProfileMenu from "@/app/components/Header/ProfileMenu/ProfileMenu";
import Toolbar from "./Toolbar/Toolbar";

export default function Header() {
  return (
    <header className="flex justify-between border-b border-light-3xl-gray p-global dark:border-dark-4xl-gray">
      <div></div>
      <Toolbar />
      <ProfileMenu />
    </header>
  );
}
