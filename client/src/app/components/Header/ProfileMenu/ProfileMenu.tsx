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
    return <Link href="/auth/sign-in">Sign in</Link>;
  }

  return <ProfileMenuContent signedInAs={username || t("signedInAsUnknown")} />;
}
