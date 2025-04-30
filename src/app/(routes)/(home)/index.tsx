import { Button, ButtonIcon, ButtonText } from "@/src/components/ui/button";
import { Text } from "@/src/components/ui/text";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { PlusIcon } from "lucide-react-native";
import { View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <View className="h-screen justify-center items-center">
        <Text className="my-5 text-4xl font-extrabold">Welcome to Inoviz!</Text>
        <Link href={"/create"} asChild>
          <Button>
            <ButtonIcon as={PlusIcon} />
            <ButtonText>Create Invoice</ButtonText>
          </Button>
        </Link>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}
