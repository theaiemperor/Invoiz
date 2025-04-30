import React, { PropsWithChildren, useEffect } from "react";
import { config } from "./config";
import { View, ViewProps } from "react-native";
import { OverlayProvider } from "@gluestack-ui/overlay";
import { useColorScheme } from "nativewind";

interface Props extends PropsWithChildren {
  mode?: "light" | "dark" | "system";
  children?: React.ReactNode;
  style?: ViewProps["style"];
}

export function GluestackUIProvider({ mode = "dark", ...props }: Props) {
  const { colorScheme, setColorScheme } = useColorScheme();

  useEffect(() => {
    setColorScheme(mode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  return (
    <View
      style={[
        config[colorScheme!],
        { flex: 1, height: "100%", width: "100%" },
        props.style,
      ]}
    >
      <OverlayProvider>{props.children}</OverlayProvider>
    </View>
  );
}
