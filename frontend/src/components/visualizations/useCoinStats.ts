import { useMemo } from 'react';
import { TrialResult } from '../../processes';

/**
 * Stats for coin flip process
 */
export interface CoinStats {
  heads: number;
  tails: number;
  total: number;
  headsPercentage: string;
  tailsPercentage: string;
}

/**
 * Hook to calculate coin flip statistics
 */
export const useCoinStats = (trials: TrialResult[]): CoinStats => {
  return useMemo(() => {
    const heads = trials.filter((t) => t.result === 'heads').length;
    const tails = trials.filter((t) => t.result === 'tails').length;
    const total = trials.length;
    const headsPercentage = total > 0 ? ((heads / total) * 100).toFixed(1) : '0';
    const tailsPercentage = total > 0 ? ((tails / total) * 100).toFixed(1) : '0';
    return { heads, tails, total, headsPercentage, tailsPercentage };
  }, [trials]);
};

/**
 * Hook to calculate cumulative proportion of heads
 */
export const useCoinConvergence = (trials: TrialResult[]): number[] => {
  return useMemo(() => {
    let headsCount = 0;
    return trials.map((trial, index) => {
      if (trial.result === 'heads') headsCount++;
      return headsCount / (index + 1);
    });
  }, [trials]);
};
