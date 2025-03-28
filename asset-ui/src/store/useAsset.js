import { create } from "zustand";

export const useAsset = create((set) => ({
  asset: {
    id: 0,
    is_delete: false,
    last_updated: "",
    location: 0,
    name: "",
    quantity: "",
    status: "",
  },
  setAsset: (newAsset) => set(() => ({ asset: newAsset })),
}));
