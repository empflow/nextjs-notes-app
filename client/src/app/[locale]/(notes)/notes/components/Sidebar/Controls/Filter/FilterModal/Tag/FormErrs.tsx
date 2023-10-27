import FormErr from "@/app/components/form/FormErr";

interface TProps {
  nameErrMsg?: string;
  colorErrMsg?: string;
}

export default function TagFormErrs({ colorErrMsg, nameErrMsg }: TProps) {
  return (
    <div>
      <FormErr content={nameErrMsg} />
      <FormErr content={colorErrMsg} />
    </div>
  );
}
