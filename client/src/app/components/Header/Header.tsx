import Link from "next/link";
import Logo from "../Logo";
import ProfileMenu from "./ProfileMenu/ProfileMenu";

export default function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-light-xl-gray bg-l-header px-global py-3 backdrop-blur-lg dark:border-dark-3xl-gray dark:bg-d-header sm:px-global-sm">
      <div className="md m-auto flex w-full max-w-global items-center justify-between">
        <Link href="/" className="no-underline">
          <Logo />
        </Link>

        <ProfileMenu dropdownTopPx={40} />
      </div>
    </header>
  );
}
