import Link from "next/link";
import Logo from "./Logo";
import ThemeSwitcher from "./ThemeSwitch";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-light-xl-gray bg-l-secondary px-global py-8 dark:border-dark-3xl-gray dark:bg-d-secondary sm:px-global-sm">
      <div className="m-auto max-w-global">
        <div className="mb-5 flex justify-between">
          <div>
            <Link href="/" className="no-underline">
              <Logo />
            </Link>
          </div>
          <div>
            <ThemeSwitcher />
          </div>
        </div>

        <div className="text-gray-600 dark:text-gray-500">
          <div className="mb-2">
            Made by{" "}
            <Link
              target="_blank"
              href="https://github.com/empflow"
              className="hover:text-l-link dark:hover:text-d-link underline"
            >
              me
            </Link>
          </div>

          <div>
            Copyright © {year} Me
            <br />
            Absolutely no rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
