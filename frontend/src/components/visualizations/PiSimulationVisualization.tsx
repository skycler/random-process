import React from 'react';
import { Scatter, Line } from 'react-chartjs-2';
import { TrialResult } from '../../processes';
import { usePiSimulationConfig } from './usePiSimulationConfig';
import { usePiScatterData } from './usePiStats';

interface PiSimulationVisualizationProps {
  trials: TrialResult[];
}

/**
 * Visualization component for π Monte Carlo simulation
 * Displays scatter plot of points and convergence to π
 */
export const PiSimulationVisualization: React.FC<PiSimulationVisualizationProps> = ({ trials }) => {
  const config = usePiSimulationConfig(trials);
  const { insidePoints, outsidePoints } = usePiScatterData(trials);

  // Scatter plot data
  const scatterData = {
    datasets: [
      {
        label: 'Inside Circle',
        data: insidePoints,
        backgroundColor: 'rgba(0, 201, 255, 0.6)',
        borderColor: '#00b4e6',
        pointRadius: 3,
        pointHoverRadius: 5,
      },
      {
        label: 'Outside Circle',
        data: outsidePoints,
        backgroundColor: 'rgba(245, 87, 108, 0.6)',
        borderColor: '#e04558',
        pointRadius: 3,
        pointHoverRadius: 5,
      },
    ],
  };

  const scatterOptions = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1, // Square chart
    scales: {
      x: {
        min: 0,
        max: 1,
        title: { display: true, text: 'x' },
      },
      y: {
        min: 0,
        max: 1,
        title: { display: true, text: 'y' },
      },
    },
    plugins: {
      legend: { position: 'top' as const },
      title: { 
        display: true, 
        text: 'Quarter Circle (x² + y² ≤ 1)' 
      },
    },
  };

  return (
    <>
      {/* Stats section */}
      <div className={`stats-summary ${config.statsClassName || ''}`.trim()}>
        {config.stats.map((stat, index) => (
          <div 
            key={index} 
            className="stat-card"
            style={stat.style}
          >
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* Info section */}
      {config.infoSection && (
        <div className={config.infoSection.className || 'info-section'}>
          {config.infoSection.content}
        </div>
      )}

      {/* Two charts: Scatter plot and Convergence */}
      <div className="charts-container pi-charts">
        <div className="chart-wrapper scatter-chart">
          <Scatter data={scatterData} options={scatterOptions} />
        </div>
        {config.showConvergence && config.convergence && (
          <div className="chart-wrapper">
            <Line data={config.convergence.data} options={config.convergence.options} />
          </div>
        )}
      </div>
    </>
  );
};
