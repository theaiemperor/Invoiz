import { create } from "zustand";

export interface ISettingProps {
  interface: "dark" | "light" | "system";
}

export interface ISettingStore {
  settings: ISettingProps;
  resetSettings: () => void;
  updateSettings: (newSettings: Partial<ISettingProps>) => void;
}

const defaultSettings: ISettingProps = {
  interface: "system",
};

export default create<ISettingStore>((set) => ({
  settings: defaultSettings,
  resetSettings: () => {
    set((state) => ({
      ...state,
      settings: defaultSettings,
    }));
  },
  updateSettings: (newSettings: Partial<ISettingProps>) => {
    set((state) => ({
      ...state,
      settings: { ...state.settings, ...newSettings },
    }));
  },
}));
