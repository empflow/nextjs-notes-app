import { cookies } from "next/headers";
import Link from "next/link";
import { useTranslations } from "next-intl";
import ExpandIcon from "@/icons/Expand";

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

  return <Menu signedInAs={username || t("signedInAsUnknown")} />;
}

interface MenuProps {
  signedInAs: string;
}

function Menu({ signedInAs }: MenuProps) {
  return (
    <div className="relative flex gap-1 items-center dark:hover:bg-dark-4xl-gray rounded  hover:bg-light-5xl-gray p-1">
      <div className="flex text-sm font-medium items-center justify-center w-[28px] h-[28px] rounded-full border border-light-gray dark:border-gray">
        {signedInAs[0].toUpperCase()}
      </div>
      <div>
        <ExpandIcon pxSize={18} className="fill-light-gray dark:fill-gray" />
      </div>
    </div>
  );
}
