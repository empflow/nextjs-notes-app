import View from "@/app/components/Views/View";

export default function ToolbarTextFormatSettingsView() {
  return (
    <View
      name="settings"
      nameToShow="the settings view"
      backBtn={{ navTo: "main", text: "Main" }}
    >
      hello this is the main settings content
    </View>
  );
}
