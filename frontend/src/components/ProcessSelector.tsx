import React from 'react';
import './ProcessSelector.css';

interface ProcessSelectorProps {
  selectedProcess: string;
  onProcessChange: (process: string) => void;
}

const ProcessSelector: React.FC<ProcessSelectorProps> = ({
  selectedProcess,
  onProcessChange,
}) => {
  const processes = [
    { id: 'coin-flip', name: 'Coin Flip' },
    // More processes can be added here in the future
  ];

  return (
    <div className="process-selector">
      <label htmlFor="process-select">Select Process:</label>
      <select
        id="process-select"
        value={selectedProcess}
        onChange={(e) => onProcessChange(e.target.value)}
      >
        {processes.map((process) => (
          <option key={process.id} value={process.id}>
            {process.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProcessSelector;
