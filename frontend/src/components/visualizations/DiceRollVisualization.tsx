import React from 'react';
import { TrialResult } from '../../processes';
import { BaseVisualization } from './BaseVisualization';
import { useDiceRollConfig } from './useDiceRollConfig';

interface DiceRollVisualizationProps {
  trials: TrialResult[];
}

/**
 * Visualization component for dice roll process
 * Uses BaseVisualization with dice roll specific configuration
 */
export const DiceRollVisualization: React.FC<DiceRollVisualizationProps> = ({ trials }) => {
  const config = useDiceRollConfig(trials);
  return <BaseVisualization config={config} />;
};
