import { create } from "zustand";

interface MenuState {
  menu: any[];
  proteins: any[];
  vegetables: any[];
  sideDishes: any[];
  drinks: any[];
  extras: any[];
}

interface MenuActions {
  setMenu: (menu: any) => void;
  setProteins: (proteins: any) => void;
  setVegetables: (vegetables: any) => void;
  setSideDishes: (sideDishes: any) => void;
  setDrinks: (drinks: any) => void;
  setExtras: (extras: any) => void;
}

const initialState: MenuState = {
  menu: [],
  proteins: [],
  vegetables: [],
  sideDishes: [],
  drinks: [],
  extras: [],
};

export const useMenuStore = create<MenuState & MenuActions>((set) => ({
  ...initialState,
  setMenu: (menu) => set({ menu }),
  setProteins: (proteins) => set({ proteins }),
  setVegetables: (vegetables) => set({ vegetables }),
  setSideDishes: (sideDishes) => set({ sideDishes }),
  setDrinks: (drinks) => set({ drinks }),
  setExtras: (extras) => set({ extras }),
}));
