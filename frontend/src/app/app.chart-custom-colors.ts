import {
  Chart,
  ChartDataset,
  DoughnutController,
  PolarAreaController,
  defaults,
} from 'chart.js';

interface ColorsDescriptor {
  backgroundColor?: unknown;
  borderColor?: unknown;
}

const BORDER_COLORS = [
  'rgb(249, 115, 22)',
  'rgb(132, 204, 22)',
  'rgb(168, 85, 247)',
  'rgb(236, 72, 153)',
  'rgb(99, 102, 241)',
  'rgb(94, 234, 212)',
  'rgb(107, 114, 128)',
  'rgb(245, 158, 11)',
  'rgb(52, 211, 153)',
];

// Border colors with 50% transparency
const BACKGROUND_COLORS = BORDER_COLORS.map((color) =>
  color.replace('rgb(', 'rgba(').replace(')', ', 1)')
);

function getBorderColor(i: number) {
  return BORDER_COLORS[i % BORDER_COLORS.length];
}

function getBackgroundColor(i: number) {
  return BACKGROUND_COLORS[i % BACKGROUND_COLORS.length];
}

function colorizeDefaultDataset(dataset: ChartDataset, i: number) {
  dataset.borderColor = getBorderColor(i);
  dataset.backgroundColor = getBackgroundColor(i);

  return ++i;
}

function colorizeDoughnutDataset(dataset: ChartDataset, i: number) {
  dataset.backgroundColor = dataset.data.map(() => getBorderColor(i++));

  return i;
}

function colorizePolarAreaDataset(dataset: ChartDataset, i: number) {
  dataset.backgroundColor = dataset.data.map(() => getBackgroundColor(i++));

  return i;
}

function getColorizer(chart: Chart) {
  let i = 0;

  return (dataset: ChartDataset, datasetIndex: number) => {
    const controller = chart.getDatasetMeta(datasetIndex).controller;

    if (controller instanceof DoughnutController) {
      i = colorizeDoughnutDataset(dataset, i);
    } else if (controller instanceof PolarAreaController) {
      i = colorizePolarAreaDataset(dataset, i);
    } else if (controller) {
      i = colorizeDefaultDataset(dataset, i);
    }
  };
}

function containsColorsDefinitions(
  descriptors: Record<string, ColorsDescriptor>
) {
  let k: number | string;

  for (k in descriptors) {
    if (descriptors[k].borderColor || descriptors[k].backgroundColor) {
      return true;
    }
  }

  return false;
}

function containsColorsDefinition(descriptor: ColorsDescriptor) {
  return descriptor && (descriptor.borderColor || descriptor.backgroundColor);
}

function containsDefaultColorsDefenitions() {
  return (
    defaults.borderColor !== 'rgba(0,0,0,0.1)' ||
    defaults.backgroundColor !== 'rgba(0,0,0,0.1)'
  );
}

export default {
  id: 'colors',

  defaults: {
    enabled: true,
    forceOverride: false,
  },

  beforeLayout(chart: Chart, _args: any, options: any) {
    if (!options.enabled) {
      return;
    }

    const {
      data: { datasets },
      options: chartOptions,
    } = chart.config;
    const { elements } = chartOptions as any;

    const containsColorDefenition =
      containsColorsDefinitions(datasets as any) ||
      containsColorsDefinition(chartOptions as any) ||
      (elements && containsColorsDefinitions(elements)) ||
      containsDefaultColorsDefenitions();

    if (!options.forceOverride && containsColorDefenition) {
      return;
    }

    const colorizer = getColorizer(chart);

    datasets.forEach(colorizer);
  },
};
