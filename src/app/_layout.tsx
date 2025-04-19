import { Stack } from "expo-router";
import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";
import "../static/global.css";

export default function RootLayout() {
  return (
    <GluestackUIProvider mode="system">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(routes)" />
      </Stack>
    </GluestackUIProvider>
  );
}
