import useGetContext from "@/app/hooks/useGetContext";
import { ToolbarContext } from "../../Context";

export default function useGetToggleLinkAttrs() {
  const { link } = useGetContext(ToolbarContext);
  return { href: link, target: "_blank" };
}
