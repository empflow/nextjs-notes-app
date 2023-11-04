import useTagsQuery from "@/app/hooks/reactQuery/useTagsQuery";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import AssignTagModalNoTags from "./NoTags";
import AssignTagModalTag from "./Tag/Tag";

export default function AssignTagsModalTagList() {
  const { data: tags, isError, isLoading } = useTagsQuery();
  const tErrs = useTranslations("Errors");
  const t = useTranslations();

  let content: ReactNode;

  if (isError) content = tErrs("errHasOccurred");
  else if (isLoading) content = `${t("Loading")}...`;
  else if (!tags.length) content = <AssignTagModalNoTags />;
  else {
    content = tags.map(({ name, _id, color }) => {
      return <AssignTagModalTag {...{ name, color, _id }} key={_id} />;
    });
  }

  return <div className="flex flex-col gap-3">{content}</div>;
}
