import { DiceRollProcess } from './DiceRollProcess';

describe('DiceRollProcess', () => {
  let process: DiceRollProcess;

  beforeEach(() => {
    process = new DiceRollProcess();
  });

  describe('config', () => {
    it('should have correct id', () => {
      expect(process.config.id).toBe('dice-roll');
    });

    it('should have correct name', () => {
      expect(process.config.name).toBe('Dice Roll');
    });
  });

  describe('runTrial', () => {
    it('should return a number between 1 and 6', () => {
      const result = process.runTrial();
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(6);
    });

    it('should return approximately average of 3.5 over many trials', () => {
      const trials = 1000;
      let sum = 0;
      for (let i = 0; i < trials; i++) {
        sum += process.runTrial();
      }
      const average = sum / trials;
      // Allow margin of error for randomness
      expect(average).toBeGreaterThan(3.0);
      expect(average).toBeLessThan(4.0);
    });
  });

  describe('getOutcomes', () => {
    it('should return 1 through 6', () => {
      expect(process.getOutcomes()).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('getExpectedValue', () => {
    it('should return 3.5', () => {
      expect(process.getExpectedValue()).toBe(3.5);
    });
  });

  describe('getColors', () => {
    it('should return six colors', () => {
      expect(process.getColors()).toHaveLength(6);
    });
  });

  describe('formatResult', () => {
    it('should format result with dice emoji', () => {
      expect(process.formatResult(1)).toBe('⚀1');
      expect(process.formatResult(6)).toBe('⚀6');
    });
  });
});
