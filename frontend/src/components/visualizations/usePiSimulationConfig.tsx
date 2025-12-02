import React, { useMemo } from 'react';
import { TrialResult } from '../../processes';
import { VisualizationConfig } from './types';
import { usePiStats, usePiConvergence, usePiStandardErrors } from './usePiStats';
import { createConvergenceDatasets } from './chartUtils';

/**
 * Hook that generates the complete visualization config for π simulation
 */
export const usePiSimulationConfig = (trials: TrialResult[]): VisualizationConfig => {
  const stats = usePiStats(trials);
  const convergenceData = usePiConvergence(trials);
  const standardErrors = usePiStandardErrors(trials);

  return useMemo(() => ({
    stats: [
      { value: stats.total, label: 'Total Points' },
      { 
        value: stats.inside, 
        label: `Inside (${stats.insidePercentage}%)`,
        style: {
          background: 'linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%)',
          boxShadow: '0 4px 15px rgba(0, 201, 255, 0.3)',
        },
      },
      { 
        value: stats.outside, 
        label: 'Outside',
        style: {
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          boxShadow: '0 4px 15px rgba(245, 87, 108, 0.3)',
        },
      },
      { 
        value: stats.piEstimate, 
        label: `π Estimate (error: ${stats.error})`,
        style: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
        },
      },
    ],
    statsClassName: 'pi-stats',
    histogram: {
      data: {
        labels: ['Inside Circle', 'Outside Circle'],
        datasets: [{
          label: 'Count',
          data: [stats.inside, stats.outside],
          backgroundColor: ['#00c9ff', '#f5576c'],
          borderColor: ['#00b4e6', '#e04558'],
          borderWidth: 2,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Point Distribution' },
        },
        scales: {
          y: {
            title: { display: true, text: 'Count' },
          },
        },
      },
    },
    convergence: {
      data: {
        datasets: createConvergenceDatasets(
          convergenceData,
          Math.PI,
          'π Estimate',
          `Actual π (${Math.PI.toFixed(4)})`,
          '#8b5cf6',
          standardErrors
        ),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            min: 2.5,
            max: 4,
            title: { display: true, text: 'π Estimate' },
          },
          x: {
            type: 'logarithmic' as const,
            title: { display: true, text: 'Number of Points (log scale)' },
            min: 1,
            ticks: {
              callback: function(value) {
                const v = Number(value);
                if ([1, 10, 100, 1000, 10000].includes(v)) {
                  return v.toString();
                }
                return '';
              },
            },
          },
        },
        plugins: {
          legend: { position: 'top' as const },
          title: { display: true, text: 'Convergence to π' },
        },
      },
    },
    showConvergence: stats.total > 0,
    infoSection: {
      className: 'pi-info',
      content: (
        <p>
          <strong>Monte Carlo Method:</strong> Random points are generated in a unit square. 
          The ratio of points inside the quarter circle to total points approximates <em>π/4</em>. 
          With more points, the estimate converges to the true value of π ≈ 3.14159.
        </p>
      ),
    },
  }), [stats, convergenceData, standardErrors, trials]);
};
