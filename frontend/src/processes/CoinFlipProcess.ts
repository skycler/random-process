import { RandomProcess, ProcessConfig, GeneratorType, getRandomNumber } from './types';

export type CoinResult = 'heads' | 'tails';

export class CoinFlipProcess implements RandomProcess<CoinResult> {
  config: ProcessConfig = {
    id: 'coin-flip',
    name: 'Coin Flip',
    description: 'Simulate flipping a fair coin',
  };

  private generator: GeneratorType = 'standard';

  setGenerator(type: GeneratorType): void {
    this.generator = type;
  }

  runTrial(): CoinResult {
    return getRandomNumber(this.generator) < 0.5 ? 'heads' : 'tails';
  }

  getOutcomes(): CoinResult[] {
    return ['heads', 'tails'];
  }

  getExpectedValue(): number {
    return 0.5; // Expected proportion of heads
  }

  getColors(): string[] {
    return ['#00c9ff', '#f5576c'];
  }

  getBorderColors(): string[] {
    return ['#00b4e6', '#e04558'];
  }

  formatResult(result: CoinResult): string {
    return result === 'heads' ? 'H' : 'T';
  }
}
