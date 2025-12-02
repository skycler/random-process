import { useMemo } from 'react';
import { TrialResult } from '../../processes';
import { VisualizationConfig } from './types';
import { useCoinStats, useCoinConvergence } from './useCoinStats';
import { createHistogramOptions, createConvergenceDatasets, createConvergenceOptions } from './chartUtils';

/**
 * Hook that generates the complete visualization config for coin flip process
 */
export const useCoinFlipConfig = (trials: TrialResult[]): VisualizationConfig => {
  const stats = useCoinStats(trials);
  const convergenceData = useCoinConvergence(trials);

  return useMemo(() => ({
    stats: [
      { value: stats.heads, label: `Heads (${stats.headsPercentage}%)` },
      { value: stats.tails, label: `Tails (${stats.tailsPercentage}%)` },
      { value: stats.total, label: 'Total Trials' },
    ],
    histogram: {
      data: {
        labels: ['Heads', 'Tails'],
        datasets: [{
          label: 'Count',
          data: [stats.heads, stats.tails],
          backgroundColor: ['#00c9ff', '#f5576c'],
          borderColor: ['#00b4e6', '#e04558'],
          borderWidth: 2,
        }],
      },
      options: createHistogramOptions('Distribution of Outcomes'),
    },
    convergence: {
      data: {
        labels: trials.map((_, i) => i + 1),
        datasets: createConvergenceDatasets(
          convergenceData,
          0.5,
          'Proportion of Heads',
          'Expected (0.5)'
        ),
      },
      options: createConvergenceOptions(
        'Convergence to Expected Probability',
        'Proportion',
        0,
        1
      ),
    },
    showConvergence: stats.total > 0,
    infoSection: {
      className: 'coin-info',
      content: (
        <p>
          <strong>Law of Large Numbers:</strong> Each flip has a 50% chance of heads or tails. 
          As you run more trials, the observed proportion <em>converges to 0.5</em>—demonstrating 
          how randomness averages out over time.
        </p>
      ),
    },
  }), [stats, convergenceData, trials]);
};
