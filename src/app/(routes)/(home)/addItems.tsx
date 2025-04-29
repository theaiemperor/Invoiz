import InvoiceItemCard from "@/src/components/routes/invoice/InvoiceItemCard";
import InvoiceItemsForm from "@/src/components/routes/invoice/InvoiceItemsForm";
import { Box } from "@/src/components/ui/box";
import { Heading } from "@/src/components/ui/heading";
import { ScrollView } from "react-native";

export default function () {
  return (
    <Box className="w-full p-2 items-center md:items-start">
      <Box className="w-full h-full max-w-md gap-2 md:max-w-full md:flex md:flex-row ">
        <Box>
          <Heading className="text-center mb-2">Add New Item</Heading>
          <InvoiceItemsForm />
        </Box>
        <Box className="flex-1">
          <Heading className="text-center">Your items</Heading>
          <ScrollView className="gap-3  px-2 ">
            <InvoiceItemCard />
          </ScrollView>
        </Box>
      </Box>
    </Box>
  );
}
