import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { memo, useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Platform } from "react-native";
import { z } from "zod";
import FormDateInput from "../../global/FormInput/FormDateInput";
import FormTextInput from "../../global/FormInput/FormTextInput";
import useCreateInvoice, {
  ICreateInvoiceProps,
} from "../../../store/useCreateInvoice";
import { Box } from "../../ui/box";
import { Button, ButtonText } from "../../ui/button";
import { Card } from "../../ui/card";
import { Heading } from "../../ui/heading";
import { VStack } from "../../ui/vstack";

function InvoiceForm() {
  // Schema validations
  const invoiceInfoSchema = z.object({
    // sender
    senderName: z
      .string({ required_error: "Name is Required" })
      .min(3, { message: "Minimum length will be 3." }),
    senderAddress: z
      .string({ required_error: "Address is Required." })
      .min(3, { message: "Minimum length will be 3." }),
    taxID: z.string().optional(),

    // receiver
    recipientName: z
      .string({ required_error: "Name is Required" })
      .min(3, { message: "Minimum length will be 3." }),
    recipientAddress: z
      .string({ required_error: "Address is Required." })
      .min(3, { message: "Minimum length will be 3." }),

    // receipt
    recieptNumber: z.coerce.number({
      required_error: "Receipt Number is Required",
    }),
    date: z.coerce.date({ required_error: "Date is Required" }),
    dueDate: z.coerce.date({ required_error: "Due Date is Required" }),
  });

  const { data, addInfo } = useCreateInvoice();

  // Targetting inputs for focus
  const recieptNumberRef = useRef<HTMLInputElement | null>(null);
  const receiptionAddressRef = useRef<HTMLInputElement | null>(null);
  const senderAddressRef = useRef<HTMLInputElement | null>(null);

  // Handing Forms
  type InvoiceInfo = z.infer<typeof invoiceInfoSchema>;

  const form = useForm<InvoiceInfo>({
    resolver: zodResolver(invoiceInfoSchema),
    defaultValues: {
      date: data?.date || new Date(),
      dueDate:
        data?.dueDate ||
        new Date(new Date().setDate(new Date().getDate() + 14)),
    },
  });
  const router = useRouter();

  function onSubmit(data: Omit<ICreateInvoiceProps, "items" | "total">) {
    addInfo({ ...data, items: [], total: 0 });
    router.push("/addItems");
  }

  useEffect(() => {
    recieptNumberRef.current?.focus();
  }, []);

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
                reference={recieptNumberRef}
                name="recieptNumber"
                label="Reciept Number"
                keyboardType="number-pad"
              />
              <FormDateInput name="date" label="Date" />
              <FormDateInput name="dueDate" label="Due Date" />
            </VStack>
          </Card>

          <Card>
            <Heading>Recieption Info</Heading>
            <VStack className="gap-2 mt-3">
              <FormTextInput
                name="recipientName"
                label="Name"
                next
                nextFocus={receiptionAddressRef}
              />
              <FormTextInput
                reference={receiptionAddressRef}
                name="recipientAddress"
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

export default memo(InvoiceForm);
