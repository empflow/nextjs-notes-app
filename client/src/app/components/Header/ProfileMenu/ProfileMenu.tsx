import { cookies } from "next/headers";
import Link from "next/link";
import { useTranslations } from "next-intl";
import ProfileMenuContent from "./ProfileMenuContent";

export default function ProfileMenu() {
  const t = useTranslations("Header");
  const cookiesStore = cookies();
  const username = cookiesStore.get("username")?.value ?? null;
  const refreshToken = cookiesStore.get("refreshToken")?.value ?? null;

  if (!username || !refreshToken) {
    return (
      <Link href="/auth/sign-in" className="no-underline">
        <button className="rounded border-2 border-l-accent px-2 py-1 text-l-accent duration-100 hover:bg-l-accent hover:text-white dark:border-light-3xl-blue dark:text-light-3xl-blue dark:hover:bg-light-3xl-blue dark:hover:text-black">
          Sign in
        </button>
      </Link>
    );
  }

  return <ProfileMenuContent signedInAs={username || t("signedInAsUnknown")} />;
}
