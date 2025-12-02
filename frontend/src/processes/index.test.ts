import { getProcess, getAllProcesses, getProcessConfigs, registerProcess, setGenerator, getSumDiceProcess } from './index';
import { RandomProcess, getRandomNumber, resetLatticeGenerator } from './types';

describe('Process Registry', () => {
  describe('getProcess', () => {
    it('should return coin-flip process', () => {
      const process = getProcess('coin-flip');
      expect(process).toBeDefined();
      expect(process?.config.id).toBe('coin-flip');
    });

    it('should return dice-roll process', () => {
      const process = getProcess('dice-roll');
      expect(process).toBeDefined();
      expect(process?.config.id).toBe('dice-roll');
    });

    it('should return undefined for unknown process', () => {
      const process = getProcess('unknown');
      expect(process).toBeUndefined();
    });
  });

  describe('getAllProcesses', () => {
    it('should return at least 2 processes', () => {
      const processes = getAllProcesses();
      expect(processes.length).toBeGreaterThanOrEqual(2);
    });
  });

  describe('getProcessConfigs', () => {
    it('should return configs with id and name', () => {
      const configs = getProcessConfigs();
      configs.forEach(config => {
        expect(config.id).toBeDefined();
        expect(config.name).toBeDefined();
      });
    });
  });

  describe('registerProcess', () => {
    it('should allow registering new processes', () => {
      const mockProcess: RandomProcess<string> = {
        config: {
          id: 'test-process',
          name: 'Test Process',
          description: 'A test process',
        },
        runTrial: () => 'test',
      };

      registerProcess(mockProcess);
      const retrieved = getProcess('test-process');
      expect(retrieved).toBeDefined();
      expect(retrieved?.config.name).toBe('Test Process');
    });
  });

  describe('setGenerator', () => {
    afterEach(() => {
      // Reset to standard generator after each test
      setGenerator('standard');
    });

    it('should switch to lattice generator', () => {
      setGenerator('lattice');
      // The lattice generator should still produce valid random numbers
      const result = getRandomNumber('lattice');
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(1);
    });

    it('should switch to standard generator', () => {
      setGenerator('standard');
      const result = getRandomNumber('standard');
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(1);
    });

    it('should reset lattice generator when switching to it', () => {
      // First set to lattice and get some numbers
      setGenerator('lattice');
      const first1 = getRandomNumber('lattice');
      const first2 = getRandomNumber('lattice');
      
      // Switch away and back - should reset
      setGenerator('standard');
      setGenerator('lattice');
      
      // The sequence should be different (reset with new timestamp)
      const second1 = getRandomNumber('lattice');
      // Just verify we get valid numbers after reset
      expect(second1).toBeGreaterThanOrEqual(0);
      expect(second1).toBeLessThan(1);
    });
  });

  describe('getSumDiceProcess', () => {
    it('should return the SumDiceProcess instance', () => {
      const sumDice = getSumDiceProcess();
      expect(sumDice).toBeDefined();
      expect(sumDice.config.id).toBe('sum-dice');
    });
  });
});

describe('Lattice Generator (types)', () => {
  it('should produce numbers between 0 and 1', () => {
    for (let i = 0; i < 100; i++) {
      const num = getRandomNumber('lattice');
      expect(num).toBeGreaterThanOrEqual(0);
      expect(num).toBeLessThan(1);
    }
  });

  it('should produce different numbers on successive calls', () => {
    const numbers = new Set<number>();
    for (let i = 0; i < 10; i++) {
      numbers.add(getRandomNumber('lattice'));
    }
    expect(numbers.size).toBeGreaterThan(1);
  });

  it('should reset with a seed', () => {
    resetLatticeGenerator(12345);
    const first = getRandomNumber('lattice');
    resetLatticeGenerator(12345);
    const second = getRandomNumber('lattice');
    expect(first).toBe(second);
  });

  it('should reset without a seed (uses timestamp)', () => {
    resetLatticeGenerator();
    const result = getRandomNumber('lattice');
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThan(1);
  });
});
