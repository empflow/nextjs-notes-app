import Link from "next/link";
import NameOrSignInButton from "./NameOrSignInButton";

export default function Header() {
  return (
    <header className="px-global sm:px-global-sm py-4 sticky top-0 z-10 backdrop-blur-lg bg-l-header dark:bg-d-header border-light-xl-gray dark:border-dark-xl-gray">
      <div className="flex max-w-global m-auto md justify-between w-full">
        <div>
          <Link href="/">
            <h2>Notes app</h2>
          </Link>
        </div>

        <div>
          <NameOrSignInButton />
        </div>
      </div>
    </header>
  );
}
