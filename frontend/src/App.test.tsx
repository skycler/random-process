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
    expect(screen.getByText('Random Process Illustration')).toBeInTheDocument();
  });

  test('renders process selector', () => {
    render(<App />);
    expect(screen.getByLabelText(/select process/i)).toBeInTheDocument();
  });

  test('renders parameter controls with flip button for coin flip', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /\+1 Flip/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
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
    // Button should now show "+1 Roll"
    expect(screen.getByRole('button', { name: /\+1 Roll/i })).toBeInTheDocument();
  });

  test('can run a coin flip trial', () => {
    render(<App />);
    const runButton = screen.getByRole('button', { name: /\+1 Flip/i });
    fireEvent.click(runButton);
    // After running a trial, we should see stats
    expect(screen.getByText('Total Trials')).toBeInTheDocument();
  });

  test('can add multiple trials', () => {
    render(<App />);
    const addButton = screen.getByRole('button', { name: /add/i });
    fireEvent.click(addButton);
    // After adding trials, total should be visible
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  test('can reset trials', () => {
    render(<App />);
    const runButton = screen.getByRole('button', { name: /\+1 Flip/i });
    fireEvent.click(runButton);
    fireEvent.click(runButton);
    
    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);
    
    // After reset, stats should show 0 values
    const zeroValues = screen.getAllByText('0');
    expect(zeroValues.length).toBeGreaterThan(0);
  });

  test('switching process type shows dice roll UI', () => {
    render(<App />);
    const selector = screen.getByLabelText(/select process/i);
    fireEvent.change(selector, { target: { value: 'dice-roll' } });
    
    // Button should now show "+1 Roll"
    expect(screen.getByRole('button', { name: /\+1 Roll/i })).toBeInTheDocument();
  });
});
