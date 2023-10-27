import FormErr from "@/app/components/form/FormErr";

interface TProps {
  nameErrMsg?: string | null;
  colorErrMsg?: string | null;
  enabled: boolean;
}

export default function TagFormErrs({
  colorErrMsg,
  nameErrMsg,
  enabled,
}: TProps) {
  if (!enabled) return null;
  return (
    <div>
      <FormErr content={nameErrMsg} />
      <FormErr content={colorErrMsg} />
    </div>
  );
}
