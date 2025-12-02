import { RandomProcess, ProcessConfig } from './types';

/**
 * Result of a single Pi simulation trial
 */
export type PiSimulationResult = { x: number; y: number; inside: boolean };

/**
 * Monte Carlo π Simulation Process
 * 
 * Estimates π by randomly generating points in a unit square [0,1] x [0,1]
 * and calculating the ratio of points that fall inside a quarter circle
 * of radius 1 centered at the origin.
 * 
 * The area of the quarter circle is π/4, and the area of the unit square is 1.
 * So the ratio of points inside the circle to total points approximates π/4.
 * Therefore: π ≈ 4 * (points inside circle / total points)
 */
export class PiSimulationProcess implements RandomProcess<PiSimulationResult> {
  config: ProcessConfig = {
    id: 'pi-simulation',
    name: 'π Simulation',
    description: 'Monte Carlo method to estimate π using random points',
    icon: '🎯',
  };

  /**
   * Generate a random point and determine if it falls inside the quarter circle
   */
  runTrial(): { x: number; y: number; inside: boolean } {
    const x = Math.random();
    const y = Math.random();
    // Point is inside the quarter circle if x² + y² ≤ 1
    const inside = (x * x + y * y) <= 1;
    return { x, y, inside };
  }

  /**
   * Calculate the estimated value of π from trial results
   */
  static estimatePi(results: { inside: boolean }[]): number {
    if (results.length === 0) return 0;
    const insideCount = results.filter(r => r.inside).length;
    return 4 * (insideCount / results.length);
  }
}
