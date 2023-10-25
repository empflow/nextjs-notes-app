import ProfileMenuContent from "./Content";
import ProfileMenuSignIn from "./SignIn";
import ProfileMenuContextProviders from "@/app/providers/ProfileMenuContext";
import useGetContext from "@/app/hooks/useGetContext";
import MainContentContext from "@/app/[locale]/(notes)/notes/components/MainContent/Context";

interface TProps {
  dropdownTopPx?: number;
}

export default function ProfileMenu({ dropdownTopPx }: TProps) {
  const { authData } = useGetContext(MainContentContext);
  if (!authData) return <ProfileMenuSignIn />;

  const { username: signedInAs } = authData;
  return (
    <ProfileMenuContextProviders {...{ signedInAs, dropdownTopPx }}>
      <ProfileMenuContent />
    </ProfileMenuContextProviders>
  );
}
