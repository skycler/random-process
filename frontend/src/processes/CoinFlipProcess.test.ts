import { CoinFlipProcess } from './CoinFlipProcess';

describe('CoinFlipProcess', () => {
  let process: CoinFlipProcess;

  beforeEach(() => {
    process = new CoinFlipProcess();
  });

  describe('config', () => {
    it('should have correct id', () => {
      expect(process.config.id).toBe('coin-flip');
    });

    it('should have correct name', () => {
      expect(process.config.name).toBe('Coin Flip');
    });
  });

  describe('runTrial', () => {
    it('should return either heads or tails', () => {
      const result = process.runTrial();
      expect(['heads', 'tails']).toContain(result);
    });

    it('should return approximately 50% heads over many trials', () => {
      const trials = 1000;
      let heads = 0;
      for (let i = 0; i < trials; i++) {
        if (process.runTrial() === 'heads') heads++;
      }
      const proportion = heads / trials;
      // Allow 10% margin of error for randomness
      expect(proportion).toBeGreaterThan(0.4);
      expect(proportion).toBeLessThan(0.6);
    });
  });

  describe('getOutcomes', () => {
    it('should return heads and tails', () => {
      expect(process.getOutcomes()).toEqual(['heads', 'tails']);
    });
  });

  describe('getExpectedValue', () => {
    it('should return 0.5', () => {
      expect(process.getExpectedValue()).toBe(0.5);
    });
  });

  describe('getColors', () => {
    it('should return two colors', () => {
      expect(process.getColors()).toHaveLength(2);
    });
  });

  describe('getBorderColors', () => {
    it('should return two border colors', () => {
      expect(process.getBorderColors()).toHaveLength(2);
    });

    it('should return valid hex colors', () => {
      const colors = process.getBorderColors();
      colors.forEach(color => {
        expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
      });
    });
  });

  describe('formatResult', () => {
    it('should format heads as H', () => {
      expect(process.formatResult('heads')).toBe('H');
    });

    it('should format tails as T', () => {
      expect(process.formatResult('tails')).toBe('T');
    });
  });
});
