import SignInEmailInput from "./EmailInput";
import SignInPasswordInput from "./PasswordInput";

export default function SignInInputs() {
  return (
    <div className="flex flex-col gap-3">
      <SignInEmailInput />
      <SignInPasswordInput />
    </div>
  );
}
