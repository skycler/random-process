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
import { TrialResult } from '../processes';
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
  trials: TrialResult[];
  processType: string;
}

const DICE_COLORS = ['#00c9ff', '#f5576c', '#92fe9d', '#f093fb', '#4facfe', '#ffd166'];
const DICE_BORDER_COLORS = ['#00b4e6', '#e04558', '#7ee089', '#d87ee0', '#3d9ae0', '#e6bc5a'];

const VisualizationArea: React.FC<VisualizationAreaProps> = ({ trials, processType }) => {
  // Filter trials by process type
  const coinTrials = useMemo(() => 
    trials.filter((t) => t.processId === 'coin-flip'), [trials]);
  
  const diceTrials = useMemo(() => 
    trials.filter((t) => t.processId === 'dice-roll'), [trials]);

  // Coin flip stats
  const coinStats = useMemo(() => {
    const heads = coinTrials.filter((t) => t.result === 'heads').length;
    const tails = coinTrials.filter((t) => t.result === 'tails').length;
    const total = coinTrials.length;
    const headsPercentage = total > 0 ? ((heads / total) * 100).toFixed(1) : '0';
    const tailsPercentage = total > 0 ? ((tails / total) * 100).toFixed(1) : '0';
    return { heads, tails, total, headsPercentage, tailsPercentage };
  }, [coinTrials]);

  // Dice roll stats
  const diceStats = useMemo(() => {
    const counts = [0, 0, 0, 0, 0, 0];
    diceTrials.forEach((t) => {
      const value = t.result as number;
      counts[value - 1]++;
    });
    const total = diceTrials.length;
    const percentages = counts.map((c) => (total > 0 ? ((c / total) * 100).toFixed(1) : '0'));
    return { counts, total, percentages };
  }, [diceTrials]);

  // Coin histogram data
  const coinHistogramData = {
    labels: ['Heads', 'Tails'],
    datasets: [
      {
        label: 'Count',
        data: [coinStats.heads, coinStats.tails],
        backgroundColor: ['#00c9ff', '#f5576c'],
        borderColor: ['#00b4e6', '#e04558'],
        borderWidth: 2,
      },
    ],
  };

  // Dice histogram data
  const diceHistogramData = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: 'Count',
        data: diceStats.counts,
        backgroundColor: DICE_COLORS,
        borderColor: DICE_BORDER_COLORS,
        borderWidth: 2,
      },
    ],
  };

  // Coin convergence data
  const coinCumulativeData = useMemo(() => {
    let headsCount = 0;
    return coinTrials.map((trial, index) => {
      if (trial.result === 'heads') headsCount++;
      return headsCount / (index + 1);
    });
  }, [coinTrials]);

  // Dice convergence data (average value converging to 3.5)
  const diceCumulativeData = useMemo(() => {
    let sum = 0;
    return diceTrials.map((trial, index) => {
      sum += trial.result as number;
      return sum / (index + 1);
    });
  }, [diceTrials]);

  const coinLineChartData = {
    labels: coinTrials.map((_, i) => i + 1),
    datasets: [
      {
        label: 'Proportion of Heads',
        data: coinCumulativeData,
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.15)',
        fill: true,
        tension: 0.1,
      },
      {
        label: 'Expected (0.5)',
        data: coinCumulativeData.map(() => 0.5),
        borderColor: '#6b7280',
        borderDash: [5, 5],
        fill: false,
        pointRadius: 0,
      },
    ],
  };

  const diceLineChartData = {
    labels: diceTrials.map((_, i) => i + 1),
    datasets: [
      {
        label: 'Average Roll',
        data: diceCumulativeData,
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.15)',
        fill: true,
        tension: 0.1,
      },
      {
        label: 'Expected (3.5)',
        data: diceCumulativeData.map(() => 3.5),
        borderColor: '#6b7280',
        borderDash: [5, 5],
        fill: false,
        pointRadius: 0,
      },
    ],
  };

  const coinLineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 1,
        title: { display: true, text: 'Proportion' },
      },
      x: {
        title: { display: true, text: 'Trial Number' },
      },
    },
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Convergence to Expected Probability' },
    },
  };

  const diceLineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 1,
        max: 6,
        title: { display: true, text: 'Average Value' },
      },
      x: {
        title: { display: true, text: 'Trial Number' },
      },
    },
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Convergence to Expected Average' },
    },
  };

  const histogramOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: true, text: 'Distribution of Outcomes' },
    },
  };

  const relevantTrials = processType === 'coin-flip' ? coinTrials : diceTrials;

  return (
    <div className="visualization-area">
      {processType === 'coin-flip' ? (
        <>
          <div className="stats-summary">
            <div className="stat-card">
              <span className="stat-value">{coinStats.heads}</span>
              <span className="stat-label">Heads ({coinStats.headsPercentage}%)</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{coinStats.tails}</span>
              <span className="stat-label">Tails ({coinStats.tailsPercentage}%)</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">{coinStats.total}</span>
              <span className="stat-label">Total Trials</span>
            </div>
          </div>

          <div className="charts-container">
            <div className="chart-wrapper">
              <Bar data={coinHistogramData} options={histogramOptions} />
            </div>
            {coinStats.total > 0 && (
              <div className="chart-wrapper">
                <Line data={coinLineChartData} options={coinLineChartOptions} />
              </div>
            )}
          </div>
        </>
      ) : (
        <>
          <div className="stats-summary dice-stats">
            {diceStats.counts.map((count, index) => (
              <div key={index} className="stat-card" style={{ 
                background: DICE_COLORS[index],
                boxShadow: `0 4px 15px ${DICE_COLORS[index]}40`
              }}>
                <span className="stat-value">{count}</span>
                <span className="stat-label">⚀ {index + 1} ({diceStats.percentages[index]}%)</span>
              </div>
            ))}
            <div className="stat-card">
              <span className="stat-value">{diceStats.total}</span>
              <span className="stat-label">Total Rolls</span>
            </div>
          </div>

          <div className="charts-container">
            <div className="chart-wrapper">
              <Bar data={diceHistogramData} options={histogramOptions} />
            </div>
            {diceStats.total > 0 && (
              <div className="chart-wrapper">
                <Line data={diceLineChartData} options={diceLineChartOptions} />
              </div>
            )}
          </div>
        </>
      )}

      {relevantTrials.length > 0 && (
        <div className="recent-trials">
          <h4>Recent Trials</h4>
          <div className="trials-list">
            {relevantTrials.slice(-20).reverse().map((trial) => (
              <span
                key={trial.id}
                className={`trial-badge ${trial.processId === 'coin-flip' ? trial.result : `dice-${trial.result}`}`}
              >
                #{trial.id}: {trial.processId === 'coin-flip' 
                  ? (trial.result === 'heads' ? 'H' : 'T')
                  : `⚀${trial.result}`
                }
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualizationArea;
