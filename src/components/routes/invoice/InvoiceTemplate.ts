import { ICreateInvoiceProps } from "@/src/store/useCreateInvoice";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system";
import { useEffect, useState } from "react";
import { Platform } from "react-native";

function useBase64Logo() {
  const [base64Logo, setBase64Logo] = useState<string | null>(null);

  useEffect(() => {
    const loadLogo = async () => {
      const asset = Asset.fromModule(require("../../../../assets/icon.png"));
      await asset.downloadAsync();
      const base64 = await FileSystem.readAsStringAsync(asset.localUri!, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setBase64Logo(`data:image/png;base64,${base64}`);
    };

    loadLogo();
  }, []);

  return base64Logo;
}

export default function (data: ICreateInvoiceProps): string {
  const logo =
    Platform.OS === "web" ? "/assets/assets/icon.png" : useBase64Logo();

  const rawHtml = `
  <style>
    
  </style>

  <div style="padding:50px;">
    <!-- Header -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
      <img src="${logo}" alt="Company Logo" style="height: 60px; border-radius: 8px;" />
      <div style="text-align: right;">
        <p><strong>Invoice #: </strong>${data.recieptNumber}</p>
        <p><strong>Date: </strong>${new Date(data.date).toDateString()}</p>
        <p><strong>Due Date: </strong>${new Date(data.dueDate).toDateString()}</p>
      </div>
    </div>
  
    <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
      <!-- Sender -->
      <div style="flex: 0 0 auto;">
        <h3 style="margin-bottom: 10px; color: #444;">From</h3>
        <p><strong>${data.senderName}</strong></p>
        <p>${data.senderAddress}</p>
        ${data.taxID ? `<p><strong>Tax ID:</strong> ${data.taxID}</p>` : ""}
      </div>
      <!-- Recipient -->
      <div style="flex: 0 0 auto; text-align: right;">
        <h3 style="margin-bottom: 10px; color: #444;">To</h3>
        <p><strong>${data.recipientName}</strong></p>
        <p>${data.recipientAddress}</p>
      </div>
    </div>
  
    <!-- Invoice Items -->
    <div style="margin-bottom: 30px;">
    
      <p style="margin-bottom: 10px; font-size: 17px; font-weight: bold; color: #444;">Invoice Items</p>


      <table style="width: 100%; border-collapse: separate; border-spacing: 0; border-radius: 8px; overflow: hidden; box-shadow: 0 0 0 1px #ddd;">
        <thead style="background-color: #f3f4f6;">
          <tr>
            <th style="padding: 12px; border-bottom: 1px solid #ddd; text-align: left;">Item</th>
            <th style="padding: 12px; border-bottom: 1px solid #ddd; text-align: left;">Qty</th>
            <th style="padding: 12px; border-bottom: 1px solid #ddd; text-align: left;">Price</th>
            <th style="padding: 12px; border-bottom: 1px solid #ddd; text-align: left;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${data.items
            .map((item) => {
              return `
                <tr>
                  <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.name}</td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee;">${item.quantity}</td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee;">₹${item.price}</td>
                  <td style="padding: 12px; border-bottom: 1px solid #eee;">₹${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    </div>
  
    <!-- Totals -->
    <div style="margin-top: 30px; display: flex; justify-content: flex-end;">
      <table style="width: 300px; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px; font-weight: bold;">Subtotal</td>
          <td style="padding: 10px;">₹${data.total.toFixed(2)}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold;">Tax (18%)</td>
          <td style="padding: 10px;">₹${(data.total * 0.18).toFixed(2)}</td>
        </tr>
        <tr style="border-top: 1px solid #ccc;">
          <td style="padding: 10px; font-weight: bold;">Total</td>
          <td style="padding: 10px;"><strong>₹${(data.total * 1.18).toFixed(2)}</strong></td>
        </tr>
      </table>
    </div>
  </div>
  `;

  return rawHtml;
}
