import View from "@/app/components/Views/View";
import { ViewsContainerContext } from "@/app/components/Views/ViewsContainer";
import useGetContext from "@/app/hooks/useGetContext";

export default function ToolbarTextFormatMainView() {
  const { setActiveView } = useGetContext(ViewsContainerContext);
  return (
    <View name="main" nameToShow="the main menu">
      hello this is the main menu content
      <button onClick={() => setActiveView("settings")}>settings</button>
    </View>
  );
}
