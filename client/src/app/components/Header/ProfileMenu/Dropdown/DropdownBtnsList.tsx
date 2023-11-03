import useSignOutQuery from "@/app/hooks/reactQuery/useSIgnOutQuery";
import SignOutIcon from "@/icons/svg/signOut.svg";
import { useTranslations } from "next-intl";
import ProfileMenuDropdownBtn from "./DropdownBtn";
import ProfileMenuDropdownThemeSwitcher from "./ThemeSwitcher";
import ThemeIcon from "@/icons/svg/theme.svg";

export default function ProfileMenuDropdownBtnsList() {
  const tHeader = useTranslations("Header");
  const tBtns = useTranslations("Header.Buttons");
  const signOutQuery = useSignOutQuery();

  return (
    <div className={`flex flex-col gap-1`}>
      <ProfileMenuDropdownBtn
        hoverable={false}
        icon={<ThemeIcon />}
        text={tHeader("theme")}
      >
        <ProfileMenuDropdownThemeSwitcher />
      </ProfileMenuDropdownBtn>

      <ProfileMenuDropdownBtn
        text={tBtns("signOut")}
        onClick={() => signOutQuery.refetch()}
        icon={<SignOutIcon width={22} />}
      />
    </div>
  );
}
