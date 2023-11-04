import { Link } from "@/i18nUtils";

export default function ProfileMenuSignIn() {
  return (
    <Link href="/auth/sign-in" className="no-underline">
      <button className="rounded border-2 border-l-accent px-2 py-1 text-l-accent duration-100 hover:bg-l-accent hover:text-white dark:border-light-3xl-blue dark:text-light-3xl-blue dark:hover:bg-light-3xl-blue dark:hover:text-black">
        Sign in
      </button>
    </Link>
  );
}
