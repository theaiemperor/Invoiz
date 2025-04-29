import { useBreakpointValue } from "@/src/components/ui/utils/use-break-point-value";
import { Slot, Stack } from "expo-router";
import { PropsWithChildren } from "react";
import { Platform } from "react-native";

interface Props extends PropsWithChildren {
  name?: string;
  title: string;
}

export default function ({ name, title, children }: Props) {
  const hideStack = useBreakpointValue({ md: true });

  if (Platform.OS === "web" && hideStack) {
    return <Slot />;
  }
  return (
    <Stack>
      <Stack.Screen name={name || "index"} options={{ title }} />
      {children}
    </Stack>
  );
}
