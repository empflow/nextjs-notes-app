import Link from "next/link";
import Logo from "../Logo";
import ProfileMenu from "./ProfileMenu";

export default function Header() {
  return (
    <header className="px-global sm:px-global-sm py-3 sticky top-0 z-10 backdrop-blur-lg bg-l-header dark:bg-d-header border-b border-light-xl-gray dark:border-dark-3xl-gray">
      <div className="flex max-w-global m-auto md justify-between items-center w-full">
        <div>
          <Link href="/">
            <Logo />
          </Link>
        </div>

        <div>
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
}
