import { SumDiceProcess } from './SumDiceProcess';

describe('SumDiceProcess', () => {
  let process: SumDiceProcess;

  beforeEach(() => {
    process = new SumDiceProcess(5);
  });

  describe('config', () => {
    test('has correct id', () => {
      expect(process.config.id).toBe('sum-dice');
    });

    test('has correct name', () => {
      expect(process.config.name).toBe('Sum of Dice (Normal Distribution)');
    });
  });

  describe('runTrial', () => {
    test('returns sum within valid range for 5 dice', () => {
      for (let i = 0; i < 100; i++) {
        const result = process.runTrial();
        expect(result).toBeGreaterThanOrEqual(5);
        expect(result).toBeLessThanOrEqual(30);
      }
    });

    test('returns sum within valid range for 2 dice', () => {
      process.setNumberOfDice(2);
      for (let i = 0; i < 100; i++) {
        const result = process.runTrial();
        expect(result).toBeGreaterThanOrEqual(2);
        expect(result).toBeLessThanOrEqual(12);
      }
    });

    test('returns sum within valid range for 10 dice', () => {
      process.setNumberOfDice(10);
      for (let i = 0; i < 100; i++) {
        const result = process.runTrial();
        expect(result).toBeGreaterThanOrEqual(10);
        expect(result).toBeLessThanOrEqual(60);
      }
    });
  });

  describe('getOutcomes', () => {
    test('returns all possible sums for 5 dice (5-30)', () => {
      const outcomes = process.getOutcomes();
      expect(outcomes.length).toBe(26); // 30 - 5 + 1 = 26
      expect(outcomes[0]).toBe(5);
      expect(outcomes[outcomes.length - 1]).toBe(30);
    });

    test('returns all possible sums for 2 dice (2-12)', () => {
      process.setNumberOfDice(2);
      const outcomes = process.getOutcomes();
      expect(outcomes.length).toBe(11); // 12 - 2 + 1 = 11
      expect(outcomes[0]).toBe(2);
      expect(outcomes[outcomes.length - 1]).toBe(12);
    });
  });

  describe('getExpectedValue', () => {
    test('returns 17.5 for 5 dice (5 * 3.5)', () => {
      expect(process.getExpectedValue()).toBe(17.5);
    });

    test('returns 7 for 2 dice (2 * 3.5)', () => {
      process.setNumberOfDice(2);
      expect(process.getExpectedValue()).toBe(7);
    });

    test('returns 35 for 10 dice (10 * 3.5)', () => {
      process.setNumberOfDice(10);
      expect(process.getExpectedValue()).toBe(35);
    });
  });

  describe('getVariance', () => {
    test('returns correct variance for 5 dice', () => {
      expect(process.getVariance()).toBeCloseTo((5 * 35) / 12);
    });
  });

  describe('getStandardDeviation', () => {
    test('returns square root of variance', () => {
      expect(process.getStandardDeviation()).toBeCloseTo(Math.sqrt((5 * 35) / 12));
    });
  });

  describe('setNumberOfDice', () => {
    test('limits minimum to 1', () => {
      process.setNumberOfDice(0);
      expect(process.getNumberOfDice()).toBe(1);
      process.setNumberOfDice(-5);
      expect(process.getNumberOfDice()).toBe(1);
    });

    test('limits maximum to 20', () => {
      process.setNumberOfDice(25);
      expect(process.getNumberOfDice()).toBe(20);
      process.setNumberOfDice(100);
      expect(process.getNumberOfDice()).toBe(20);
    });
  });

  describe('getColors', () => {
    test('returns array with correct length', () => {
      const colors = process.getColors();
      const outcomes = process.getOutcomes();
      expect(colors.length).toBe(outcomes.length);
    });
  });

  describe('formatResult', () => {
    test('formats result correctly', () => {
      expect(process.formatResult(15)).toBe('Sum: 15');
      expect(process.formatResult(30)).toBe('Sum: 30');
    });
  });

  describe('getMinSum and getMaxSum', () => {
    test('returns correct min and max for 5 dice', () => {
      expect(process.getMinSum()).toBe(5);
      expect(process.getMaxSum()).toBe(30);
    });
  });
});
