import { Card } from "../../ui/card";
import { Heading } from "../../ui/heading";
import { HStack } from "../../ui/hstack";
import { Text } from "../../ui/text";
import { VStack } from "../../ui/vstack";

export default function () {
  return (
    <Card className="w-full my-2" size="sm">
      <Heading className="text-md">Item Name</Heading>
      <HStack className="gap-3 justify-between mt-3">
        <VStack>
          <Text className="md:text-xs">Quantity</Text>
          <Text className="text-center font-bold">34 </Text>
        </VStack>
        <VStack>
          <Text className="md:text-xs">Price</Text>
          <Text className="text-center font-bold ">34 Rs.</Text>
        </VStack>
        <VStack>
          <Text className="md:text-xs">Total</Text>
          <Text className="text-center font-bold">34 Rs.</Text>
        </VStack>
      </HStack>
    </Card>
  );
}
