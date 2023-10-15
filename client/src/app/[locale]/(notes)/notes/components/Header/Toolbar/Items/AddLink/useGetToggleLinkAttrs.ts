import useGetContext from "@/app/hooks/useGetContext";
import { linkWithProtocolRegex } from "@shared/regexes";
import { ToolbarContext } from "../../Context";

export default function useGetToggleLinkAttrs() {
  const { link } = useGetContext(ToolbarContext);
  let resolvedLink = link;

  const linkHasProtocol = linkWithProtocolRegex.test(link);
  if (!linkHasProtocol) {
    resolvedLink = `http://${link}`;
  }

  return { href: resolvedLink, target: "_blank" };
}
