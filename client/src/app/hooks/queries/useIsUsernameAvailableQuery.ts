import { TSignUpFormInputValues } from "@/app/[locale]/(main)/auth/sign-up/components/SignUpForm";
import http from "@utils/http";
import { isUsernameAvailableRespSchema } from "@shared/types";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { UseFormClearErrors } from "react-hook-form";
import isEmailValid from "@/utils/isEmailValid";

interface TProps {
  clearFormErrs: UseFormClearErrors<TSignUpFormInputValues>;
  username: string;
  setUnknownErr: () => void;
}

export default function useIsUsernameAvailableQuery({
  clearFormErrs,
  username,
  setUnknownErr,
}: TProps) {
  const checkIsUsernameAvailTimeout = useRef<null | NodeJS.Timeout>(null);
  const query = useQuery(["isUsernameAvailable"], isUsernameAvailableFetch, {
    enabled: false,
  });

  useEffect(() => {
    console.log(username);
    clearFormErrs("root.server");
    clearTimeout(checkIsUsernameAvailTimeout.current!);

    const usernameExists = !!username.length;
    if (!usernameExists || !isEmailValid(username)) return;
    console.log("will set timeout");
    checkIsUsernameAvailTimeout.current = setTimeout(async () => {
      console.log("inside timeout");
      await query.refetch();
    }, 500);
  }, [username]);

  useEffect(() => {
    if (!query.error) return;
    setUnknownErr();
  }, [query.isError]);

  async function isUsernameAvailableFetch() {
    const { data } = await http.post("/auth/check-username-availability", {
      username: username,
    });
    return isUsernameAvailableRespSchema.parse(data);
  }

  return query;
}
