import Link from "next/link";
import NameOrSignInButton from "./NameOrSignInButton";

export default function Header() {
  return (
    <header className="px-global sm:px-global-sm py-3 sticky top-0 z-10 backdrop-blur-lg bg-l-header dark:bg-d-header border-b border-light-xl-gray dark:border-dark-3xl-gray">
      <div className="flex max-w-global m-auto md justify-between w-full">
        <div>
          <Link href="/" className="no-underline">
            <h2 className="text-white text-xl">Notes app</h2>
          </Link>
        </div>

        <div>
          <NameOrSignInButton />
        </div>
      </div>
    </header>
  );
}
