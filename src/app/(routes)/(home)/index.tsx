import { StatusBar } from "expo-status-bar";
import { Alert, Platform, View } from "react-native";
import { Button, ButtonText } from "@/src/components/ui/button";
import { Text } from "@/src/components/ui/text";

export default function Index() {
  async function greet() {
    Alert.alert("Greeting Message", "Hello, From Invoiz!");
    Platform.OS === "web" && alert("Hello From Invoiz!");
  }

  return (
    <View className="flex-1 justify-center items-center">
      <View className="h-screen justify-center items-center">
        <Text className="my-5 text-4xl font-extrabold">Welcome to Inoviz!</Text>
        <Button onPress={greet}>
          <ButtonText>Greet</ButtonText>
        </Button>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}
