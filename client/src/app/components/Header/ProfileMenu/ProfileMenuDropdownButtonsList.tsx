import useSignOutQuery from "@/app/hooks/queries/useSIgnOutQuery";
import ProfileMenuDropdownButton from "./ProfileMenuDropdownButton";

export default function ProfileMenuDropdownButtonsList() {
  const signOutQuery = useSignOutQuery();
  return (
    <div className={`flex flex-col gap-1`}>
      <ProfileMenuDropdownButton
        translationName="signOut"
        onClick={() => signOutQuery.refetch()}
      />
    </div>
  );
}
