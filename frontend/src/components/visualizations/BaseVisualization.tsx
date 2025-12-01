import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { VisualizationConfig } from './types';

interface BaseVisualizationProps {
  config: VisualizationConfig;
}

/**
 * Base visualization component that renders any process visualization
 * based on the provided configuration.
 * 
 * This abstraction allows all visualizations to share the same structure
 * while customizing their stats, charts, and optional info sections.
 */
export const BaseVisualization: React.FC<BaseVisualizationProps> = ({ config }) => {
  const {
    stats,
    statsClassName = '',
    histogram,
    convergence,
    showConvergence,
    infoSection,
  } = config;

  return (
    <>
      {/* Stats Summary Section */}
      <div className={`stats-summary ${statsClassName}`.trim()}>
        {stats.map((stat, index) => (
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

      {/* Optional Info Section */}
      {infoSection && (
        <div className={infoSection.className || 'info-section'}>
          {infoSection.content}
        </div>
      )}

      {/* Charts Container */}
      <div className="charts-container">
        <div className={`chart-wrapper ${histogram.className || ''}`.trim()}>
          <Bar data={histogram.data} options={histogram.options} />
        </div>
        {showConvergence && convergence && (
          <div className="chart-wrapper">
            <Line data={convergence.data} options={convergence.options} />
          </div>
        )}
      </div>
    </>
  );
};
