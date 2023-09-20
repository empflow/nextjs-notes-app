import useGetContext from "@/app/hooks/useGetContext";
import ProfileMenuContext from "@/contexts/ProfileMenu";
import ExpandIcon from "@/icons/Expand";
import { useTranslations } from "next-intl";
import { forwardRef } from "react";

const ProfileMenuHeaderIcon = forwardRef<HTMLDivElement>((_props, ref) => {
  const t = useTranslations("Header");
  const profileMenuContext = useGetContext(ProfileMenuContext);
  const { signedInAs, setIsDropdownOpen, isDropdownOpen } = profileMenuContext;

  return (
    <div
      onClick={() => setIsDropdownOpen((prev) => !prev)}
      className="flex items-center gap-1 rounded p-1 hover:cursor-pointer hover:bg-light-5xl-gray dark:hover:bg-dark-4xl-gray"
      title={isDropdownOpen ? t("closeMenu") : t("openMenu")}
      ref={ref}
    >
      <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full border border-light-gray text-sm font-medium dark:border-gray">
        {signedInAs[0].toUpperCase()}
      </div>
      <div>
        <ExpandIcon pxSize={18} className="fill-light-gray dark:fill-gray" />
      </div>
    </div>
  );
});

export default ProfileMenuHeaderIcon;
