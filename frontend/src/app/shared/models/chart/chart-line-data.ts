export interface ChartLineDataset {
  label: string;
  yData: number[];
}

export interface ChartLineData {
  xLabels: string[];
  datasets: ChartLineDataset[];
}
