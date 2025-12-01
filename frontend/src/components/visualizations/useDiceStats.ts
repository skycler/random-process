import { useMemo } from 'react';
import { TrialResult } from '../../processes';

/**
 * Stats for dice roll process
 */
export interface DiceStats {
  counts: number[];
  total: number;
  percentages: string[];
}

/**
 * Hook to calculate dice roll statistics
 */
export const useDiceStats = (trials: TrialResult[]): DiceStats => {
  return useMemo(() => {
    const counts = [0, 0, 0, 0, 0, 0];
    trials.forEach((t) => {
      const value = t.result as number;
      counts[value - 1]++;
    });
    const total = trials.length;
    const percentages = counts.map((c) => (total > 0 ? ((c / total) * 100).toFixed(1) : '0'));
    return { counts, total, percentages };
  }, [trials]);
};

/**
 * Hook to calculate cumulative average for dice rolls
 */
export const useDiceConvergence = (trials: TrialResult[]): number[] => {
  return useMemo(() => {
    let sum = 0;
    return trials.map((trial, index) => {
      sum += trial.result as number;
      return sum / (index + 1);
    });
  }, [trials]);
};
