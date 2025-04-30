import { create } from "zustand";

export interface IInvoiceItem {
  name: string;
  quantity: number;
  price: number;
}

export interface ICreateInvoiceProps {
  recieptNumber: number;
  date: Date;
  dueDate: Date;
  recipientName: string;
  recipientAddress: string;
  senderName: string;
  senderAddress: string;
  taxID?: string;
  items: IInvoiceItem[];
}

export interface ICreateInvoiceStore {
  data: ICreateInvoiceProps | null;
  addItem: (product: IInvoiceItem) => void;
  clearData: () => void;
  addInfo: (data: ICreateInvoiceProps) => void;
}

export default create<ICreateInvoiceStore>((set) => ({
  data: null,
  clearData: () => {
    set((state) => ({ ...state, data: null }));
  },
  addItem: (itemData: IInvoiceItem) => {
    set((state) => {
      if (state.data) {
        return {
          ...state,
          data: {
            ...state.data,
            items: [itemData, ...(state.data?.items || [])],
          },
        };
      }
      throw Error("Invoice Not found");
    });
  },

  addInfo: (data: ICreateInvoiceProps) => {
    set((state) => ({
      ...state,
      data: {
        ...(state.data || {}),
        ...data,
      },
    }));
  },
}));
