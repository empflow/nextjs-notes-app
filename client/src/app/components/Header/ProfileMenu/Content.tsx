"use client";

import ProfileMenuHeaderIcon from "./HeaderIcon";
import ProfileMenuDropdown from "./Dropdown/Dropdown";
import ProfileMenuContext from "@/contexts/ProfileMenu";
import useGetContext from "@/app/hooks/useGetContext";

export default function ProfileMenuContent() {
  const { dropdownRef, headerIconRef } = useGetContext(ProfileMenuContext);

  return (
    <div className="sm:relative">
      <ProfileMenuHeaderIcon ref={headerIconRef} />
      <ProfileMenuDropdown ref={dropdownRef} />
    </div>
  );
}
