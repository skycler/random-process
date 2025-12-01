import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import ProcessSelector from './components/ProcessSelector';
import ParameterControls from './components/ParameterControls';
import VisualizationArea from './components/VisualizationArea';
import Footer from './components/Footer';
import { getProcess, TrialResult } from './processes';
import './App.css';

function App() {
  const [processType, setProcessType] = useState<string>('coin-flip');
  const [trials, setTrials] = useState<TrialResult[]>([]);

  const runTrial = useCallback(() => {
    const process = getProcess(processType);
    if (!process) return;

    const result = process.runTrial();
    const newTrial: TrialResult = {
      id: trials.length + 1,
      processId: processType,
      result,
      timestamp: Date.now(),
    };
    setTrials((prev) => [...prev, newTrial]);
  }, [processType, trials.length]);

  const addTrials = useCallback((count: number) => {
    const process = getProcess(processType);
    if (!process) return;

    const newTrials: TrialResult[] = [];
    for (let i = 0; i < count; i++) {
      const result = process.runTrial();
      newTrials.push({
        id: trials.length + i + 1,
        processId: processType,
        result,
        timestamp: Date.now(),
      });
    }
    setTrials((prev) => [...prev, ...newTrials]);
  }, [processType, trials.length]);

  const resetTrials = useCallback(() => {
    setTrials([]);
  }, []);

  const handleProcessChange = useCallback((newProcess: string) => {
    setProcessType(newProcess);
    setTrials([]);
  }, []);

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="controls-section">
          <ProcessSelector 
            selectedProcess={processType} 
            onProcessChange={handleProcessChange} 
          />
          <ParameterControls
            processType={processType as 'coin-flip' | 'dice-roll'}
            onRunTrial={runTrial}
            onAddTrials={addTrials}
            onReset={resetTrials}
            trialCount={trials.length}
          />
        </div>
        <VisualizationArea trials={trials} processType={processType} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
