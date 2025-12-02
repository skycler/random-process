// Random number generator types
export type GeneratorType = 'standard' | 'lattice';

// Base interface for all random processes
export interface ProcessConfig {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TrialResultValue = string | number | Record<string, any>;

/**
 * Lattice-based pseudo-random number generator (Linear Congruential Generator)
 * Uses the formula: X(n+1) = (a * X(n) + c) mod m
 * Parameters chosen for good statistical properties
 */
class LatticeGenerator {
  private state: number;
  private readonly a = 1664525;
  private readonly c = 1013904223;
  private readonly m = Math.pow(2, 32);

  constructor(seed?: number) {
    this.state = seed ?? Date.now();
  }

  next(): number {
    this.state = (this.a * this.state + this.c) % this.m;
    return this.state / this.m;
  }

  reset(seed?: number): void {
    this.state = seed ?? Date.now();
  }
}

const latticeGenerator = new LatticeGenerator();

/**
 * Get a random number using the specified generator type
 */
export function getRandomNumber(generator: GeneratorType = 'standard'): number {
  if (generator === 'lattice') {
    return latticeGenerator.next();
  }
  return Math.random();
}

/**
 * Reset the lattice generator with a new seed
 */
export function resetLatticeGenerator(seed?: number): void {
  latticeGenerator.reset(seed);
}

export interface TrialResult {
  id: number;
  processId: string;
  result: TrialResultValue;
  timestamp: number;
}

// Abstract interface for random processes
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface RandomProcess<T = any> {
  config: ProcessConfig;
  runTrial(): T;
}
