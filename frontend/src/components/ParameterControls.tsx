import React, { useState } from 'react';
import './ParameterControls.css';

interface ParameterControlsProps {
  probability: number;
  onProbabilityChange: (probability: number) => void;
  onFlipCoin: () => void;
  onAddTrials: (count: number) => void;
  onReset: () => void;
  trialCount: number;
}

const ParameterControls: React.FC<ParameterControlsProps> = ({
  probability,
  onProbabilityChange,
  onFlipCoin,
  onAddTrials,
  onReset,
  trialCount,
}) => {
  const [bulkCount, setBulkCount] = useState<number>(10);

  return (
    <div className="parameter-controls">
      <h3>Controls</h3>
      
      <div className="control-group">
        <label htmlFor="probability">
          P(Heads): {(probability * 100).toFixed(0)}%
        </label>
        <input
          type="range"
          id="probability"
          min="0"
          max="1"
          step="0.01"
          value={probability}
          onChange={(e) => onProbabilityChange(parseFloat(e.target.value))}
        />
      </div>

      <div className="control-group">
        <label>Trials: {trialCount}</label>
      </div>

      <div className="button-group">
        <button className="btn btn-primary" onClick={onFlipCoin}>
          +1
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
