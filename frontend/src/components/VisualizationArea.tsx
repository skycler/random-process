import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import { Trial } from '../App';
import './VisualizationArea.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface VisualizationAreaProps {
  trials: Trial[];
}

const VisualizationArea: React.FC<VisualizationAreaProps> = ({ trials }) => {
  const stats = useMemo(() => {
    const heads = trials.filter((t) => t.result === 'heads').length;
    const tails = trials.filter((t) => t.result === 'tails').length;
    const total = trials.length;
    const headsPercentage = total > 0 ? ((heads / total) * 100).toFixed(1) : '0';
    const tailsPercentage = total > 0 ? ((tails / total) * 100).toFixed(1) : '0';
    return { heads, tails, total, headsPercentage, tailsPercentage };
  }, [trials]);

  const histogramData = {
    labels: ['Heads', 'Tails'],
    datasets: [
      {
        label: 'Count',
        data: [stats.heads, stats.tails],
        backgroundColor: ['#00c9ff', '#f5576c'],
        borderColor: ['#00b4e6', '#e04558'],
        borderWidth: 2,
      },
    ],
  };

  const cumulativeData = useMemo(() => {
    let headsCount = 0;
    const proportions = trials.map((trial, index) => {
      if (trial.result === 'heads') headsCount++;
      return headsCount / (index + 1);
    });
    return proportions;
  }, [trials]);

  const lineChartData = {
    labels: trials.map((_, i) => i + 1),
    datasets: [
      {
        label: 'Proportion of Heads',
        data: cumulativeData,
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.15)',
        fill: true,
        tension: 0.1,
      },
      {
        label: 'Expected (0.5)',
        data: trials.map(() => 0.5),
        borderColor: '#6b7280',
        borderDash: [5, 5],
        fill: false,
        pointRadius: 0,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 1,
        title: {
          display: true,
          text: 'Proportion',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Trial Number',
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Convergence to Expected Probability',
      },
    },
  };

  const histogramOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Distribution of Outcomes',
      },
    },
  };

  return (
    <div className="visualization-area">
      <div className="stats-summary">
        <div className="stat-card">
          <span className="stat-value">{stats.heads}</span>
          <span className="stat-label">Heads ({stats.headsPercentage}%)</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.tails}</span>
          <span className="stat-label">Tails ({stats.tailsPercentage}%)</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{stats.total}</span>
          <span className="stat-label">Total Trials</span>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-wrapper">
          <Bar data={histogramData} options={histogramOptions} />
        </div>
        {trials.length > 0 && (
          <div className="chart-wrapper">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        )}
      </div>

      {trials.length > 0 && (
        <div className="recent-trials">
          <h4>Recent Trials</h4>
          <div className="trials-list">
            {trials.slice(-20).reverse().map((trial) => (
              <span
                key={trial.id}
                className={`trial-badge ${trial.result}`}
              >
                #{trial.id}: {trial.result === 'heads' ? 'H' : 'T'}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualizationArea;
