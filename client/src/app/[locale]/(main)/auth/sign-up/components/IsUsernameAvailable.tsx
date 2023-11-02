import Loading from "@/app/components/Loading";
import useObserveQuery from "@/app/hooks/useObserveQuery";
import useGetContext from "@/app/hooks/useGetContext";
import SignUpFormContext from "@/contexts/SignUpFormContext";
import CheckmarkIcon from "@/icons/Checkmark";
import ErrIcon from "@/icons/Err";
import isEmailValid from "@/utils/isEmailValid";
import { TBooleanResp as TIsUsernameAvailableResp } from "@shared/respSchemas/booleanResp";
import { useQueryClient } from "@tanstack/react-query";
import useSignUpFormTranslations from "../hooks/useSignUpFormTranslations";

export default function SignUpIsUsernameAvailable() {
  const { email } = useGetContext(SignUpFormContext);
  const { t } = useSignUpFormTranslations();
  const queryClient = useQueryClient();

  const { data, isFetching } = useObserveQuery<TIsUsernameAvailableResp>([
    "isUsernameAvailable",
  ]);

  if (!isEmailValid(email)) {
    queryClient.setQueryData(["isUsernameAvailable"], null);
  }

  if (!data || !isEmailValid(email)) return null;

  if (isFetching) {
    return (
      <div className="flex items-center gap-2">
        <Loading pxSize={24} />
        {t("checkingUsernameAvailability")}
      </div>
    );
  }

  if (data.ok) {
    return (
      <div className="flex items-center gap-2">
        <CheckmarkIcon
          className="flex-shrink-0 fill-l-success dark:fill-d-success"
          pxSize={24}
        />
        {t("usernameAvailable")}
      </div>
    );
  } else {
    return (
      <div className="flex items-center gap-2">
        <ErrIcon
          pxSize={22}
          className="flex-shrink-0 fill-l-error dark:fill-d-error"
        />
        {t("usernameTaken", { username: email })}
      </div>
    );
  }
}
