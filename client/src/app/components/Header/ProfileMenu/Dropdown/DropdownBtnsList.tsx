import useSignOutQuery from "@/app/hooks/queries/useSIgnOutQuery";
import ProfileMenuDropdownBtn from "./DropdownBtn";

export default function ProfileMenuDropdownBtnsList() {
  const signOutQuery = useSignOutQuery();
  return (
    <div className={`flex flex-col gap-1`}>
      <ProfileMenuDropdownBtn
        translationName="signOut"
        onClick={() => signOutQuery.refetch()}
      />
    </div>
  );
}
