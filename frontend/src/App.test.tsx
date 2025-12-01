import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Mock Chart.js to prevent canvas errors in tests
jest.mock('react-chartjs-2', () => ({
  Bar: () => <div data-testid="bar-chart">Bar Chart</div>,
  Line: () => <div data-testid="line-chart">Line Chart</div>,
}));

describe('App Component', () => {
  test('renders header with title', () => {
    render(<App />);
    expect(screen.getByText('Random Process Simulator')).toBeInTheDocument();
  });

  test('renders process selector', () => {
    render(<App />);
    expect(screen.getByLabelText(/select process/i)).toBeInTheDocument();
  });

  test('renders parameter controls', () => {
    render(<App />);
    expect(screen.getByText(/run trial/i)).toBeInTheDocument();
    expect(screen.getByText(/reset/i)).toBeInTheDocument();
  });

  test('coin flip is selected by default', () => {
    render(<App />);
    const selector = screen.getByLabelText(/select process/i) as HTMLSelectElement;
    expect(selector.value).toBe('coin-flip');
  });

  test('can switch to dice roll process', () => {
    render(<App />);
    const selector = screen.getByLabelText(/select process/i) as HTMLSelectElement;
    fireEvent.change(selector, { target: { value: 'dice-roll' } });
    expect(selector.value).toBe('dice-roll');
  });

  test('can run a trial', () => {
    render(<App />);
    const runButton = screen.getByText(/run trial/i);
    fireEvent.click(runButton);
    // After running a trial, trial count should increase
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('can add multiple trials', () => {
    render(<App />);
    const add10Button = screen.getByText('+10');
    fireEvent.click(add10Button);
    // After adding 10 trials, we should see 10 in stats
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  test('can reset trials', () => {
    render(<App />);
    // Add some trials
    const runButton = screen.getByText(/run trial/i);
    fireEvent.click(runButton);
    fireEvent.click(runButton);
    
    // Reset
    const resetButton = screen.getByText(/reset/i);
    fireEvent.click(resetButton);
    
    // Total trials should be 0
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('switching process type resets trials', () => {
    render(<App />);
    // Run some coin flip trials
    const runButton = screen.getByText(/run trial/i);
    fireEvent.click(runButton);
    fireEvent.click(runButton);
    
    // Switch to dice roll
    const selector = screen.getByLabelText(/select process/i);
    fireEvent.change(selector, { target: { value: 'dice-roll' } });
    
    // Trials should be reset
    const totalTrials = screen.getAllByText('0');
    expect(totalTrials.length).toBeGreaterThan(0);
  });
});
