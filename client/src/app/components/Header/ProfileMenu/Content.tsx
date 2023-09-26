"use client";

import ProfileMenuHeaderIcon from "./HeaderIcon";
import ProfileMenuDropdown from "./Dropdown/Dropdown";

export default function ProfileMenuContent() {
  return (
    <div className="sm:relative">
      <ProfileMenuHeaderIcon />
      <ProfileMenuDropdown />
    </div>
  );
}
