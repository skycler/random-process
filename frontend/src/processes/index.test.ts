import { getProcess, getAllProcesses, getProcessConfigs, registerProcess } from './index';
import { RandomProcess, ProcessConfig } from './types';

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
        getOutcomes: () => ['test'],
        getExpectedValue: () => 0.5,
        getColors: () => ['#000'],
        getBorderColors: () => ['#000'],
        formatResult: (r) => r,
      };

      registerProcess(mockProcess);
      const retrieved = getProcess('test-process');
      expect(retrieved).toBeDefined();
      expect(retrieved?.config.name).toBe('Test Process');
    });
  });
});
