import React from 'react';
import { TrialResult } from '../../processes';
import { BaseVisualization } from './BaseVisualization';
import { useSumDiceConfig } from './useSumDiceConfig';

interface SumDiceVisualizationProps {
  trials: TrialResult[];
  numberOfDice: number;
}

/**
 * Visualization component for sum of dice process
 * Uses BaseVisualization with sum dice specific configuration
 */
export const SumDiceVisualization: React.FC<SumDiceVisualizationProps> = ({ 
  trials, 
  numberOfDice 
}) => {
  const config = useSumDiceConfig(trials, numberOfDice);
  return <BaseVisualization config={config} />;
};
