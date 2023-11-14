"use client";
import ProfileMenuSignIn from "./SignIn";
import useGetContext from "@/app/hooks/useGetContext";
import ProfileMenuContext from "@/app/providers/ProfileMenuContextProviders/ProfileMenuContext";
import ProfileMenuHeaderIcon from "./HeaderIcon";
import ProfileMenuDropdown from "./Dropdown/Dropdown";

export default function ProfileMenu() {
  const { authData } = useGetContext(ProfileMenuContext);
  if (!authData) return <ProfileMenuSignIn />;

  return (
    <div className="sm:relative">
      <ProfileMenuHeaderIcon />
      <ProfileMenuDropdown />
    </div>
  );
}
