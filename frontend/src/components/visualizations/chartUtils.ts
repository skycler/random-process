import { ChartOptions } from 'chart.js';

/**
 * Default histogram options
 */
export const createHistogramOptions = (title: string): ChartOptions<'bar'> => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    title: { display: true, text: title },
  },
  scales: {
    y: {
      title: { display: true, text: 'Frequency' },
    },
  },
});

/**
 * Default convergence line chart options
 */
export const createConvergenceOptions = (
  title: string,
  yAxisLabel: string,
  yMin: number,
  yMax: number
): ChartOptions<'line'> => ({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      min: yMin,
      max: yMax,
      title: { display: true, text: yAxisLabel },
    },
    x: {
      title: { display: true, text: 'Trial Number' },
    },
  },
  plugins: {
    legend: { position: 'top' as const },
    title: { display: true, text: title },
  },
});

/**
 * Color palette for dice
 */
export const DICE_COLORS = ['#00c9ff', '#f5576c', '#92fe9d', '#f093fb', '#4facfe', '#ffd166'];
export const DICE_BORDER_COLORS = ['#00b4e6', '#e04558', '#7ee089', '#d87ee0', '#3d9ae0', '#e6bc5a'];

/**
 * Generate gradient colors for a given count
 */
export const generateGradientColors = (
  count: number,
  hueStart: number,
  hueRange: number,
  saturation = 70,
  lightness = 60
): { colors: string[]; borderColors: string[] } => {
  const colors: string[] = [];
  const borderColors: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const hue = hueStart + (i / count) * hueRange;
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    borderColors.push(`hsl(${hue}, ${saturation}%, ${lightness - 10}%)`);
  }
  
  return { colors, borderColors };
};

/**
 * Create convergence dataset with expected value line
 */
export const createConvergenceDatasets = (
  data: number[],
  expectedValue: number,
  label: string,
  expectedLabel: string,
  color = '#8b5cf6'
) => [
  {
    label,
    data,
    borderColor: color,
    backgroundColor: `${color}26`, // 15% opacity
    fill: true,
    tension: 0.1,
  },
  {
    label: expectedLabel,
    data: data.map(() => expectedValue),
    borderColor: '#6b7280',
    borderDash: [5, 5],
    fill: false,
    pointRadius: 0,
  },
];
