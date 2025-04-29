import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Platform } from "react-native";
import { z } from "zod";
import FormTextInput from "../../global/FormInput/FormTextInput";
import { Box } from "../../ui/box";
import { Button, ButtonText } from "../../ui/button";
import { Card } from "../../ui/card";
import { Heading } from "../../ui/heading";
import { HStack } from "../../ui/hstack";
import { Text } from "../../ui/text";
import { VStack } from "../../ui/vstack";

export default function () {
  const itemsSchema = z.object({
    name: z.string({ required_error: "Name is Required." }),
    quantity: z.coerce.number({
      required_error: "Quantity is Required.",
      invalid_type_error: "Quantity should be Number.",
    }),
    price: z.coerce.number({
      required_error: "Price is Required.",
      invalid_type_error: "Price should be Number.",
    }),
  });

  const quantityRef = useRef<HTMLInputElement | null>(null);

  // Handing Forms
  type ItemsInfo = z.infer<typeof itemsSchema>;

  const form = useForm<ItemsInfo>({
    resolver: zodResolver(itemsSchema),
  });
  const quantity = form.watch("quantity");
  const totalPrice = (quantity * form.watch("price")).toFixed(2);

  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <Box className="w-full justify-center items-center">
      <VStack className="gap-5 w-full max-w-md">
        <FormProvider {...form}>
          {Platform.OS === "web" && (
            <Heading className="text-center">Add Items</Heading>
          )}

          <Card>
            <Heading>Item Info</Heading>
            <VStack className="gap-3 mt-3">
              <FormTextInput
                name="name"
                label="Name"
                autoFocus
                next
                nextFocus={quantityRef}
              />

              <HStack className="gap-3">
                <Box className="flex-1">
                  <FormTextInput
                    name="quantity"
                    keyboardType="number-pad"
                    label="Quantity"
                    reference={quantityRef}
                  />
                </Box>

                <Box className="flex-1">
                  <FormTextInput
                    name="price"
                    keyboardType="number-pad"
                    label="Price"
                  />
                </Box>
              </HStack>
              <Text>
                Price for {quantity > 1 ? "items" : "item"} will be{" "}
                {totalPrice === "NaN" ? "..." : totalPrice + " Rs."}
              </Text>
              <Button onPress={form.handleSubmit(onSubmit)}>
                <ButtonText>Add</ButtonText>
              </Button>
            </VStack>
          </Card>
        </FormProvider>
      </VStack>
    </Box>
  );
}
