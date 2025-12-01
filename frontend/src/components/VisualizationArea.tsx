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
import { TrialResult } from '../processes';
import {
  CoinFlipVisualization,
  DiceRollVisualization,
  SumDiceVisualization,
  RecentTrials,
} from './visualizations';
import './VisualizationArea.css';

// Register Chart.js components
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
  numberOfDice?: number;
}

/**
 * Main visualization area that renders the appropriate visualization
 * based on the selected process type.
 */
const VisualizationArea: React.FC<VisualizationAreaProps> = ({ 
  trials, 
  processType, 
  numberOfDice = 5 
}) => {
  // Filter trials by process type
  const filteredTrials = useMemo(() => 
    trials.filter((t) => t.processId === processType), 
    [trials, processType]
  );

  // Render the appropriate visualization component
  const renderVisualization = () => {
    switch (processType) {
      case 'coin-flip':
        return <CoinFlipVisualization trials={filteredTrials} />;
      case 'dice-roll':
        return <DiceRollVisualization trials={filteredTrials} />;
      case 'sum-dice':
        return <SumDiceVisualization trials={filteredTrials} numberOfDice={numberOfDice} />;
      default:
        return null;
    }
  };

  return (
    <div className="visualization-area">
      {renderVisualization()}
      <RecentTrials trials={filteredTrials} />
    </div>
  );
};

export default VisualizationArea;
