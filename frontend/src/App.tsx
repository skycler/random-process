import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ProcessSelector from './components/ProcessSelector';
import ParameterControls from './components/ParameterControls';
import VisualizationArea from './components/VisualizationArea';
import Footer from './components/Footer';
import './App.css';

export interface Trial {
  id: number;
  result: 'heads' | 'tails';
}

function App() {
  const [processType, setProcessType] = useState<string>('coin-flip');
  const [trials, setTrials] = useState<Trial[]>([]);
  const [probability, setProbability] = useState<number>(0.5);

  const flipCoin = useCallback(() => {
    const result = Math.random() < probability ? 'heads' : 'tails';
    const newTrial: Trial = {
      id: trials.length + 1,
      result,
    };
    setTrials((prev) => [...prev, newTrial]);
  }, [probability, trials.length]);

  const addTrials = useCallback((count: number) => {
    const newTrials: Trial[] = [];
    for (let i = 0; i < count; i++) {
      const result = Math.random() < probability ? 'heads' : 'tails';
      newTrials.push({
        id: trials.length + i + 1,
        result,
      });
    }
    setTrials((prev) => [...prev, ...newTrials]);
  }, [probability, trials.length]);

  const resetTrials = useCallback(() => {
    setTrials([]);
  }, []);

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="controls-section">
          <ProcessSelector 
            selectedProcess={processType} 
            onProcessChange={setProcessType} 
          />
          <ParameterControls
            probability={probability}
            onProbabilityChange={setProbability}
            onFlipCoin={flipCoin}
            onAddTrials={addTrials}
            onReset={resetTrials}
            trialCount={trials.length}
          />
        </div>
        <VisualizationArea trials={trials} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
