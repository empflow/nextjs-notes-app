import ProfileMenuContent from "./Content";
import serverGetAuthData from "@/utils/getAuthData/serverGetAuthData";
import ProfileMenuSignIn from "./SignIn";
import ProfileMenuContextProviders from "@/app/providers/ProfileMenuContext";

// this shit can only be used inside a server component!
// because there's apparently no way to get universal access to cookies both
// on server and client so that they match and don't produce a hydration
// mismatch error
export default function ProfileMenu() {
  const authData = serverGetAuthData();
  if (!authData) return <ProfileMenuSignIn />;
  return (
    <ProfileMenuContextProviders signedInAs={authData.username}>
      <ProfileMenuContent />
    </ProfileMenuContextProviders>
  );
}
