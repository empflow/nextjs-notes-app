import EmailInput from "./EmailInput";
import IsUsernameAvailable from "./IsUsernameAvailable";
import PasswordInput from "./PasswordInput";

export default function Inputs() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <EmailInput />
        <IsUsernameAvailable />
      </div>
      <PasswordInput />
    </div>
  );
}
