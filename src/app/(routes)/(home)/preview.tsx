import InvoiceTemplate from "@/src/components/routes/invoice/InvoiceTemplate";
import useCreateInvoice from "@/src/components/store/useCreateInvoice";
import { Box } from "@/src/components/ui/box";
import { Heading } from "@/src/components/ui/heading";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import WebView from "react-native-webview";

export default function () {
  const { data } = useCreateInvoice();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && data === null) {
      setTimeout(() => {
        router.replace("/create");
      }, 0);
    }
  }, [data]);

  if (data !== null) {
    return (
      <Box className="flex-1 gap-5 p-2">
        {Platform.OS === "web" && (
          <Heading className="text-center">Preview your Invoice</Heading>
        )}
        {Platform.OS === "web" ? (
          <div
            className="border rounded-md border-black overflow-y-auto p-2"
            dangerouslySetInnerHTML={{ __html: InvoiceTemplate(data) }}
          />
        ) : (
          <WebView source={{ html: InvoiceTemplate(data) }} />
        )}
      </Box>
    );
  }
}
