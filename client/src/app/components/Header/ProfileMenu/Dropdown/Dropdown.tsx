import { forwardRef } from "react";
import useGetContext from "@/app/hooks/useGetContext";
import ProfileMenuDropdownBtnsList from "./DropdownBtnsList";
import ProfileMenuContext from "@/contexts/ProfileMenu";
import ProfileMenuDropdownCloseBtn from "./CloseBtn";

const ProfileMenuDropdown = forwardRef<HTMLDivElement>((_props, ref) => {
  const profileMenuContext = useGetContext(ProfileMenuContext);
  const { signedInAs, isDropdownOpen } = profileMenuContext;

  return (
    <div
      ref={ref}
      className={`absolute left-0 right-0 top-0 z-10 bg-transparent duration-200 dark:shadow-none sm:left-auto sm:w-[300px] sm:px-global ${
        isDropdownOpen
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-1 opacity-0"
      }`}
    >
      <div className="flex w-full flex-col gap-3 rounded border-light-2xl-gray bg-l-secondary px-3 py-5 shadow-md dark:border-dark-3xl-gray dark:bg-d-secondary">
        <div>
          <div className="flex justify-between px-2 font-medium">
            <p className="truncate">{signedInAs}</p>
            <ProfileMenuDropdownCloseBtn />
          </div>
          <ProfileMenuDropdownBtnsList />
        </div>
      </div>
    </div>
  );
});

export default ProfileMenuDropdown;
