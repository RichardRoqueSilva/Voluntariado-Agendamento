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
import { ChartPizzaData } from '../../models/chart/chart-pizza-data';
import { FontSizeService } from '../../services/font-size';
import { SpinnerIndicatorComponent } from '../spinner-indicator/spinner-indicator.component';

interface PizzaChartOptions {
  fontSize?: number;
}

@Component({
  selector: 'app-chart-pizza-indicator',
  imports: [
    CommonModule,
    MatCardModule,
    BaseChartDirective,
    SpinnerIndicatorComponent,
  ],
  standalone: true,
  templateUrl: './chart-pizza-indicator.component.html',
  styleUrl: './chart-pizza-indicator.component.css',
})
export class ChartPizzaIndicatorComponent implements OnInit, OnChanges {
  @Input()
  public title!: string;

  @Input()
  public value!: ChartPizzaData[] | null;

  @Input()
  public loading!: boolean;

  public fontSize: number = 16;

  public pizzaChartData: ChartConfiguration<
    'pie',
    DefaultDataPoint<'pie'>,
    string
  >['data'] = this._getPizzaChartData();

  public pizzaChartOptions: ChartConfiguration<
    'pie',
    DefaultDataPoint<'pie'>,
    string
  >['options'] = this._getPizzaChartOptions();

  constructor(
    private _fontSizeService: FontSizeService,
    private _dr: DestroyRef
  ) {}

  ngOnInit(): void {
    this._observeFontSizeChange();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('value' in changes) {
      this.pizzaChartData = this._getPizzaChartData();
    }
  }

  private _observeFontSizeChange(): void {
    this._fontSizeService.fontSizeRem$
      .pipe(takeUntilDestroyed(this._dr))
      .subscribe((sizeRem) => {
        this.fontSize = sizeRem * 16;
        this.pizzaChartOptions = this._getPizzaChartOptions({
          fontSize: this.fontSize,
        });
        this.pizzaChartData = this._getPizzaChartData();
      });
  }

  private _getPizzaChartData(): ChartConfiguration<
    'pie',
    DefaultDataPoint<'pie'>,
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

  private _getPizzaChartOptions(
    options?: PizzaChartOptions
  ): ChartConfiguration<'pie', DefaultDataPoint<'pie'>, string>['options'] {
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
