import { RandomProcess, ProcessConfig } from './types';

export type SumDiceResult = number;

/**
 * Sum of Multiple Dice Process
 * 
 * Demonstrates the Central Limit Theorem: as the number of dice increases,
 * the distribution of sums approaches a normal (Gaussian) distribution.
 * 
 * With N dice, each showing 1-6:
 * - Minimum sum: N
 * - Maximum sum: 6N
 * - Expected value: 3.5N
 * - Variance: 35N/12
 */
export class SumDiceProcess implements RandomProcess<SumDiceResult> {
  private numberOfDice: number;

  config: ProcessConfig = {
    id: 'sum-dice',
    name: 'Sum of Dice (Normal Distribution)',
    description: 'Roll multiple dice and sum the results. Demonstrates how the Central Limit Theorem leads to a normal distribution.',
  };

  constructor(numberOfDice: number = 5) {
    this.numberOfDice = numberOfDice;
  }

  setNumberOfDice(n: number): void {
    this.numberOfDice = Math.max(1, Math.min(20, n)); // Limit between 1-20 dice
  }

  getNumberOfDice(): number {
    return this.numberOfDice;
  }

  runTrial(): SumDiceResult {
    let sum = 0;
    for (let i = 0; i < this.numberOfDice; i++) {
      sum += Math.floor(Math.random() * 6) + 1;
    }
    return sum;
  }

  getOutcomes(): SumDiceResult[] {
    // Return all possible sums from N dice
    const min = this.numberOfDice;
    const max = this.numberOfDice * 6;
    const outcomes: SumDiceResult[] = [];
    for (let i = min; i <= max; i++) {
      outcomes.push(i);
    }
    return outcomes;
  }

  getExpectedValue(): number {
    // E[sum of N dice] = N * 3.5
    return this.numberOfDice * 3.5;
  }

  getVariance(): number {
    // Var[single die] = 35/12, Var[sum of N dice] = N * 35/12
    return (this.numberOfDice * 35) / 12;
  }

  getStandardDeviation(): number {
    return Math.sqrt(this.getVariance());
  }

  getColors(): string[] {
    // Generate gradient colors for the histogram
    const outcomes = this.getOutcomes();
    return outcomes.map((_, index) => {
      const hue = 200 + (index / outcomes.length) * 120; // Blue to purple gradient
      return `hsl(${hue}, 70%, 60%)`;
    });
  }

  getBorderColors(): string[] {
    const outcomes = this.getOutcomes();
    return outcomes.map((_, index) => {
      const hue = 200 + (index / outcomes.length) * 120;
      return `hsl(${hue}, 70%, 50%)`;
    });
  }

  formatResult(result: SumDiceResult): string {
    return `Sum: ${result}`;
  }

  getMinSum(): number {
    return this.numberOfDice;
  }

  getMaxSum(): number {
    return this.numberOfDice * 6;
  }
}
