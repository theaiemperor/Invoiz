import NavBar from "@/src/components/global/NavBar";
import { Box } from "@/src/components/ui/box";
import { useBreakpointValue } from "@/src/components/ui/utils/use-break-point-value";
import { Tabs } from "expo-router";
import { HomeIcon, SettingsIcon } from "lucide-react-native";
import React from "react";

export default function () {
  const showNavbar = useBreakpointValue({ md: true });

  return (
    <React.Fragment>
      <Box className={showNavbar ? "block" : "hidden"}>
        <NavBar />
      </Box>

      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: showNavbar ? { display: "none" } : undefined,
        }}
      >
        <Tabs.Screen
          name="(home)"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <HomeIcon color={color} size={20} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => <SettingsIcon color={color} size={20} />,
          }}
        />
      </Tabs>
    </React.Fragment>
  );
}
