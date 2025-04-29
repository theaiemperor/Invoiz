import KeyboardAwareView from "@/src/components/global/KeyboardAwareView";
import InvoiceForm from "@/src/components/routes/invoice/InvoiceForm";

export default function () {
  return (
    <KeyboardAwareView centerContent>
      <InvoiceForm />
    </KeyboardAwareView>
  );
}
