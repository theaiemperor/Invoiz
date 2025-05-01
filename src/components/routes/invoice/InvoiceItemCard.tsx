import { IInvoiceItem } from "../../../store/useCreateInvoice";
import { Card } from "../../ui/card";
import { Heading } from "../../ui/heading";
import { HStack } from "../../ui/hstack";
import { Text } from "../../ui/text";
import { VStack } from "../../ui/vstack";

export default function (props: IInvoiceItem) {
  return (
    <Card className="w-full my-2" size="sm">
      <Heading className="text-md">{props.name}</Heading>
      <HStack className="gap-3 justify-between mt-3">
        <VStack>
          <Text className="md:text-xs">Quantity</Text>
          <Text className="text-center font-bold">{props.quantity} </Text>
        </VStack>
        <VStack>
          <Text className="md:text-xs">Price</Text>
          <Text className="text-center font-bold ">₹{props.price}</Text>
        </VStack>
        <VStack>
          <Text className="md:text-xs">Total</Text>
          <Text className="text-center font-bold">
            ₹{(props.quantity * props.price).toFixed(2)}
          </Text>
        </VStack>
      </HStack>
    </Card>
  );
}
