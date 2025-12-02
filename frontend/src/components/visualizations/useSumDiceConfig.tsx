import React, { useMemo } from 'react';
import { TrialResult } from '../../processes';
import { VisualizationConfig } from './types';
import { useSumDiceStats, useSumDiceConvergence, useSumDiceStandardErrors } from './useSumDiceStats';
import { 
  createConvergenceDatasets, 
  createConvergenceOptions,
  generateGradientColors,
} from './chartUtils';

/**
 * Hook that generates the complete visualization config for sum dice process
 */
export const useSumDiceConfig = (
  trials: TrialResult[], 
  numberOfDice: number
): VisualizationConfig => {
  const stats = useSumDiceStats(trials, numberOfDice);
  const convergenceData = useSumDiceConvergence(trials);
  const standardErrors = useSumDiceStandardErrors(trials, numberOfDice);

  return useMemo(() => {
    // Generate labels for sum values
    const labels: string[] = [];
    for (let i = stats.minSum; i <= stats.maxSum; i++) {
      labels.push(i.toString());
    }

    // Generate gradient colors for the histogram
    const { colors, borderColors } = generateGradientColors(
      stats.counts.length,
      200,  // hueStart (blue-ish)
      120,  // hueRange (to green-ish)
      70,   // saturation
      60    // lightness
    );

    return {
      stats: [
        { value: stats.total, label: 'Total Rolls' },
        { value: stats.average, label: `Avg Sum (exp: ${stats.expectedValue})` },
        { value: stats.stdDev, label: `Std Dev (exp: ${stats.expectedStdDev})` },
        { 
          value: `🎲 ${numberOfDice}`, 
          label: `Range: ${stats.minSum} - ${stats.maxSum}` 
        },
      ],
      statsClassName: 'sum-dice-stats',
      histogram: {
        data: {
          labels,
          datasets: [{
            label: 'Count',
            data: stats.counts,
            backgroundColor: colors,
            borderColor: borderColors,
            borderWidth: 1,
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            title: { 
              display: true, 
              text: `Distribution of Sums (${numberOfDice} dice) - Approaches Normal Distribution` 
            },
          },
          scales: {
            x: { title: { display: true, text: 'Sum Value' } },
            y: { title: { display: true, text: 'Frequency' } },
          },
        },
        className: 'chart-large',
      },
      convergence: {
        data: {
          datasets: createConvergenceDatasets(
            convergenceData,
            numberOfDice * 3.5,
            'Average Sum',
            `Expected (${(numberOfDice * 3.5).toFixed(1)})`,
            '#8b5cf6',
            standardErrors
          ),
        },
        options: createConvergenceOptions(
          'Convergence to Expected Average',
          'Average Sum',
          numberOfDice,
          numberOfDice * 6
        ),
      },
      showConvergence: stats.total > 0,
      infoSection: {
        className: 'clt-info',
        content: (
          <p>
            <strong>Central Limit Theorem:</strong> As you add more trials, the histogram approaches a 
            <em> normal (bell curve) distribution</em>. Try increasing the number of dice to see a smoother curve!
          </p>
        ),
      },
    };
  }, [stats, convergenceData, standardErrors, numberOfDice]);
};
