// Base interface for all random processes
export interface ProcessConfig {
  id: string;
  name: string;
  description: string;
}

export interface TrialResult {
  id: number;
  processId: string;
  result: string | number;
  timestamp: number;
}

// Abstract interface for random processes
export interface RandomProcess<T extends string | number = string | number> {
  config: ProcessConfig;
  runTrial(): T;
  getOutcomes(): T[];
  getExpectedValue(): number;
  getColors(): string[];
  getBorderColors(): string[];
  formatResult(result: T): string;
}
