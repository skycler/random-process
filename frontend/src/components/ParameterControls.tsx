import React, { useState } from 'react';
import { GeneratorType } from '../processes';
import './ParameterControls.css';

interface ParameterControlsProps {
  processType: string;
  onRunTrial: () => void;
  onAddTrials: (count: number) => void;
  onReset: () => void;
  trialCount: number;
  numberOfDice?: number;
  onNumberOfDiceChange?: (count: number) => void;
  generatorType: GeneratorType;
  onGeneratorChange: (type: GeneratorType) => void;
}

const ParameterControls: React.FC<ParameterControlsProps> = ({
  processType,
  onRunTrial,
  onAddTrials,
  onReset,
  trialCount,
  numberOfDice = 5,
  onNumberOfDiceChange,
  generatorType,
  onGeneratorChange,
}) => {
  const [bulkCount, setBulkCount] = useState<number>(10);

  const getButtonLabel = () => {
    switch (processType) {
      case 'coin-flip':
        return '+1 Flip';
      case 'dice-roll':
        return '+1 Roll';
      case 'sum-dice':
        return '+1 Roll';
      default:
        return '+1 Trial';
    }
  };

  return (
    <div className="parameter-controls">
      <h3>Controls</h3>
      
      {processType === 'sum-dice' && onNumberOfDiceChange && (
        <div className="control-group dice-count-group">
          <label htmlFor="dice-count">Number of Dice: {numberOfDice}</label>
          <input
            id="dice-count"
            type="range"
            min="2"
            max={20}
            value={numberOfDice}
            onChange={(e) => onNumberOfDiceChange(parseInt(e.target.value))}
          />
          <span className="dice-range-labels">
            <span>2</span>
            <span>20</span>
          </span>
        </div>
      )}

      <div className="control-group">
        <label>Trials: {trialCount}</label>
      </div>

      <div className="button-group">
        <button className="btn btn-primary" onClick={onRunTrial}>
          {getButtonLabel()}
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

      <div className="control-group generator-group">
        <label htmlFor="generator-select">Random Generator:</label>
        <select
          id="generator-select"
          value={generatorType}
          onChange={(e) => onGeneratorChange(e.target.value as GeneratorType)}
        >
          <option value="standard">Standard (Math.random)</option>
          <option value="lattice">Lattice-based (LCG)</option>
        </select>
      </div>
    </div>
  );
};

export default ParameterControls;
