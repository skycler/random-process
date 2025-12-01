import React from 'react';
import { TrialResult } from '../../processes';
import { BaseVisualization } from './BaseVisualization';
import { useCoinFlipConfig } from './useCoinFlipConfig';

interface CoinFlipVisualizationProps {
  trials: TrialResult[];
}

/**
 * Visualization component for coin flip process
 * Uses BaseVisualization with coin flip specific configuration
 */
export const CoinFlipVisualization: React.FC<CoinFlipVisualizationProps> = ({ trials }) => {
  const config = useCoinFlipConfig(trials);
  return <BaseVisualization config={config} />;
};
