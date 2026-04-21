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
import { ChartDoughnutData } from '../../models/chart/chart-doughnut-data';
import { FontSizeService } from '../../services/font-size';
import { SpinnerIndicatorComponent } from '../spinner-indicator/spinner-indicator.component';

interface DoughnutChartOptions {
  fontSize?: number;
}

@Component({
  selector: 'app-chart-doughnut-indicator',
  imports: [
    CommonModule,
    MatCardModule,
    BaseChartDirective,
    SpinnerIndicatorComponent,
  ],
  standalone: true,
  templateUrl: './chart-doughnut-indicator.component.html',
  styleUrl: './chart-doughnut-indicator.component.css',
})
export class ChartDoughnutIndicatorComponent implements OnInit, OnChanges {
  @Input()
  public title!: string;

  @Input()
  public value!: ChartDoughnutData[] | null;

  @Input()
  public loading!: boolean;

  public fontSize: number = 16;

  public doughnutChartData: ChartConfiguration<
    'doughnut',
    DefaultDataPoint<'doughnut'>,
    string
  >['data'] = this._getDoughnutChartData();

  public doughnutChartOptions: ChartConfiguration<
    'doughnut',
    DefaultDataPoint<'doughnut'>,
    string
  >['options'] = this._getDoughnutChartOptions();

  constructor(
    private _fontSizeService: FontSizeService,
    private _dr: DestroyRef
  ) {}

  ngOnInit(): void {
    this._observeFontSizeChange();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('value' in changes) {
      this.doughnutChartData = this._getDoughnutChartData();
    }
  }

  private _observeFontSizeChange(): void {
    this._fontSizeService.fontSizeRem$
      .pipe(takeUntilDestroyed(this._dr))
      .subscribe((sizeRem) => {
        this.fontSize = sizeRem * 16;
        this.doughnutChartOptions = this._getDoughnutChartOptions({
          fontSize: this.fontSize,
        });
        this.doughnutChartData = this._getDoughnutChartData();
      });
  }

  private _getDoughnutChartData(): ChartConfiguration<
    'doughnut',
    DefaultDataPoint<'doughnut'>,
    string
  >['data'] {
    const labels = this.value?.map((v) => v.label) ?? [];
    const data = this.value?.map((v) => v.value) ?? [];

    return {
      labels: labels,
      datasets: [
        {
          data: data,
          hoverOffset: 10,
        },
      ],
    };
  }

  private _getDoughnutChartOptions(
    options?: DoughnutChartOptions
  ): ChartConfiguration<
    'doughnut',
    DefaultDataPoint<'doughnut'>,
    string
  >['options'] {
    const fontSize = options?.fontSize ?? 16;

    return {
      maintainAspectRatio: false,
      font: {
        size: fontSize,
        family: 'Roboto, "Helvetica Neue", sans-serif',
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
          usePointStyle: true,
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
            label: (tooltipItem) => tooltipItem.raw as string,
          },
        },
      },
    };
  }
}
