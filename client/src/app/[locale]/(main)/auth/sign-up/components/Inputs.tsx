import SignUpEmailInput from "./EmailInput";
import SignUpIsUsernameAvailable from "./IsUsernameAvailable";
import SignUpPasswordInput from "./PasswordInput";

export default function SignUpInputs() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <SignUpEmailInput />
        <SignUpIsUsernameAvailable />
      </div>
      <SignUpPasswordInput />
    </div>
  );
}
