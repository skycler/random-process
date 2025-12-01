import { RandomProcess, ProcessConfig } from './types';

export type DiceResult = 1 | 2 | 3 | 4 | 5 | 6;

export class DiceRollProcess implements RandomProcess<DiceResult> {
  config: ProcessConfig = {
    id: 'dice-roll',
    name: 'Dice Roll',
    description: 'Simulate rolling a fair six-sided dice',
  };

  runTrial(): DiceResult {
    return (Math.floor(Math.random() * 6) + 1) as DiceResult;
  }

  getOutcomes(): DiceResult[] {
    return [1, 2, 3, 4, 5, 6];
  }

  getExpectedValue(): number {
    return 3.5; // Expected average value
  }

  getColors(): string[] {
    return ['#00c9ff', '#f5576c', '#92fe9d', '#f093fb', '#4facfe', '#ffd166'];
  }

  getBorderColors(): string[] {
    return ['#00b4e6', '#e04558', '#7ee089', '#d87ee0', '#3d9ae0', '#e6bc5a'];
  }

  formatResult(result: DiceResult): string {
    return `⚀${result}`;
  }
}
