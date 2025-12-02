import { PiSimulationProcess } from './PiSimulationProcess';

describe('PiSimulationProcess', () => {
  let process: PiSimulationProcess;

  beforeEach(() => {
    process = new PiSimulationProcess();
  });

  describe('config', () => {
    it('should have correct id', () => {
      expect(process.config.id).toBe('pi-simulation');
    });

    it('should have correct name', () => {
      expect(process.config.name).toBe('π Simulation');
    });

    it('should have a description', () => {
      expect(process.config.description).toBeDefined();
      expect(process.config.description!.length).toBeGreaterThan(0);
    });

    it('should have an icon', () => {
      expect(process.config.icon).toBe('🎯');
    });
  });

  describe('runTrial', () => {
    it('should return an object with x, y, and inside properties', () => {
      const result = process.runTrial();
      expect(result).toHaveProperty('x');
      expect(result).toHaveProperty('y');
      expect(result).toHaveProperty('inside');
    });

    it('should return x and y values between 0 and 1', () => {
      for (let i = 0; i < 100; i++) {
        const result = process.runTrial();
        expect(result.x).toBeGreaterThanOrEqual(0);
        expect(result.x).toBeLessThanOrEqual(1);
        expect(result.y).toBeGreaterThanOrEqual(0);
        expect(result.y).toBeLessThanOrEqual(1);
      }
    });

    it('should correctly determine if point is inside quarter circle', () => {
      // Mock Math.random to return specific values
      const originalRandom = Math.random;
      
      // Point at origin (0, 0) - inside
      Math.random = jest.fn().mockReturnValueOnce(0).mockReturnValueOnce(0);
      let result = process.runTrial();
      expect(result.inside).toBe(true);

      // Point at (0.5, 0.5) - inside (0.25 + 0.25 = 0.5 < 1)
      Math.random = jest.fn().mockReturnValueOnce(0.5).mockReturnValueOnce(0.5);
      result = process.runTrial();
      expect(result.inside).toBe(true);

      // Point at (1, 1) - outside (1 + 1 = 2 > 1)
      Math.random = jest.fn().mockReturnValueOnce(1).mockReturnValueOnce(1);
      result = process.runTrial();
      expect(result.inside).toBe(false);

      // Point at (0.8, 0.8) - outside (0.64 + 0.64 = 1.28 > 1)
      Math.random = jest.fn().mockReturnValueOnce(0.8).mockReturnValueOnce(0.8);
      result = process.runTrial();
      expect(result.inside).toBe(false);

      // Point at (0.6, 0.6) - inside (0.36 + 0.36 = 0.72 < 1)
      Math.random = jest.fn().mockReturnValueOnce(0.6).mockReturnValueOnce(0.6);
      result = process.runTrial();
      expect(result.inside).toBe(true);

      Math.random = originalRandom;
    });
  });

  describe('estimatePi', () => {
    it('should return 0 for empty results', () => {
      expect(PiSimulationProcess.estimatePi([])).toBe(0);
    });

    it('should return 4 when all points are inside', () => {
      const results = [
        { inside: true },
        { inside: true },
        { inside: true },
        { inside: true },
      ];
      expect(PiSimulationProcess.estimatePi(results)).toBe(4);
    });

    it('should return 0 when no points are inside', () => {
      const results = [
        { inside: false },
        { inside: false },
        { inside: false },
        { inside: false },
      ];
      expect(PiSimulationProcess.estimatePi(results)).toBe(0);
    });

    it('should return 2 when half the points are inside', () => {
      const results = [
        { inside: true },
        { inside: true },
        { inside: false },
        { inside: false },
      ];
      expect(PiSimulationProcess.estimatePi(results)).toBe(2);
    });

    it('should converge towards π with many trials', () => {
      // Run many trials and check if estimate is close to π
      const process = new PiSimulationProcess();
      const results: { inside: boolean }[] = [];
      
      for (let i = 0; i < 10000; i++) {
        results.push(process.runTrial());
      }
      
      const estimate = PiSimulationProcess.estimatePi(results);
      // Should be within 0.1 of actual π with high probability
      expect(Math.abs(estimate - Math.PI)).toBeLessThan(0.1);
    });
  });
});
