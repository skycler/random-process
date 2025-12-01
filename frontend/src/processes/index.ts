import { RandomProcess } from './types';
import { CoinFlipProcess } from './CoinFlipProcess';
import { DiceRollProcess } from './DiceRollProcess';

// Registry of all available random processes
// To add a new process, simply create a new class implementing RandomProcess
// and add it to this registry
const processRegistry: Map<string, RandomProcess> = new Map();

// Register built-in processes
const coinFlip = new CoinFlipProcess();
const diceRoll = new DiceRollProcess();

processRegistry.set(coinFlip.config.id, coinFlip);
processRegistry.set(diceRoll.config.id, diceRoll);

/**
 * Get a process by its ID
 */
export function getProcess(id: string): RandomProcess | undefined {
  return processRegistry.get(id);
}

/**
 * Get all available processes
 */
export function getAllProcesses(): RandomProcess[] {
  return Array.from(processRegistry.values());
}

/**
 * Get process configs for UI display
 */
export function getProcessConfigs() {
  return getAllProcesses().map(p => p.config);
}

/**
 * Register a new process (for extensibility)
 */
export function registerProcess(process: RandomProcess): void {
  processRegistry.set(process.config.id, process);
}

// Re-export types
export * from './types';
export { CoinFlipProcess } from './CoinFlipProcess';
export type { CoinResult } from './CoinFlipProcess';
export { DiceRollProcess } from './DiceRollProcess';
export type { DiceResult } from './DiceRollProcess';
