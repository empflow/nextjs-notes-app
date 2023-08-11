import useFetch from "@/app/hooks/useFetch/useFetch";
import notify from "@/utils/notify";
import signOutClearData from "@/utils/signOutClearData";
import throwIfValueNullOrUndefined from "@/utils/throwIfValueNullOrUndefined";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { forwardRef, MouseEvent, useContext, useEffect, useRef } from "react";
import {
  IProfileMenuContextValue,
  ProfileMenuContext,
} from "./ProfileMenuContent";
import ProfileMenuDropdownButton from "./ProfileMenuDropdownButton";

const ProfileMenuDropdown = forwardRef<HTMLDivElement>((props, ref) => {
  const profileMenuContext = useContext(ProfileMenuContext);
  const errsT = useTranslations("Errors");
  throwIfValueNullOrUndefined(profileMenuContext);
  const { signedInAs, setIsDropdownOpen, isDropdownOpen } =
    profileMenuContext as IProfileMenuContextValue;
  const signOut = useFetch("/auth/sign-out", {
    method: "post",
  });

  function onSignOut(e: MouseEvent<HTMLButtonElement>) {
    const refreshToken = JSON.parse(Cookies.get("refreshToken") ?? "");
    signOut.fetch({ refreshToken });
  }

  useEffect(() => {
    if (!signOut.err) return;
    notify(errsT("generic"), "error");
  }, [signOut.err]);

  useEffect(() => {
    if (!signOut.data) return;
    signOutClearData();
    location.replace("/");
  }, [signOut.data]);

  return (
    <div
      ref={ref}
      className={`absolute left-0 right-0 top-[70px] bg-transparent px-global dark:shadow-none  sm:left-auto sm:top-[56px] sm:px-0 sm:w-[300px]${
        isDropdownOpen ? "" : " hidden"
      }`}
    >
      <div className="flex w-full flex-col gap-3 rounded border-light-2xl-gray bg-l-secondary px-3 py-5 shadow-md dark:border-dark-3xl-gray dark:bg-d-secondary">
        <div className="px-2 font-medium">{signedInAs}</div>

        {/* list of menu buttons */}
        <div className={`flex flex-col gap-1`}>
          <ProfileMenuDropdownButton
            translationName="signOut"
            onClick={onSignOut}
          />
        </div>
      </div>
    </div>
  );
});

export default ProfileMenuDropdown;
