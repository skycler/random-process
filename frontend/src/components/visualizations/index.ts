// Base components and types
export { BaseVisualization } from './BaseVisualization';
export * from './types';

// Process-specific visualization components
export { CoinFlipVisualization } from './CoinFlipVisualization';
export { DiceRollVisualization } from './DiceRollVisualization';
export { SumDiceVisualization } from './SumDiceVisualization';
export { RecentTrials } from './RecentTrials';

// Configuration hooks (for custom implementations)
export { useCoinFlipConfig } from './useCoinFlipConfig';
export { useDiceRollConfig } from './useDiceRollConfig';
export { useSumDiceConfig } from './useSumDiceConfig';

// Chart utilities
export * from './chartUtils';

// Stats hooks
export { useCoinStats, useCoinConvergence } from './useCoinStats';
export { useDiceStats, useDiceConvergence } from './useDiceStats';
export { useSumDiceStats, useSumDiceConvergence } from './useSumDiceStats';
