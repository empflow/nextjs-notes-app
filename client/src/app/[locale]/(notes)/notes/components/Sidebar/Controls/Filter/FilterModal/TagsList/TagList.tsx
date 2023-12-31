import useTagsQuery from "@/app/hooks/reactQuery/useTagsQuery";
import { useTranslations } from "next-intl";
import { ReactNode } from "react";
import NoTags from "./NoTags";
import Tag from "../Tag/Tag";
import TagsLoading from "./TagsLoading";

export default function TagList() {
  const { data: tags, isError, isLoading } = useTagsQuery();
  const tErrs = useTranslations("Errors");
  let content: ReactNode;

  if (isError) content = tErrs("errHasOccurred");
  else if (isLoading) content = <TagsLoading />;
  else if (!tags.length) content = <NoTags />;
  else {
    content = tags.map(({ name, _id, color }) => (
      <Tag {...{ name, color, _id }} key={_id} />
    ));
  }

  return <div className="flex flex-col">{content}</div>;
}
