import { useMemo } from 'react';
import { TrialResult } from '../../processes';
import { PiSimulationProcess } from '../../processes/PiSimulationProcess';

interface PiStats {
  total: number;
  inside: number;
  outside: number;
  piEstimate: string;
  error: string;
  insidePercentage: string;
}

/**
 * Hook to calculate π simulation statistics
 */
export const usePiStats = (trials: TrialResult[]): PiStats => {
  return useMemo(() => {
    const total = trials.length;
    
    if (total === 0) {
      return {
        total: 0,
        inside: 0,
        outside: 0,
        piEstimate: '0.0000',
        error: '0.0000',
        insidePercentage: '0',
      };
    }

    const results = trials.map(t => t.result as { x: number; y: number; inside: boolean });
    const inside = results.filter(r => r.inside).length;
    const outside = total - inside;
    const piEstimate = PiSimulationProcess.estimatePi(results);
    const error = Math.abs(piEstimate - Math.PI);

    return {
      total,
      inside,
      outside,
      piEstimate: piEstimate.toFixed(4),
      error: error.toFixed(4),
      insidePercentage: ((inside / total) * 100).toFixed(1),
    };
  }, [trials]);
};

/**
 * Hook to get convergence data for π estimation
 */
export const usePiConvergence = (trials: TrialResult[]): number[] => {
  return useMemo(() => {
    let insideCount = 0;
    return trials.map((trial, index) => {
      const result = trial.result as { inside: boolean };
      if (result.inside) insideCount++;
      return 4 * (insideCount / (index + 1));
    });
  }, [trials]);
};

/**
 * Hook to get scatter plot data (points inside and outside)
 */
export const usePiScatterData = (trials: TrialResult[]) => {
  return useMemo(() => {
    const insidePoints: { x: number; y: number }[] = [];
    const outsidePoints: { x: number; y: number }[] = [];

    trials.forEach(trial => {
      const result = trial.result as { x: number; y: number; inside: boolean };
      if (result.inside) {
        insidePoints.push({ x: result.x, y: result.y });
      } else {
        outsidePoints.push({ x: result.x, y: result.y });
      }
    });

    return { insidePoints, outsidePoints };
  }, [trials]);
};
