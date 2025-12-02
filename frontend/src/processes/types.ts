// Base interface for all random processes
export interface ProcessConfig {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TrialResultValue = string | number | Record<string, any>;

export interface TrialResult {
  id: number;
  processId: string;
  result: TrialResultValue;
  timestamp: number;
}

// Abstract interface for random processes
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface RandomProcess<T = any> {
  config: ProcessConfig;
  runTrial(): T;
}
