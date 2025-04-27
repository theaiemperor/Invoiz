import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import FormInput from "../../global/FormInput";
import { Button, ButtonText } from "../../ui/button";
import { Card } from "../../ui/card";
import { Heading } from "../../ui/heading";
import { VStack } from "../../ui/vstack";

export default function InvoiceForm() {
  const senderInfoSchema = z.object({
    name: z
      .string({ required_error: "Name is Required" })
      .min(3, { message: "Minimum length will be 3." }),
    address: z
      .string({ required_error: "Address is Required." })
      .min(3, { message: "Minimum length will be 3." }),
    taxID: z.string().optional(),
  });

  type SenderInfo = z.infer<typeof senderInfoSchema>;

  const form = useForm<SenderInfo>({
    resolver: zodResolver(senderInfoSchema),
  });

  function onSubmit(data: any) {
    console.log(data);
  }

  return (
    <Card className="w-96">
      <VStack className="gap-5">
        <FormProvider {...form}>
          <Heading className="text-center">New Invoice</Heading>

          <FormInput name="name" label="Name" />
          <FormInput
            name="address"
            label="Address"
            multiline
            containerClassName="h-20 pt-2"
          />
          <FormInput name="taxID" label="Tax ID" />
        </FormProvider>

        <Button onPress={form.handleSubmit(onSubmit)}>
          <ButtonText>Submit</ButtonText>
        </Button>
      </VStack>
    </Card>
  );
}
