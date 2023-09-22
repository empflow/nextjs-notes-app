import useGetContext from "@/app/hooks/useGetContext";
import ProfileMenuContext from "@/contexts/ProfileMenu";
import CloseIcon from "@/icons/svg/close.svg";
import { useTranslations } from "next-intl";

export default function ProfileMenuDropdownCloseBtn() {
  const { isDropdownOpen, setIsDropdownOpen } =
    useGetContext(ProfileMenuContext);
  const t = useTranslations("Header");

  let title: string;
  if (isDropdownOpen) title = t("closeMenu");
  else title = t("openMenu");

  return (
    <button
      title={title}
      onClick={() => setIsDropdownOpen((prev) => !prev)}
      className="sm:hidden"
    >
      <CloseIcon className="ml-auto fill-dark-2xl-gray dark:fill-light-2xl-gray" />
    </button>
  );
}
