import FormErr from "@/app/components/form/FormErr";
import useGetContext from "@/app/hooks/useGetContext";
import { TagContext } from "./Tag";

export default function TagFormErrs() {
  const {
    isEditingThisTag,
    form: {
      formState: { errors: formErrs },
    },
  } = useGetContext(TagContext);

  if (!isEditingThisTag) return null;
  return (
    <div>
      <FormErr content={formErrs.name?.message} />
      <FormErr content={formErrs.color?.message} />
    </div>
  );
}
