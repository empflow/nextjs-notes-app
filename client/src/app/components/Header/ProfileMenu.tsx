import { cookies } from "next/headers";
import Link from "next/link";
import { useTranslations } from "next-intl";
import ProfileMenuContent from "./ProfileMenuContent";

export default function ProfileMenu() {
  const t = useTranslations("Header");
  const cookiesStore = cookies();
  const username = cookiesStore.get("username")?.value ?? null;
  const accessToken = cookiesStore.get("accessToken")?.value ?? null;
  const refreshToken = cookiesStore.get("refreshToken")?.value ?? null;

  if (!username || !accessToken || !refreshToken) {
    return (
      <Link href="/sign-in">
        <button>Sign in</button>
      </Link>
    );
  }

  return <ProfileMenuContent signedInAs={username || t("signedInAsUnknown")} />;
}
