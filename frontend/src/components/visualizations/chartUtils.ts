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
 * Default convergence line chart options with logarithmic x-axis
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
      type: 'logarithmic',
      title: { display: true, text: 'Trial Number (log scale)' },
      min: 1,
      ticks: {
        callback: function(value) {
          const v = Number(value);
          if ([1, 10, 100, 1000, 10000].includes(v)) {
            return v.toString();
          }
          return '';
        },
      },
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
 * Create convergence dataset with expected value line and error bands
 * Uses {x, y} point format for logarithmic scale compatibility
 */
export const createConvergenceDatasets = (
  data: number[],
  expectedValue: number,
  label: string,
  expectedLabel: string,
  color = '#8b5cf6',
  standardErrors?: number[]
) => {
  // Convert to {x, y} format for logarithmic x-axis
  const pointData = data.map((y, i) => ({ x: i + 1, y }));
  const expectedData = data.map((_, i) => ({ x: i + 1, y: expectedValue }));
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const datasets: any[] = [
    {
      label,
      data: pointData,
      borderColor: color,
      backgroundColor: `${color}26`, // 15% opacity
      fill: false,
      tension: 0.1,
      pointRadius: data.length > 100 ? 0 : 2,
    },
    {
      label: expectedLabel,
      data: expectedData,
      borderColor: '#6b7280',
      borderDash: [5, 5],
      fill: false,
      pointRadius: 0,
    },
  ];

  // Add error bands if standard errors are provided
  if (standardErrors && standardErrors.length > 0) {
    const upperBand = data.map((y, i) => ({ x: i + 1, y: y + (standardErrors[i] || 0) }));
    const lowerBand = data.map((y, i) => ({ x: i + 1, y: y - (standardErrors[i] || 0) }));

    datasets.push({
      label: 'Upper Error Band',
      data: upperBand,
      borderColor: `${color}40`,
      backgroundColor: 'transparent',
      borderDash: [2, 2],
      fill: false,
      pointRadius: 0,
    });

    datasets.push({
      label: 'Lower Error Band',
      data: lowerBand,
      borderColor: `${color}40`,
      backgroundColor: `${color}15`,
      borderDash: [2, 2],
      fill: '-1', // Fill to previous dataset (upper band)
      pointRadius: 0,
    });
  }

  return datasets;
};
