import { create } from "zustand";
import { Session } from "../types";
import { useSpinStore } from "./spinStore";

interface SessionState {
  sessions: Session[];
}

interface SessionActions {
  startSession: (counterId: string) => void;
  updateSessionActivity: (counterId: string) => void;
  endSession: (counterId: string) => void;
  getActiveSession: (counterId: string) => Session | undefined;
  getSessionDuration: (counterId: string) => number; // in milliseconds
  getSessionStats: (counterId: string) => {
    elapsedMs: number;
    avgSpinsPerMin: number;
  };
}

type SessionStore = SessionState & SessionActions;

export const useSessionStore = create<SessionStore>((set, get) => ({
  // State
  sessions: [],

  // Actions
  startSession: (counterId) => {
    const now = Date.now();
    const session: Session = {
      counterId,
      startTime: now,
      lastActivityTime: now,
    };

    set((state) => ({
      sessions: [
        ...state.sessions.filter((s) => s.counterId !== counterId), // Remove existing session for this counter
        session,
      ],
    }));
  },

  updateSessionActivity: (counterId) => {
    const now = Date.now();
    set((state) => ({
      sessions: state.sessions.map((session) =>
        session.counterId === counterId ? { ...session, lastActivityTime: now } : session
      ),
    }));
  },

  endSession: (counterId) => {
    set((state) => ({
      sessions: state.sessions.filter((session) => session.counterId !== counterId),
    }));
  },

  getActiveSession: (counterId) => {
    return get().sessions.find((session) => session.counterId === counterId);
  },

  getSessionDuration: (counterId) => {
    const session = get().getActiveSession(counterId);
    if (!session) return 0;
    return Date.now() - session.startTime;
  },

  getSessionStats: (counterId) => {
    const session = get().getActiveSession(counterId);
    if (!session) {
      return { elapsedMs: 0, avgSpinsPerMin: 0 };
    }

    const elapsedMs = Date.now() - session.startTime;
    const elapsedMin = elapsedMs / (1000 * 60);

    // Get spin count from spin store
    const spins = useSpinStore.getState().spins;
    const sessionSpins = spins.filter((spin) => spin.counterId === counterId && spin.timestamp >= session.startTime);

    const avgSpinsPerMin = elapsedMin > 0 ? sessionSpins.length / elapsedMin : 0;

    return { elapsedMs, avgSpinsPerMin };
  },
}));
