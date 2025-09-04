import { create } from "zustand";
import { Spin } from "../types";

interface SpinState {
  spins: Spin[];
}

interface SpinActions {
  addSpin: (spin: Omit<Spin, "id">) => void;
  removeSpin: (id: string) => void;
  getSpinsForCounter: (counterId: string) => Spin[];
  getLastSpinForCounter: (counterId: string) => Spin | undefined;
  getAllSpins: () => Spin[];
  clearSpinsForCounter: (counterId: string) => void;
  getSpinsPaginated: (
    counterId: string,
    page: number,
    pageSize: number
  ) => {
    spins: Spin[];
    total: number;
  };
}

type SpinStore = SpinState & SpinActions;

export const useSpinStore = create<SpinStore>((set, get) => ({
  // State
  spins: [],

  // Actions
  addSpin: (spinData) => {
    const spin: Spin = {
      ...spinData,
      id: `spin_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };

    set((state) => ({
      spins: [...state.spins, spin],
    }));
  },

  removeSpin: (id) => {
    set((state) => ({
      spins: state.spins.filter((spin) => spin.id !== id),
    }));
  },

  getSpinsForCounter: (counterId) => {
    return get()
      .spins.filter((spin) => spin.counterId === counterId)
      .sort((a, b) => b.timestamp - a.timestamp); // Most recent first
  },

  getLastSpinForCounter: (counterId) => {
    const spins = get().getSpinsForCounter(counterId);
    return spins[0]; // Most recent
  },

  getAllSpins: () => {
    return get().spins;
  },

  clearSpinsForCounter: (counterId) => {
    set((state) => ({
      spins: state.spins.filter((spin) => spin.counterId !== counterId),
    }));
  },

  getSpinsPaginated: (counterId, page, pageSize) => {
    const allSpins = get().getSpinsForCounter(counterId);
    const total = allSpins.length;
    const startIndex = page * pageSize;
    const endIndex = startIndex + pageSize;
    const spins = allSpins.slice(startIndex, endIndex);

    return { spins, total };
  },
}));
