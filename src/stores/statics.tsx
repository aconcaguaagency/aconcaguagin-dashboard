import { create } from "zustand";

interface StaticsState {
  lastOrder: any;
  actualData: any;
}

interface StaticsActions {
  setLastOrder: (lastOrder: any) => void;
  setActualData: (actualData: any) => void;
}

const initialState: StaticsState = {
  lastOrder: 0,
  actualData: 0,
};

export const useStaticsStore = create<StaticsState & StaticsActions>((set) => ({
  ...initialState,
  setLastOrder: (lastOrder) => set({ lastOrder }),
  setActualData: (actualData) => set({ actualData }),
}));
