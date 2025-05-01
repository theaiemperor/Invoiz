import Tabs from "@/src/components/customUI/Tabs";
import { Box } from "@/src/components/ui/box";
import { Text } from "@/src/components/ui/text";
import useSettings from "@/src/store/useSettings";

export default function () {
  const { settings, updateSettings } = useSettings();

  const options = {
    dark: () => {
      updateSettings({ interface: "dark" });
    },
    light: () => {
      updateSettings({ interface: "light" });
    },
    system: () => {
      updateSettings({ interface: "system" });
    },
  };

  return (
    <Box className="gap-2">
      <Text>System Appearance </Text>

      <Tabs options={options} initialValue={settings.interface} />
    </Box>
  );
}
