"use client";

import ExpandIcon from "@/icons/Expand";
import { MouseEvent, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import useFetch from "@/app/hooks/useFetch";
import ProfileMenuButton from "./ProfileMenuButton";
import notify from "@/utils/notify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import signOutClearData from "@/utils/signOutClearData";

interface MenuProps {
  signedInAs: string;
}

export default function ProfileMenuContent({ signedInAs }: MenuProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Header");
  const errsT = useTranslations("Errors");
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
    <div className="sm:relative">
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1 rounded p-1 hover:cursor-pointer hover:bg-light-5xl-gray dark:hover:bg-dark-4xl-gray"
        title={isOpen ? t("closeMenu") : t("openMenu")}
      >
        <div className="flex h-[28px] w-[28px] items-center justify-center rounded-full border border-light-gray text-sm font-medium dark:border-gray">
          {signedInAs[0].toUpperCase()}
        </div>
        <div>
          <ExpandIcon pxSize={18} className="fill-light-gray dark:fill-gray" />
        </div>
      </div>

      {/* menu */}
      <div
        className={`absolute left-0 right-0 top-[70px] bg-transparent px-global dark:shadow-none  sm:left-auto sm:top-[56px] sm:px-global-sm sm:w-[300px]${
          !isOpen ? " hidden" : ""
        }`}
      >
        <div className="flex flex-col gap-3 rounded border-light-2xl-gray bg-l-secondary px-3 py-5 shadow-md dark:border-dark-3xl-gray dark:bg-d-secondary">
          <div className="px-2 font-medium">{signedInAs}</div>

          {/* list of menu buttons */}
          <div className={`flex flex-col gap-1`}>
            <ProfileMenuButton translationText="signOut" onClick={onSignOut} />
          </div>
        </div>
      </div>
    </div>
  );
}
