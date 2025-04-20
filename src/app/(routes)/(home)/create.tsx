import InvoiceForm from "@/src/components/routes/invoice/InvoiceForm";
import { HStack } from "@/src/components/ui/hstack";

export default function () {
  return (
    <HStack className="p-2 w-full justify-center">
      <InvoiceForm />
    </HStack>
  );
}
