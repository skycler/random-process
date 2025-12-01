import React, { useState } from 'react';
import './ParameterControls.css';

interface ParameterControlsProps {
  processType: 'coin-flip' | 'dice-roll';
  onRunTrial: () => void;
  onAddTrials: (count: number) => void;
  onReset: () => void;
  trialCount: number;
}

const ParameterControls: React.FC<ParameterControlsProps> = ({
  processType,
  onRunTrial,
  onAddTrials,
  onReset,
  trialCount,
}) => {
  const [bulkCount, setBulkCount] = useState<number>(10);

  return (
    <div className="parameter-controls">
      <h3>Controls</h3>
      
      <div className="control-group">
        <label>Trials: {trialCount}</label>
      </div>

      <div className="button-group">
        <button className="btn btn-primary" onClick={onRunTrial}>
          {processType === 'coin-flip' ? '+1 Flip' : '+1 Roll'}
        </button>
        
        <div className="bulk-controls">
          <input
            type="number"
            min="1"
            max="1000"
            value={bulkCount}
            onChange={(e) => setBulkCount(parseInt(e.target.value) || 1)}
          />
          <button 
            className="btn btn-secondary" 
            onClick={() => onAddTrials(bulkCount)}
          >
            Add
          </button>
        </div>

        <button className="btn btn-danger" onClick={onReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default ParameterControls;
