import React from 'react';
import './Header.css';

interface HeaderProps {
  processType?: string;
}

const getProcessIllustration = (processType: string): string => {
  switch (processType) {
    case 'coin-flip':
      return '🪙';
    case 'dice-roll':
      return '🎲';
    case 'sum-dice':
      return '🎲🎲🎲';
    default:
      return '🎰';
  }
};

const getProcessTitle = (processType: string): string => {
  switch (processType) {
    case 'coin-flip':
      return 'Coin Flip';
    case 'dice-roll':
      return 'Dice Roll';
    case 'sum-dice':
      return 'Sum of Dice';
    default:
      return 'Random Process';
  }
};

const Header: React.FC<HeaderProps> = ({ processType = 'coin-flip' }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-illustration">
          {getProcessIllustration(processType)}
        </div>
        <div className="header-text">
          <h1>Random Process Illustration</h1>
          <p className="header-subtitle">
            <span className="process-highlight">{getProcessTitle(processType)}</span>
            {' '}- Simulate and visualize to observe probability in action
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
