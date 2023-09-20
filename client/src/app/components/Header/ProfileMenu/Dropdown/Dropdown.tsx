import { forwardRef } from "react";
import useGetContext from "@/app/hooks/useGetContext";
import ProfileMenuDropdownBtnsList from "./DropdownBtnsList";
import ProfileMenuContext from "@/contexts/ProfileMenu";

const ProfileMenuDropdown = forwardRef<HTMLDivElement>((_props, ref) => {
  const profileMenuContext = useGetContext(ProfileMenuContext);
  const { signedInAs, isDropdownOpen } = profileMenuContext;

  return (
    <div
      ref={ref}
      className={`absolute left-0 right-0 top-[70px] bg-transparent px-global duration-200 dark:shadow-none sm:left-auto sm:top-[56px] sm:w-[300px] sm:px-0 ${
        isDropdownOpen
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-1 opacity-0"
      }`}
    >
      <div className="flex w-full flex-col gap-3 rounded border-light-2xl-gray bg-l-secondary px-3 py-5 shadow-md dark:border-dark-3xl-gray dark:bg-d-secondary">
        <div className="px-2 font-medium">{signedInAs}</div>
        <ProfileMenuDropdownBtnsList />
      </div>
    </div>
  );
});

export default ProfileMenuDropdown;
