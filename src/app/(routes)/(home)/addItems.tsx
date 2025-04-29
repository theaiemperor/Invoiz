import InvoiceItemsForm from "@/src/components/routes/invoice/InvoiceItemsForm";
import { Box } from "@/src/components/ui/box";

export default function () {
  return (
    <Box className="w-full items-center p-2">
      <Box className="w-full max-w-md ">
        <InvoiceItemsForm />
      </Box>
    </Box>
  );
}
