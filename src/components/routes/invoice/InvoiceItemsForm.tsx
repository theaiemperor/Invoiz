import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import { ArrowRightIcon } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import FormTextInput from "../../global/FormInput/FormTextInput";
import useCreateInvoice, { IInvoiceItem } from "../../store/useCreateInvoice";
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogHeader,
} from "../../ui/alert-dialog";
import { Box } from "../../ui/box";
import { Button, ButtonGroup, ButtonIcon, ButtonText } from "../../ui/button";
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

  const { data, addItem } = useCreateInvoice((data) => data);
  const [showDialog, setShowDialog] = useState(false);
  const quantityRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  // Handing Forms
  type ItemsInfo = z.infer<typeof itemsSchema>;

  const form = useForm<ItemsInfo>({
    resolver: zodResolver(itemsSchema),
  });
  const quantity = form.watch("quantity");
  const totalPrice = (quantity * form.watch("price")).toFixed(2);

  function onSubmit(data: IInvoiceItem) {
    try {
      addItem(data);
      form.reset();
    } catch (error) {
      setShowDialog(true);
    }
  }

  useEffect(() => {
    if (data === null) {
      setShowDialog(true);
    }
  }, []);

  return (
    <Box className="w-full justify-center items-center">
      <VStack className="gap-5 w-full max-w-md">
        <FormProvider {...form}>
          <Card size="sm">
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
              <ButtonGroup flexDirection="row">
                <Button
                  onPress={form.handleSubmit(onSubmit)}
                  className="flex-1"
                >
                  <ButtonText>Add</ButtonText>
                </Button>
                <Link href={"/preview"} asChild>
                  <Button>
                    <ButtonText>Next</ButtonText>
                    <ButtonIcon as={ArrowRightIcon} />
                  </Button>
                </Link>
              </ButtonGroup>
            </VStack>
          </Card>
        </FormProvider>
      </VStack>
      <AlertDialog isOpen={showDialog}>
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading className="text-typography-950 font-semibold" size="md">
              Invoice Not found
            </Heading>
          </AlertDialogHeader>

          <AlertDialogBody className="mt-3 mb-4">
            <Text size="sm">
              There is no Invoice found in which you can add these items so you
              have to first create a new invoice to add data in it.
            </Text>
            <Link href={"/create"} asChild onPress={() => setShowDialog(false)}>
              <Button className="mt-5 max-w-sm self-center">
                <ButtonText>Create a New Invoice</ButtonText>
              </Button>
            </Link>
          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </Box>
  );
}
