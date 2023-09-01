import isAxiosErrWithResp from "@/utils/isAxiosErrWithResp";
import { TErrCode } from "@shared/types";
import { useEffect } from "react";
import { UseFormSetError } from "react-hook-form";
import { TSignUpFormInputValues } from "../components/SignUpForm";
import useSignUpFormTranslations from "./useSignUpFormTranslations";
import useObserveQuery from "@/app/hooks/useObserveQuery";

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
  const { t } = useSignUpFormTranslations();
  const { error: err } = useObserveQuery(["signUp"]);

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
