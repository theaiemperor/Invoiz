import InvoiceTemplate from "@/src/components/routes/invoice/InvoiceTemplate";
import { Box } from "@/src/components/ui/box";
import {
  Button,
  ButtonGroup,
  ButtonIcon,
  ButtonText,
} from "@/src/components/ui/button";
import { Heading } from "@/src/components/ui/heading";
import useCreateInvoice from "@/src/store/useCreateInvoice";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import { PrinterIcon, ShareIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import WebView from "react-native-webview";

import { moveAsync } from "expo-file-system";
import { useRouter } from "expo-router";

export default function () {
  const { data } = useCreateInvoice();
  const router = useRouter();
  const parsedData = data && InvoiceTemplate(data);

  const [canShare, setCanShare] = useState(false);

  async function checkSharing() {
    if (await Sharing.isAvailableAsync()) {
      setCanShare(true);
    }
  }

  function getPdfDirectory(uri: string): string | null {
    try {
      const lastSlashIndex = uri.lastIndexOf("/");
      if (lastSlashIndex === -1) return null;
      return uri.substring(0, lastSlashIndex);
    } catch (e) {
      return null;
    }
  }

  async function sharePDF() {
    const { uri } = await Print.printToFileAsync({ html: parsedData || "" });
    const pdfName = "Invoice_" + data?.recieptNumber + ".pdf";
    const newName = getPdfDirectory(uri) + "/" + pdfName;
    await moveAsync({ from: uri, to: newName });

    await Sharing.shareAsync(newName, {
      UTI: ".pdf",
      mimeType: "application/pdf",
    });
  }

  //
  // Printing PDF

  async function printPDF() {
    if (Platform.OS === "web") {
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.open();
        printWindow.document.write(parsedData || "");
        printWindow.document.close();

        printWindow.onload = () => {
          printWindow.print();
          printWindow.close();
        };
      }
    } else {
      await Print.printAsync({ html: parsedData || "" });
    }
  }
  useEffect(() => {
    checkSharing();

    if (typeof window !== "undefined" && data === null) {
      setTimeout(() => {
        router.replace("/create");
      }, 0);
    }
  }, [canShare, data]);

  if (data !== null) {
    return (
      <Box className="flex-1 gap-5 p-2">
        {Platform.OS === "web" && (
          <Heading className="text-center">Preview your Invoice</Heading>
        )}
        {Platform.OS === "web" ? (
          <div
            className="border rounded-md border-background-300 text-black bg-white overflow-y-auto p-2"
            dangerouslySetInnerHTML={{ __html: parsedData || "" }}
          />
        ) : (
          <WebView source={{ html: parsedData || "" }} />
        )}

        <ButtonGroup
          flexDirection="row"
          className="w-full max-w-sm  self-center"
        >
          <Button className="flex-1 " onPress={printPDF}>
            <ButtonText>Print</ButtonText>
            <ButtonIcon as={PrinterIcon} />
          </Button>

          <Button
            isDisabled={!canShare || Platform.OS === "web"}
            className="flex-1"
            onPress={sharePDF}
          >
            <ButtonText>Share</ButtonText>
            <ButtonIcon as={ShareIcon} />
          </Button>
        </ButtonGroup>
      </Box>
    );
  }
}
