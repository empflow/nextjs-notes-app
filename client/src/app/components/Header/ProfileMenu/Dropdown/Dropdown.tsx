"use client";
import useGetContext from "@/app/hooks/useGetContext";
import ProfileMenuDropdownBtnsList from "./DropdownBtnsList";
import ProfileMenuContext from "@/contexts/ProfileMenuContext";
import ProfileMenuDropdownCloseBtn from "./CloseBtn";
import useGetDropdownTopPx from "./hooks/useGetDropdownTopPx";
import Popover from "@/app/components/Popover";

export default function ProfileMenuDropdown() {
  const profileMenuContext = useGetContext(ProfileMenuContext);
  const dropdownTopPx = useGetDropdownTopPx();
  const { signedInAs, isDropdownOpen, setIsDropdownOpen } = profileMenuContext;

  return (
    <Popover
      portalSelector="#main-content-popover-overlays"
      className={`absolute left-0 right-0 z-20 bg-transparent duration-200 sm:left-auto sm:w-[300px] sm:px-global ${
        isDropdownOpen
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-1 opacity-0"
      }`}
      isOpen={isDropdownOpen}
      setIsOpen={setIsDropdownOpen}
      position="bottom-left"
      style={{ top: dropdownTopPx }}
    >
      <div className="flex w-full flex-col gap-3 rounded border border-light-4xl-gray bg-l-secondary px-3 py-5 shadow-md dark:border-dark-3xl-gray dark:bg-d-secondary dark:shadow-none">
        <div>
          <div className="flex justify-between px-2 font-medium">
            <p className="truncate">{signedInAs}</p>
            <ProfileMenuDropdownCloseBtn />
          </div>
          <ProfileMenuDropdownBtnsList />
        </div>
      </div>
    </Popover>
  );
}
