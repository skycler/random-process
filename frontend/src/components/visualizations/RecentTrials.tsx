import React from 'react';
import { TrialResult } from '../../processes';

interface RecentTrialsProps {
  trials: TrialResult[];
}

/**
 * Component to display recent trials for any process type
 */
export const RecentTrials: React.FC<RecentTrialsProps> = ({ trials }) => {
  if (trials.length === 0) return null;

  const formatResult = (trial: TrialResult): string => {
    switch (trial.processId) {
      case 'coin-flip':
        return trial.result === 'heads' ? 'H' : 'T';
      case 'dice-roll':
        return `⚀${trial.result}`;
      case 'sum-dice':
        return `Σ${trial.result}`;
      default:
        return String(trial.result);
    }
  };

  const getClassName = (trial: TrialResult): string => {
    switch (trial.processId) {
      case 'coin-flip':
        return trial.result as string;
      case 'dice-roll':
        return `dice-${trial.result}`;
      case 'sum-dice':
        return 'sum-dice';
      default:
        return '';
    }
  };

  return (
    <div className="recent-trials">
      <h4>Recent Trials</h4>
      <div className="trials-list">
        {trials.slice(-20).reverse().map((trial) => (
          <span
            key={trial.id}
            className={`trial-badge ${getClassName(trial)}`}
          >
            #{trial.id}: {formatResult(trial)}
          </span>
        ))}
      </div>
    </div>
  );
};
