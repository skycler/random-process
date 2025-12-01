import { useMemo } from 'react';
import { TrialResult } from '../../processes';

/**
 * Stats for sum of dice process
 */
export interface SumDiceStats {
  counts: number[];
  total: number;
  minSum: number;
  maxSum: number;
  average: string;
  expectedValue: string;
  stdDev: string;
  expectedStdDev: string;
}

/**
 * Hook to calculate sum of dice statistics
 */
export const useSumDiceStats = (trials: TrialResult[], numberOfDice: number): SumDiceStats => {
  return useMemo(() => {
    const minSum = numberOfDice;
    const maxSum = numberOfDice * 6;
    const counts: number[] = new Array(maxSum - minSum + 1).fill(0);
    
    trials.forEach((t) => {
      const value = t.result as number;
      counts[value - minSum]++;
    });
    
    const total = trials.length;
    let sum = 0;
    trials.forEach((t) => {
      sum += t.result as number;
    });
    const average = total > 0 ? sum / total : 0;
    const expectedValue = numberOfDice * 3.5;
    
    // Calculate standard deviation
    let variance = 0;
    trials.forEach((t) => {
      variance += Math.pow((t.result as number) - average, 2);
    });
    const stdDev = total > 1 ? Math.sqrt(variance / (total - 1)) : 0;
    const expectedStdDev = Math.sqrt((numberOfDice * 35) / 12);
    
    return { 
      counts, 
      total, 
      minSum, 
      maxSum, 
      average: average.toFixed(2),
      expectedValue: expectedValue.toFixed(1),
      stdDev: stdDev.toFixed(2),
      expectedStdDev: expectedStdDev.toFixed(2),
    };
  }, [trials, numberOfDice]);
};

/**
 * Hook to calculate cumulative average for sum of dice
 */
export const useSumDiceConvergence = (trials: TrialResult[]): number[] => {
  return useMemo(() => {
    let sum = 0;
    return trials.map((trial, index) => {
      sum += trial.result as number;
      return sum / (index + 1);
    });
  }, [trials]);
};
