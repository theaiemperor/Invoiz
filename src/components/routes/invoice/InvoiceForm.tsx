import { useForm } from "react-hook-form";
import FormInput from "../../global/FormInput";
import { Button, ButtonText } from "../../ui/button";
import { Card } from "../../ui/card";
import { Heading } from "../../ui/heading";
import { VStack } from "../../ui/vstack";

export default function InvoiceForm() {
  const defaultValues = {
    Title: "",
    Address: "",
    "Tax ID": "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  function onSubmit(data: typeof defaultValues) {
    console.log(data);
  }

  return (
    <Card className="w-96">
      <VStack className="gap-5">
        <Heading className="text-center">New Invoice</Heading>
        <FormInput
          control={control}
          validation={{ required: true }}
          name="Title"
          errors={errors.Title}
        />
        <FormInput
          control={control}
          validation={{ required: true }}
          name="Address"
          errors={errors.Address}
        />
        <FormInput
          control={control}
          validation={{ required: true }}
          name="Tax ID"
          errors={errors["Tax ID"]}
        />
        <Button onPress={handleSubmit(onSubmit)}>
          <ButtonText>Submit</ButtonText>
        </Button>
      </VStack>
    </Card>
  );
}
