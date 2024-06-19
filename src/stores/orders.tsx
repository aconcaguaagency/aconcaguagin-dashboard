import { create } from "zustand";

interface OrdersState {
  orders: any[];
  selectedOrder: any;
}

interface OrdersActions {
  setSelectedOrder: (order: any) => void;
  setOrders: (orders: any) => void;
}

const initialState: OrdersState = {
  orders: [],
  selectedOrder: {},
};

export const useOrdersStore = create<OrdersState & OrdersActions>((set) => ({
  ...initialState,
  setOrders: (orders) => set({ orders }),
  setSelectedOrder: (selectedOrder) => set({ selectedOrder }),
}));
