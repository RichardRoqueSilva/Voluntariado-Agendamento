import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import { TooltipItem } from 'chart.js';
import { finalize, Observable, of, tap } from 'rxjs';
import { SharedModule } from '../../../shared';
import { ChartBarIndicatorComponent } from '../../../shared/components/chart-bar-indicator/chart-bar-indicator.component';
import { ChartLineIndicatorComponent } from '../../../shared/components/chart-line-indicator/chart-line-indicator.component';
import { SimpleIndicatorComponent } from '../../../shared/components/simple-indicator/simple-indicator.component';
import { ChartBarOrientation } from '../../../shared/models/chart';
import { ChartLineCallbacks } from '../../../shared/models/chart/char-line-callbacks';
import { ChartLineData } from '../../../shared/models/chart/chart-line-data';
import { DashboardHorizontalChartBarData } from '../models';
import { DashboardFilters } from '../models/dashboard-filters';
import { DashboardVerticalChartBarData } from '../models/dashboard-vertical-chart-bar-data';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard-simple-indicators',
  standalone: true,
  imports: [
    CommonModule,
    SimpleIndicatorComponent,
    ChartBarIndicatorComponent,
    ChartLineIndicatorComponent,
    SharedModule,
  ],
  templateUrl: './dashboard-simple-indicators.component.html',
  styleUrl: './dashboard-simple-indicators.component.css',
})
export class DashboardSimpleIndicatorsComponent implements OnChanges {
  @Input()
  filters!: DashboardFilters;

  qtdeEntidadesVisitadas$: Observable<number> = of(0);
  qtdeEntidadesVisitadasLoading = signal(true);

  qtdeParticipantesVisitas$: Observable<number> = of(0);
  qtdeParticipantesVisitasLoading = signal(true);

  qtdeNaoParticipantesVisitas$: Observable<number> = of(0);
  qtdeNaoParticipantesVisitasLoading = signal(true);

  taxaParticipacao$: Observable<number> = of(0);
  taxaParticipacaoLoading = signal(true);

  horasVisitas$: Observable<number> = of(0);
  horasVisitasLoading = signal(true);

  visitasPorEntidade$: Observable<DashboardHorizontalChartBarData[]> = of([]);
  visitasPorEntidadeLoading = signal(true);

  visitasPorVoluntario$: Observable<DashboardHorizontalChartBarData[]> = of([]);
  visitasPorVoluntarioLoading = signal(true);

  visitasPorDiaDaSemana$: Observable<DashboardVerticalChartBarData[]> = of([]);
  visitasPorDiaDaSemanaLoading = signal(true);

  visitasAcumuladasPorDiaUltimosMeses$: Observable<ChartLineData | null> =
    of(null);
  visitasAcumuladasPorDiaUltimosMesesLoading = signal(true);

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
    this.buscaQtdeEntidadesVisitadas();
    this.buscaQtdeVoluntariosVisitas();
    this.buscaQtdeNaoParticipantesVisitas();
    this.buscaTaxaParticipacao();
    this.buscaHorasVisitas();
    this.buscaVisitarPorEntidade();
    this.buscaVisitarPorVoluntario();
    this.buscaVisitarPorDiaDaSemana();
    this.buscaVisitasAcumuladasPorDiaUltimos3Meses();
  }

  buscaQtdeEntidadesVisitadas(): void {
    this.qtdeEntidadesVisitadas$ = this.dashboardService
      .getQuantidadeEntidadesVisitadas(this.filters)
      .pipe(finalize(() => this.qtdeEntidadesVisitadasLoading.set(false)));
    this.qtdeEntidadesVisitadasLoading.set(true);
  }

  buscaQtdeVoluntariosVisitas(): void {
    this.qtdeParticipantesVisitas$ = this.dashboardService
      .getQuantidadeVoluntariosVisitas(this.filters)
      .pipe(finalize(() => this.qtdeParticipantesVisitasLoading.set(false)));
    this.qtdeParticipantesVisitasLoading.set(true);
  }

  buscaQtdeNaoParticipantesVisitas(): void {
    this.qtdeNaoParticipantesVisitas$ = this.dashboardService
      .getQuantidadeVoluntariosNaoParticipantesVisitas(this.filters)
      .pipe(finalize(() => this.qtdeNaoParticipantesVisitasLoading.set(false)));

    this.qtdeNaoParticipantesVisitasLoading.set(true);
  }

  buscaTaxaParticipacao(): void {
    this.taxaParticipacao$ = this.dashboardService
      .getTaxaParticipacao(this.filters)
      .pipe(finalize(() => this.taxaParticipacaoLoading.set(false)));

    this.taxaParticipacaoLoading.set(true);
  }

  buscaHorasVisitas(): void {
    this.horasVisitas$ = this.dashboardService
      .getHorasVisitas(this.filters)
      .pipe(finalize(() => this.horasVisitasLoading.set(false)));

    this.horasVisitasLoading.set(true);
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
        tap((v) => console.log(v)),
        finalize(() =>
          this.visitasAcumuladasPorDiaUltimosMesesLoading.set(false)
        )
      );
    this.visitasAcumuladasPorDiaUltimosMesesLoading.set(true);
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
