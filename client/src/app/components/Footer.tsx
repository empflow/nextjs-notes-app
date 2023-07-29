import Link from "next/link";
import ThemeSwitcher from "./ThemeSwitch";

export default function Footer() {
  return (
    <footer className="border-t border-light-xl-gray dark:border-dark-3xl-gray px-global sm:px-global-sm py-8 bg-l-secondary dark:bg-d-secondary">
      <div className="max-w-global m-auto">
        <div className="mb-5 flex justify-between">
          <div>
            <Link href="/" style={{ textDecoration: "none" }}>
              Notes app
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
              className="underline hover:text-blue-600"
            >
              me
            </Link>
          </div>

          <div>
            Copyright © 2023 Me
            <br />
            Absolutely no rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
