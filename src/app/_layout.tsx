import { Slot } from "expo-router";
import "../static/global.css";
import { GluestackUIProvider } from "../components/ui/gluestack-ui-provider";
import { SafeAreaView } from "react-native-safe-area-context";

export default function () {
  return (
    <>
      <GluestackUIProvider mode="system">
        <SafeAreaView style={{ flex: 1 }}>
          <Slot />
        </SafeAreaView>
      </GluestackUIProvider>
    </>
  );
}
