import SimpleStackLayout from "@/src/components/global/SimpleStackLayout";
import { Stack } from "expo-router";

export default function () {
  return (
    <SimpleStackLayout title="Home">
      <Stack.Screen name="create" options={{ title: "Create New Invoice" }} />
      <Stack.Screen name="addItems" options={{ title: "Add Items" }} />
    </SimpleStackLayout>
  );
}
