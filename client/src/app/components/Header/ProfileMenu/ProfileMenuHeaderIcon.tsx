import ExpandIcon from "@/icons/Expand";
import throwIfValueNullOrUndefined from "@/utils/throwIfValueNullOrUndefined";
import { useTranslations } from "next-intl";
import { forwardRef, useContext } from "react";
import {
  IProfileMenuContextValue,
  ProfileMenuContext,
} from "./ProfileMenuContent";

const ProfileMenuHeaderIcon = forwardRef<HTMLDivElement>((props, ref) => {
  const t = useTranslations("Header");
  const profileMenuContext = useContext(ProfileMenuContext);
  throwIfValueNullOrUndefined(profileMenuContext);
  const { signedInAs, setIsDropdownOpen, isDropdownOpen } =
    profileMenuContext as IProfileMenuContextValue;

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
