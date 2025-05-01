import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "react-native";
import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";
import "../static/global.css";
import useSettings from "../store/useSettings";

export default function RootLayout() {
  const { settings } = useSettings();
  const colorSchema = useColorScheme();

  const isDark =
    settings.interface === "dark" ||
    (settings.interface === "system" && colorSchema === "dark");

  return (
    <GluestackUIProvider mode={isDark ? "dark" : "light"}>
      <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(routes)" />
        </Stack>
        <StatusBar style={isDark ? "light" : "dark"} />
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
