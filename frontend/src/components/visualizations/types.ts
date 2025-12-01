import { ChartData, ChartOptions } from 'chart.js';

/**
 * A single stat card to display
 */
export interface StatCard {
  value: string | number;
  label: string;
  style?: React.CSSProperties;
}

/**
 * Configuration for the histogram chart
 */
export interface HistogramConfig {
  data: ChartData<'bar'>;
  options: ChartOptions<'bar'>;
  className?: string;
}

/**
 * Configuration for the convergence line chart
 */
export interface ConvergenceConfig {
  data: ChartData<'line'>;
  options: ChartOptions<'line'>;
}

/**
 * Optional info section (e.g., CLT explanation)
 */
export interface InfoSection {
  content: React.ReactNode;
  className?: string;
}

/**
 * Complete configuration for a process visualization
 */
export interface VisualizationConfig {
  /** Stats to display in the stats summary section */
  stats: StatCard[];
  /** CSS class for the stats container */
  statsClassName?: string;
  /** Histogram chart configuration */
  histogram: HistogramConfig;
  /** Convergence chart configuration (optional) */
  convergence?: ConvergenceConfig;
  /** Whether to show the convergence chart */
  showConvergence: boolean;
  /** Optional info section to display */
  infoSection?: InfoSection;
}
