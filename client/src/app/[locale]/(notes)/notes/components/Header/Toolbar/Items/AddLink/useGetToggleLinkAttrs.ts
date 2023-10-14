import useGetContext from "@/app/hooks/useGetContext";
import { ToolbarContext } from "../../Context";

export default function useGetToggleLinkAttrs() {
  const { link } = useGetContext(ToolbarContext);
  let resolvedLink = link;

  if (!link.startsWith("http://") || !link.startsWith("https://")) {
    // the browser should automatically change the url to start with
    // `https://` if that's the only protocol the webiste supports
    resolvedLink = `http://${link}`;
  }

  return { href: resolvedLink, target: "_blank" };
}
