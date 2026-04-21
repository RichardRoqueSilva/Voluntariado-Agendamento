import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import { TooltipItem } from 'chart.js';
import { finalize, Observable, of } from 'rxjs';
import { SharedModule } from '../../../shared';
import { ChartBarIndicatorComponent } from '../../../shared/components/chart-bar-indicator/chart-bar-indicator.component';
import { ChartDoughnutIndicatorComponent } from '../../../shared/components/chart-doughnut-indicator/chart-doughnut-indicator.component';
import { ChartLineIndicatorComponent } from '../../../shared/components/chart-line-indicator/chart-line-indicator.component';
import { ChartPizzaIndicatorComponent } from '../../../shared/components/chart-pizza-indicator/chart-pizza-indicator.component';
import { ChartBarOrientation } from '../../../shared/models/chart';
import { ChartLineCallbacks } from '../../../shared/models/chart/char-line-callbacks';
import { ChartLineData } from '../../../shared/models/chart/chart-line-data';
import { DashboardHorizontalChartBarData } from '../models';
import { DashboardDoughnutData } from '../models/dashboard-doughnut-data';
import { DashboardFilters } from '../models/dashboard-filters';
import { DashboardPizzaData } from '../models/dashboard-pizza-data';
import { DashboardVerticalChartBarData } from '../models/dashboard-vertical-chart-bar-data';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard-chart-indicators',
  standalone: true,
  imports: [
    CommonModule,
    ChartBarIndicatorComponent,
    ChartLineIndicatorComponent,
    ChartDoughnutIndicatorComponent,
    ChartPizzaIndicatorComponent,
    SharedModule,
  ],
  templateUrl: './dashboard-chart-indicators.component.html',
  styleUrl: './dashboard-chart-indicators.component.css',
})
export class DashboardChartIndicatorsComponent implements OnChanges {
  @Input()
  filters!: DashboardFilters;

  visitasPorEntidade$: Observable<DashboardHorizontalChartBarData[]> = of([]);
  visitasPorEntidadeLoading = signal(true);

  visitasPorVoluntario$: Observable<DashboardHorizontalChartBarData[]> = of([]);
  visitasPorVoluntarioLoading = signal(true);

  visitasPorDiaDaSemana$: Observable<DashboardVerticalChartBarData[]> = of([]);
  visitasPorDiaDaSemanaLoading = signal(true);

  visitasAcumuladasPorDiaUltimosMeses$: Observable<ChartLineData | null> =
    of(null);
  visitasAcumuladasPorDiaUltimosMesesLoading = signal(true);

  visitasPorPeriodo$: Observable<DashboardDoughnutData[] | null> = of(null);
  visitasPorPeriodoLoading = signal(true);

  qtdeVoluntariosFizeramVisitasNoMes$: Observable<DashboardPizzaData[] | null> =
    of(null);
  qtdeVoluntariosFizeramVisitasNoMesLoading = signal(true);

  qtdeEntidadesVisitadasNoMes$: Observable<DashboardPizzaData[] | null> =
    of(null);
  qtdeEntidadesVisitadasNoMesLoading = signal(true);

  chartBarOrientation = ChartBarOrientation;

  visitasAcumuladasPorDiaUltimosMesesCallbacks =
    this.getVisitasAcumuladasPorDiaUltimosMesesCallbacks();

  constructor(private dashboardService: DashboardService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if ('filters' in changes) {
      this.buscarDadosIndicadores();
    }
  }

  buscarDadosIndicadores(): void {
    this.buscaVisitarPorEntidade();
    this.buscaVisitarPorVoluntario();
    this.buscaVisitarPorDiaDaSemana();
    this.buscaVisitasAcumuladasPorDiaUltimos3Meses();
    this.buscaVisitasPorPeriodo();
    this.buscaQtdeVoluntariosFizeramVisitasNoMes();
    this.buscaQtdeEntidadesVisitadasNoMes();
  }

  buscaVisitarPorEntidade(): void {
    this.visitasPorEntidade$ = this.dashboardService
      .getVisitasPorEntidade(this.filters)
      .pipe(finalize(() => this.visitasPorEntidadeLoading.set(false)));

    this.visitasPorEntidadeLoading.set(true);
  }

  buscaVisitarPorVoluntario(): void {
    this.visitasPorVoluntario$ = this.dashboardService
      .getVisitasPorVoluntario(this.filters)
      .pipe(finalize(() => this.visitasPorVoluntarioLoading.set(false)));

    this.visitasPorVoluntarioLoading.set(true);
  }

  buscaVisitarPorDiaDaSemana(): void {
    this.visitasPorDiaDaSemana$ = this.dashboardService
      .getVisitasPorDiaDaSemana(this.filters)
      .pipe(finalize(() => this.visitasPorDiaDaSemanaLoading.set(false)));
    this.visitasPorDiaDaSemanaLoading.set(true);
  }

  buscaVisitasAcumuladasPorDiaUltimos3Meses(): void {
    this.visitasAcumuladasPorDiaUltimosMeses$ = this.dashboardService
      .getVisitasAcumuladasPorDiaUltimos3Meses(this.filters)
      .pipe(
        finalize(() =>
          this.visitasAcumuladasPorDiaUltimosMesesLoading.set(false)
        )
      );
    this.visitasAcumuladasPorDiaUltimosMesesLoading.set(true);
  }

  buscaVisitasPorPeriodo(): void {
    this.visitasPorPeriodo$ = this.dashboardService
      .getVisitasPorPeriodo(this.filters)
      .pipe(finalize(() => this.visitasPorPeriodoLoading.set(false)));
    this.visitasPorPeriodoLoading.set(true);
  }

  buscaQtdeVoluntariosFizeramVisitasNoMes(): void {
    this.qtdeVoluntariosFizeramVisitasNoMes$ = this.dashboardService
      .getQtdeVoluntariosFizeramVisitasNoMes(this.filters)
      .pipe(
        finalize(() =>
          this.qtdeVoluntariosFizeramVisitasNoMesLoading.set(false)
        )
      );
    this.qtdeVoluntariosFizeramVisitasNoMesLoading.set(true);
  }

  buscaQtdeEntidadesVisitadasNoMes(): void {
    this.qtdeEntidadesVisitadasNoMes$ = this.dashboardService
      .getQtdeEntidadesVisitadasNoMes(this.filters)
      .pipe(finalize(() => this.qtdeEntidadesVisitadasNoMesLoading.set(false)));
    this.qtdeEntidadesVisitadasNoMesLoading.set(true);
  }

  getVisitasAcumuladasPorDiaUltimosMesesCallbacks(): ChartLineCallbacks {
    return {
      tooltipTitleCallback: (tooltipItem: TooltipItem<'line'>[]) => {
        const labelsNoRepetition = [
          ...new Set(tooltipItem.map((i) => i.label)),
        ];
        return labelsNoRepetition.map((l) => `Dia ${l}`);
      },
    };
  }
}
