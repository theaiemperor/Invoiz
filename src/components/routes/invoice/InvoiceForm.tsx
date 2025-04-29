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
import { VStack } from "../../ui/vstack";

export default function InvoiceForm() {
  // Schema validations
  const senderInfoSchema = z.object({
    // sender
    senderName: z
      .string({ required_error: "Name is Required" })
      .min(3, { message: "Minimum length will be 3." }),
    senderAddress: z
      .string({ required_error: "Address is Required." })
      .min(3, { message: "Minimum length will be 3." }),
    taxID: z.string().optional(),

    // receiver
    receiptionName: z
      .string({ required_error: "Name is Required" })
      .min(3, { message: "Minimum length will be 3." }),
    receiptionAddress: z
      .string({ required_error: "Address is Required." })
      .min(3, { message: "Minimum length will be 3." }),

    // receipt
    receiptNumber: z.coerce.number({
      required_error: "Receipt Number is Required",
    }),
    date: z.coerce.date({ required_error: "Date is Required" }),
    dueDate: z.coerce.date({ required_error: "Due Date is Required" }),
  });

  // Targetting inputs for focus
  const receiptionAddressRef = useRef<HTMLInputElement | null>(null);
  const senderAddressRef = useRef<HTMLInputElement | null>(null);

  // Handing Forms
  type SenderInfo = z.infer<typeof senderInfoSchema>;

  const form = useForm<SenderInfo>({
    resolver: zodResolver(senderInfoSchema),
  });

  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <Box className="w-full justify-center items-center">
      <VStack className="gap-5 w-full max-w-md">
        <FormProvider {...form}>
          {Platform.OS === "web" && (
            <Heading className="text-center">Create New Invoice</Heading>
          )}

          <Card>
            <Heading>Invoice Info</Heading>
            <VStack className="gap-2 mt-3">
              <FormTextInput
                name="receiptNumber"
                label="Reciept Number"
                keyboardType="number-pad"
                autoFocus
              />
              <FormTextInput name="date" label="Date" />
              <FormTextInput name="dueDate" label="Due Date" />
            </VStack>
          </Card>

          <Card>
            <Heading>Recieption Info</Heading>
            <VStack className="gap-2 mt-3">
              <FormTextInput
                name="receiptionName"
                label="Name"
                next
                nextFocus={receiptionAddressRef}
              />
              <FormTextInput
                reference={receiptionAddressRef}
                name="receiptionAddress"
                label="Address"
                multiline
                containerClassName="h-32 pt-2"
              />
            </VStack>
          </Card>
          <Card>
            <Heading>Sender Info</Heading>
            <VStack className="gap-2 mt-3">
              <FormTextInput
                name="senderName"
                label="Name"
                next
                nextFocus={senderAddressRef}
              />
              <FormTextInput
                reference={senderAddressRef}
                name="senderAddress"
                label="Address"
                multiline
                containerClassName="h-32 pt-2"
              />
              <FormTextInput name="taxID" label="Tax ID" next />
            </VStack>
          </Card>
        </FormProvider>

        <Button onPress={form.handleSubmit(onSubmit)}>
          <ButtonText>Next </ButtonText>
        </Button>
      </VStack>
    </Box>
  );
}
