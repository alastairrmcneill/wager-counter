import { create } from "zustand";
import { Counter } from "../types";

interface CounterState {
  counters: Counter[];
  activeCounterId: string | null;
}

interface CounterActions {
  addCounter: (counter: Omit<Counter, "id" | "createdAt" | "updatedAt">) => void;
  updateCounter: (id: string, updates: Partial<Counter>) => void;
  deleteCounter: (id: string) => void;
  setActiveCounter: (id: string | null) => void;
  getCounter: (id: string) => Counter | undefined;
  getAllCounters: () => Counter[];
  updateStake: (id: string, stakePence: number) => void;
}

type CounterStore = CounterState & CounterActions;

export const useCounterStore = create<CounterStore>((set, get) => ({
  counters: [],
  activeCounterId: null,

  addCounter: (counterData) => {
    const now = Date.now();
    const counter: Counter = {
      ...counterData,
      id: `counter_${now}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: now,
      updatedAt: now,
    };

    set((state) => ({
      counters: [...state.counters, counter],
      activeCounterId: counter.id,
    }));
  },

  updateCounter: (id, updates) => {
    set((state) => ({
      counters: state.counters.map((counter) =>
        counter.id === id ? { ...counter, ...updates, updatedAt: Date.now() } : counter
      ),
    }));
  },

  deleteCounter: (id) => {
    set((state) => ({
      counters: state.counters.filter((counter) => counter.id !== id),
      activeCounterId: state.activeCounterId === id ? null : state.activeCounterId,
    }));
  },

  setActiveCounter: (id) => {
    set({ activeCounterId: id });
  },

  getCounter: (id) => {
    return get().counters.find((counter) => counter.id === id);
  },

  getAllCounters: () => {
    return get().counters;
  },

  updateStake: (id, stakePence) => {
    set((state) => ({
      counters: state.counters.map((counter) =>
        counter.id === id ? { ...counter, currentStakePence: stakePence, updatedAt: Date.now() } : counter
      ),
    }));
  },
}));
