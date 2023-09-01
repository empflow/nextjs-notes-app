import { useEffect } from "react";
import { TErrCode } from "@shared/types";
import { UseFormSetError } from "react-hook-form";
import { TSignInFormInputValues } from "../SignInForm";
import isAxiosErrWithResp from "@/utils/isAxiosErrWithResp";
import useSignInTranslations from "./useFormTranslations";
import useObserveQuery from "@/app/hooks/useObserveQuery";

interface TProps {
  setUnknownErr: () => void;
  setFormErr: UseFormSetError<TSignInFormInputValues>;
}

export default function useHandleSignInErrs({
  setFormErr,
  setUnknownErr,
}: TProps) {
  const { t } = useSignInTranslations();
  const { error: err } = useObserveQuery(["signIn"]);

  useEffect(() => {
    if (!err) return;
    if (!isAxiosErrWithResp(err)) return setUnknownErr();
    switch (err.response.data.errCode) {
      case TErrCode.WRONG_PASSWORD:
        return setFormErr("root.server", {
          type: "wrongPassword",
          message: t("wrongPassword"),
        });
      case TErrCode.USER_NOT_FOUND:
        return setFormErr("root.server", {
          type: "userNotFound",
          message: t("userNotFound"),
        });
      default:
        return setUnknownErr();
    }
  }, [err]);
}
