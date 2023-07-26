import Link from "next/link";
import NameOrSignInButton from "./NameOrSignInButton";

export default function Header() {
  return (
    <header className="px-global sm:px-global-sm py-4 sticky top-0 z-10 border-b bg-blur backdrop-blur-lg bg-white/40 border-gray-400 ">
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
