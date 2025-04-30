import InvoiceTemplate from "@/src/components/routes/invoice/InvoiceTemplate";
import { ICreateInvoiceProps } from "@/src/components/store/useCreateInvoice";
import { Box } from "@/src/components/ui/box";
import {
  Button,
  ButtonGroup,
  ButtonIcon,
  ButtonText,
} from "@/src/components/ui/button";
import { Heading } from "@/src/components/ui/heading";
import { PrinterIcon, ShareIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Platform } from "react-native";
import WebView from "react-native-webview";
import * as Sharing from "expo-sharing";
import * as Print from "expo-print";

import { useRouter } from "expo-router";
import { moveAsync } from "expo-file-system";

export default function () {
  // const { data } = useCreateInvoice();
  const router = useRouter();
  const rawData: ICreateInvoiceProps = {
    recieptNumber: 121,
    date: new Date(),
    dueDate: new Date(),
    senderName: "Arman Enterprises",
    senderAddress: "Mirzawali mer, tibbi, Hanumangarh",
    recipientName: "Physics wallah",
    recipientAddress: "Delhi",
    total: 454500,
    items: [
      {
        name: "React website",
        price: 50000,
        quantity: 5,
      },
      {
        name: "Admin Dashboard",
        price: 10000,
        quantity: 4,
      },
      {
        name: "Mobile App",
        price: 70000,
        quantity: 2,
      },
      {
        name: "Online hub platform",
        price: 100000,
        quantity: 1,
      },
      {
        name: "React website",
        price: 50000,
        quantity: 5,
      },
      {
        name: "Admin Dashboard",
        price: 10000,
        quantity: 4,
      },
      {
        name: "Mobile App",
        price: 70000,
        quantity: 2,
      },
      {
        name: "Online hub platform",
        price: 100000,
        quantity: 1,
      },
      {
        name: "React website",
        price: 50000,
        quantity: 5,
      },
      {
        name: "Admin Dashboard",
        price: 10000,
        quantity: 4,
      },
      {
        name: "Mobile App",
        price: 70000,
        quantity: 2,
      },
      {
        name: "Online hub platform",
        price: 100000,
        quantity: 1,
      },
      {
        name: "React website",
        price: 50000,
        quantity: 5,
      },
      {
        name: "Admin Dashboard",
        price: 10000,
        quantity: 4,
      },
      {
        name: "Mobile App",
        price: 70000,
        quantity: 2,
      },
      {
        name: "Online hub platform",
        price: 100000,
        quantity: 1,
      },
      {
        name: "React website",
        price: 50000,
        quantity: 5,
      },
      {
        name: "Admin Dashboard",
        price: 10000,
        quantity: 4,
      },
      {
        name: "Mobile App",
        price: 70000,
        quantity: 2,
      },
      {
        name: "Online hub platform",
        price: 100000,
        quantity: 1,
      },
      {
        name: "React website",
        price: 50000,
        quantity: 5,
      },
      {
        name: "Admin Dashboard",
        price: 10000,
        quantity: 4,
      },
      {
        name: "Mobile App",
        price: 70000,
        quantity: 2,
      },
      {
        name: "Online hub platform",
        price: 100000,
        quantity: 1,
      },
      {
        name: "React website",
        price: 50000,
        quantity: 5,
      },
      {
        name: "Admin Dashboard",
        price: 10000,
        quantity: 4,
      },
      {
        name: "Mobile App",
        price: 70000,
        quantity: 2,
      },
      {
        name: "Online hub platform",
        price: 100000,
        quantity: 1,
      },
      {
        name: "React website",
        price: 50000,
        quantity: 5,
      },
      {
        name: "Admin Dashboard",
        price: 10000,
        quantity: 4,
      },
      {
        name: "Mobile App",
        price: 70000,
        quantity: 2,
      },
      {
        name: "Online hub platform",
        price: 100000,
        quantity: 1,
      },
      {
        name: "React website",
        price: 50000,
        quantity: 5,
      },
      {
        name: "Admin Dashboard",
        price: 10000,
        quantity: 4,
      },
      {
        name: "Mobile App",
        price: 70000,
        quantity: 2,
      },
      {
        name: "Online hub platform",
        price: 100000,
        quantity: 1,
      },
    ],
  };

  //
  // Sharing PDF
  const data = InvoiceTemplate(rawData);

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
    const { uri } = await Print.printToFileAsync({ html: data });
    const pdfName = "Invoice_" + rawData.recieptNumber + ".pdf";
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
        printWindow.document.write(data);
        printWindow.document.close();

        printWindow.onload = () => {
          printWindow.print();
          printWindow.close();
        };
      }
    } else {
      await Print.printAsync({ html: data });
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
            className="border rounded-md border-black overflow-y-auto p-2"
            dangerouslySetInnerHTML={{ __html: data }}
          />
        ) : (
          <WebView source={{ html: data }} />
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
