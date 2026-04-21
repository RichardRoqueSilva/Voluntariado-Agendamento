import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import {
  ChartConfiguration,
  ChartDataset,
  DefaultDataPoint,
  Point,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ChartLineCallbacks } from '../../models/chart/char-line-callbacks';
import {
  ChartLineData,
  ChartLineDataset,
} from '../../models/chart/chart-line-data';
import { FontSizeService } from '../../services/font-size';
import { SpinnerIndicatorComponent } from '../spinner-indicator/spinner-indicator.component';

interface LineChartOptions {
  fontSize?: number;
}

@Component({
  selector: 'app-chart-line-indicator',
  imports: [
    CommonModule,
    MatCardModule,
    BaseChartDirective,
    SpinnerIndicatorComponent,
  ],
  standalone: true,
  templateUrl: './chart-line-indicator.component.html',
  styleUrl: './chart-line-indicator.component.css',
})
export class ChartLineIndicatorComponent implements OnInit, OnChanges {
  @Input()
  public title!: string;

  @Input()
  public value!: ChartLineData | null;

  @Input()
  public loading!: boolean;

  @Input()
  public callbacks!: ChartLineCallbacks;

  public fontSize: number = 16;

  public lineChartData: ChartConfiguration<
    'line',
    DefaultDataPoint<'line'>,
    string
  >['data'] = this._getLineChartData();

  public lineChartOptions: ChartConfiguration<
    'line',
    DefaultDataPoint<'line'>,
    string
  >['options'] = this._getLineChartOptions();

  constructor(
    private _fontSizeService: FontSizeService,
    private _dr: DestroyRef
  ) {}

  ngOnInit(): void {
    this._observeFontSizeChange();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('value' in changes) {
      this.lineChartData = this._getLineChartData();
    }

    if ('callbacks' in changes) {
      this.lineChartOptions = this._getLineChartOptions();
    }
  }

  private _observeFontSizeChange(): void {
    this._fontSizeService.fontSizeRem$
      .pipe(takeUntilDestroyed(this._dr))
      .subscribe((sizeRem) => {
        this.fontSize = sizeRem * 16;
        this.lineChartOptions = this._getLineChartOptions({
          fontSize: this.fontSize,
        });
        this.lineChartData = this._getLineChartData();
      });
  }

  private _getLineChartData(): ChartConfiguration<
    'line',
    DefaultDataPoint<'line'>,
    string
  >['data'] {
    const labels = this.value?.xLabels ?? [];
    const datasets =
      this.value?.datasets?.map((d) => this._createDataset(d)) ?? [];

    return {
      labels: labels,
      datasets: datasets,
    };
  }

  private _createDataset(
    data: ChartLineDataset
  ): ChartDataset<'line', (number | Point | null)[]> {
    return {
      label: data.label,
      data: data.yData,
      pointRadius: this.fontSize / 3,
      pointHoverRadius: this.fontSize / 2,
      tension: 0.5,
    };
  }

  private _getLineChartOptions(
    options?: LineChartOptions
  ): ChartConfiguration<'line', DefaultDataPoint<'line'>, string>['options'] {
    const fontSize = options?.fontSize ?? 16;

    return {
      maintainAspectRatio: false,
      font: {
        size: fontSize,
        family: 'Roboto, "Helvetica Neue", sans-serif',
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'transparent',
          },
          ticks: {
            font: {
              size: fontSize,
            },
          },
        },
        x: {
          grid: {
            color: 'transparent',
          },
          ticks: {
            font: {
              size: fontSize,
            },
          },
        },
      },
      plugins: {
        legend: {
          position: 'right',
          title: {
            display: false,
          },
          labels: {
            usePointStyle: true,
            pointStyle: 'circle',
            boxWidth: 10,
            boxHeight: 10,
            font: {
              size: fontSize,
            },
            padding: 15,
          },
        },
        tooltip: {
          titleFont: {
            size: fontSize,
          },
          bodyFont: {
            size: fontSize,
          },
          footerFont: {
            size: fontSize,
          },
          callbacks: {
            title: this.callbacks?.tooltipTitleCallback,
          },
        },
      },
    };
  }
}
