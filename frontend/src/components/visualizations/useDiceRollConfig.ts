import { useMemo } from 'react';
import { TrialResult } from '../../processes';
import { VisualizationConfig } from './types';
import { useDiceStats, useDiceConvergence } from './useDiceStats';
import { 
  createHistogramOptions, 
  createConvergenceDatasets, 
  createConvergenceOptions,
  DICE_COLORS,
  DICE_BORDER_COLORS,
} from './chartUtils';

/**
 * Hook that generates the complete visualization config for dice roll process
 */
export const useDiceRollConfig = (trials: TrialResult[]): VisualizationConfig => {
  const stats = useDiceStats(trials);
  const convergenceData = useDiceConvergence(trials);

  return useMemo(() => ({
    stats: [
      // Individual dice face counts with custom styling
      ...stats.counts.map((count, index) => ({
        value: count,
        label: `⚀ ${index + 1} (${stats.percentages[index]}%)`,
        style: {
          background: DICE_COLORS[index],
          boxShadow: `0 4px 15px ${DICE_COLORS[index]}40`,
        },
      })),
      // Total rolls
      { value: stats.total, label: 'Total Rolls' },
    ],
    statsClassName: 'dice-stats',
    histogram: {
      data: {
        labels: ['1', '2', '3', '4', '5', '6'],
        datasets: [{
          label: 'Count',
          data: stats.counts,
          backgroundColor: DICE_COLORS,
          borderColor: DICE_BORDER_COLORS,
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
          3.5,
          'Average Roll',
          'Expected (3.5)'
        ),
      },
      options: createConvergenceOptions(
        'Convergence to Expected Average',
        'Average Value',
        1,
        6
      ),
    },
    showConvergence: stats.total > 0,
  }), [stats, convergenceData, trials]);
};
