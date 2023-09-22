import ProfileMenuContent from "./Content";
import serverGetAuthData from "@/utils/getAuthData/serverGetAuthData";
import ProfileMenuSignIn from "./SignIn";
import ProfileMenuContextProviders from "@/app/providers/ProfileMenuContext";

interface TProps {
  dropdownTopPx?: number;
}

export default function ProfileMenu({ dropdownTopPx }: TProps) {
  const authData = serverGetAuthData();
  if (!authData) return <ProfileMenuSignIn />;

  const { username: signedInAs } = authData;
  return (
    <ProfileMenuContextProviders {...{ signedInAs, dropdownTopPx }}>
      <ProfileMenuContent />
    </ProfileMenuContextProviders>
  );
}
