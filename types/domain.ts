export interface Counter {
  id: string;
  name: string;
  targetPence: number;
  wageredPence: number;
  currentStakePence: number;
  createdAt: number; // timestamp
  updatedAt: number; // timestamp
}

export interface Spin {
  id: string;
  counterId: string;
  stakePence: number;
  timestamp: number;
}

export interface Session {
  counterId: string;
  startTime: number;
  lastActivityTime: number;
}
