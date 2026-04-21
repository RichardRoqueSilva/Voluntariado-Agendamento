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
import { ChartConfiguration, DefaultDataPoint } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ChartBarData, ChartBarOrientation } from '../../models/chart';
import { FontSizeService } from '../../services/font-size';
import { SpinnerIndicatorComponent } from '../spinner-indicator/spinner-indicator.component';

interface BarChartOptions {
  fontSize?: number;
}

@Component({
  selector: 'app-chart-bar-indicator',
  imports: [
    CommonModule,
    MatCardModule,
    BaseChartDirective,
    SpinnerIndicatorComponent,
  ],
  standalone: true,
  templateUrl: './chart-bar-indicator.component.html',
  styleUrl: './chart-bar-indicator.component.css',
})
export class ChartBarIndicatorComponent implements OnInit, OnChanges {
  @Input()
  public title!: string;

  @Input()
  public value!: ChartBarData[] | null;

  @Input()
  public loading!: boolean;

  @Input()
  public orientation: ChartBarOrientation = ChartBarOrientation.VERTICAL;

  public barChartData: ChartConfiguration<
    'bar',
    DefaultDataPoint<'bar'>,
    string
  >['data'] = this._getBarChartData();

  public barChartOptions: ChartConfiguration<
    'bar',
    DefaultDataPoint<'bar'>,
    string
  >['options'] = this._getChartOptions();

  constructor(
    private _fontSizeService: FontSizeService,
    private _dr: DestroyRef
  ) {}

  ngOnInit(): void {
    this._observeFontSizeChange();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('value' in changes) {
      this.barChartData = this._getBarChartData();
    }

    if ('orientation' in changes) {
      this.barChartOptions = this._getChartOptions();
    }
  }

  private _observeFontSizeChange(): void {
    this._fontSizeService.fontSizeRem$
      .pipe(takeUntilDestroyed(this._dr))
      .subscribe((sizeRem) => {
        this.barChartOptions = this._getChartOptions({
          fontSize: sizeRem * 16,
        });
      });
  }

  private _getBarChartData(): ChartConfiguration<
    'bar',
    DefaultDataPoint<'bar'>,
    string
  >['data'] {
    const labels = this.value?.map((v) => v.label) ?? [];
    const data = this.value?.map((v) => v.value) ?? [];

    return {
      labels: labels,
      datasets: [
        {
          label: 'Dados',
          data: data,
          backgroundColor: [
            '#ff6384',
            '#ff9f40',
            '#ffcd56',
            '#4bc0c0',
            '#36a2eb',
            '#9966ff',
            '#c9cbcf',
            '#bed061',
            '#376c72',
            '#cd508a',
          ],
          borderRadius: 5,
        },
      ],
    };
  }

  private _getChartOptions(
    options?: BarChartOptions
  ): ChartConfiguration<'bar', DefaultDataPoint<'bar'>, string>['options'] {
    const fontSize = options?.fontSize ?? 16;
    const indexAxis =
      this.orientation === ChartBarOrientation.HORIZONTAL ? 'y' : 'x';

    return {
      indexAxis: indexAxis,
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
          display: false,
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
            label: (tooltipItem) => {
              return String(tooltipItem.raw);
            },
          },
        },
      },
    };
  }
}
