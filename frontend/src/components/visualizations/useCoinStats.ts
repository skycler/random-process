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

/**
 * Hook to calculate standard errors for coin flip proportion
 * SE = sqrt(p * (1-p) / n) where p = 0.5 for fair coin
 */
export const useCoinStandardErrors = (trials: TrialResult[]): number[] => {
  return useMemo(() => {
    return trials.map((_, index) => {
      const n = index + 1;
      // For a fair coin, p = 0.5, so SE = sqrt(0.25 / n) = 0.5 / sqrt(n)
      return 0.5 / Math.sqrt(n);
    });
  }, [trials]);
};
