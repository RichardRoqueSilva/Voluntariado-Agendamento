import { Injectable } from '@angular/core';
import {
  ChartLineData,
  ChartLineDataset,
} from '../../../shared/models/chart/chart-line-data';
import { DashboardAccumulatedVisitsPerMonth } from '../models/dashboard-accumulated-visits';

@Injectable({
  providedIn: 'root',
})
export class DashboardResponseMapperService {
  constructor() {}

  public mapDashboardAcummulatedVisitsPerMonthToChartLine(
    visitsPerMonth: DashboardAccumulatedVisitsPerMonth[]
  ): ChartLineData {
    return {
      xLabels: this._getXLabelsChartLine(visitsPerMonth),
      datasets: this._getDatasetsChartLine(visitsPerMonth),
    };
  }

  private _getXLabelsChartLine(
    visitsPerMonth: DashboardAccumulatedVisitsPerMonth[]
  ): string[] {
    const days = visitsPerMonth
      .flatMap((v) => v.visitsPerDay)
      .map((v) => v.day)
      .sort((el1, el2) => {
        if (el1 > el2) {
          return 1;
        }

        if (el1 < el2) {
          return -1;
        }

        return 0;
      })
      .map((d) => d.toString());

    return [...new Set(days)];
  }

  private _getDatasetsChartLine(
    visitsPerMonth: DashboardAccumulatedVisitsPerMonth[]
  ): ChartLineDataset[] {
    return visitsPerMonth.map((v) => this._getDatasetChartLine(v));
  }

  private _getDatasetChartLine(
    visitsPerMonth: DashboardAccumulatedVisitsPerMonth
  ): ChartLineDataset {
    return {
      label: visitsPerMonth.month,
      yData: visitsPerMonth.visitsPerDay.map((v) => v.visits),
    };
  }
}
