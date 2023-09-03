import { forwardRef } from "react";
import { ProfileMenuContext } from "./ProfileMenuContent";
import useGetContext from "@/app/hooks/useGetContext";
import ProfileMenuDropdownButtonsList from "./ProfileMenuDropdownButtonsList";

const ProfileMenuDropdown = forwardRef<HTMLDivElement>((props, ref) => {
  const profileMenuContext = useGetContext(ProfileMenuContext);
  const { signedInAs, isDropdownOpen } = profileMenuContext;

  return (
    <div
      ref={ref}
      className={`absolute left-0 right-0 top-[70px] bg-transparent px-global dark:shadow-none sm:left-auto sm:top-[56px] sm:px-0 sm:w-[300px]${
        isDropdownOpen ? "" : " hidden"
      }`}
    >
      <div className="flex w-full flex-col gap-3 rounded border-light-2xl-gray bg-l-secondary px-3 py-5 shadow-md dark:border-dark-3xl-gray dark:bg-d-secondary">
        <div className="px-2 font-medium">{signedInAs}</div>

        <ProfileMenuDropdownButtonsList />
      </div>
    </div>
  );
});

export default ProfileMenuDropdown;
