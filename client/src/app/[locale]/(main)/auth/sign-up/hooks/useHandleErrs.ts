import isAxiosErrWithResp from "@/utils/isAxiosErrWithResp";
import { TAuthResp, TErrCode } from "@shared/types";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { UseFormSetError } from "react-hook-form";
import { TSignUpFormInputValues } from "../components/SignUpForm";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface TProps {
  setUnknownErr: () => void;
  setFormErr: UseFormSetError<TSignUpFormInputValues>;
  email: string;
}

export default function useHandleErrs({
  setUnknownErr,
  setFormErr,
  email,
}: TProps) {
  const t = useTranslations("SignUp");

  const queryClient = useQueryClient();
  const state = queryClient.getQueryState<TAuthResp, AxiosError>(["signUp"]);
  if (!state) return null;
  const { error: err } = state;

  useEffect(() => {
    if (!err) return;
    if (!isAxiosErrWithResp(err)) return setUnknownErr();
    switch (err.response.data.errCode) {
      case TErrCode.USERNAME_TAKEN:
        return setFormErr("root.server", {
          type: "usernameTaken",
          message: t("usernameTaken", { username: email }),
        });
      case TErrCode.PASSWORD_TOO_WEAK:
        return setFormErr("root.server", {
          type: "passwordTooWeak",
          message: t("passwordTooWeak"),
        });
      default:
        return setUnknownErr();
    }
  }, [err]);
}
