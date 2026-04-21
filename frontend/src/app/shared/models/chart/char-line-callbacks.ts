import { TooltipItem } from 'chart.js';

export interface ChartLineCallbacks {
  tooltipTitleCallback?: (
    tooltipItems: TooltipItem<'line'>[]
  ) => string | string[] | void;
}
